import requests
from bs4 import BeautifulSoup
import json
import re
import time

# Base URL for the University of Regina Banner Catalog
BASE_URL = "https://banner.uregina.ca/prod/sct"
CATALOG_URL = f"{BASE_URL}/bwckctlg.p_disp_dyn_ctlg"
COURSES_URL = f"{BASE_URL}/bwckctlg.p_display_courses"

def get_current_term(session):
    """
    Fetches the main catalog page to find the latest academic term.
    """
    print("Fetching term list...")
    response = session.get(CATALOG_URL)
    response.raise_for_status()
    
    soup = BeautifulSoup(response.text, 'html.parser')
    term_select = soup.find('select', {'name': 'cat_term_in'})
    
    if not term_select:
        raise Exception("Could not find term selection dropdown.")
    
    # Get the first option that is not "None" (usually the most recent future/current term)
    options = [option['value'] for option in term_select.find_all('option') if option['value']]
    
    if not options:
        raise Exception("No terms found.")
    
    # Return the most recent term (usually the first one in the list)
    current_term = options[0]
    print(f"Selected Term: {current_term}")
    return current_term

def get_subjects(session, term):
    """
    Fetches the list of subjects for the given term.
    """
    print("Fetching subject list...")
    # Step 1: Submit the term to get the subject selection page
    payload = {
        'cat_term_in': term,
        'call_proc_in': 'bwckctlg.p_disp_dyn_ctlg'
    }
    response = session.post(CATALOG_URL, data=payload)
    response.raise_for_status()
    
    soup = BeautifulSoup(response.text, 'html.parser')
    subject_select = soup.find('select', {'name': 'sel_subj'})
    
    if not subject_select:
        raise Exception("Could not find subject selection dropdown.")
    
    subjects = []
    for option in subject_select.find_all('option'):
        if option['value']:
            subjects.append({
                'code': option['value'],
                'name': option.text.strip()
            })
            
    print(f"Found {len(subjects)} subjects.")
    return subjects

def extract_prerequisites(description):
    """
    Attempts to extract prerequisite courses from the description text.
    Looks for patterns like "Prerequisite: CS 110" or "Prerequisites: CS 110 and MATH 110".
    """
    prereq_pattern = r"Prerequisite[s]?:?\s*([A-Z]{2,4}\s\d{3}(?:(?:\s(?:and|or)\s|,\s)[A-Z]{2,4}\s\d{3})*)"
    match = re.search(prereq_pattern, description, re.IGNORECASE)
    
    if match:
        # Clean up the extracted string
        prereq_text = match.group(1)
        # Find all course codes in the prereq text
        courses = re.findall(r"([A-Z]{2,4}\s\d{3})", prereq_text)
        return courses
    return []

def scrape_courses(session, term, subjects):
    """
    Iterates through subjects and scrapes course details.
    """
    all_courses = []
    
    # For testing, let's limit to a few major subjects to avoid overwhelming the server
    # In production, you might want to remove this slice or make it configurable
    target_subjects = [s for s in subjects if s['code'] in ['CS', 'ENGL', 'MATH', 'BUS', 'ENSE']]
    
    print(f"Scraping courses for {len(target_subjects)} subjects: {[s['code'] for s in target_subjects]}...")
    
    for subject in target_subjects:
        print(f"Scraping {subject['name']} ({subject['code']})...")
        
        # Banner requires a lot of dummy fields to be sent
        payload = {
            'term_in': term,
            'sel_subj': ['dummy', subject['code']],
            'sel_day': 'dummy',
            'sel_schd': 'dummy',
            'sel_insm': 'dummy',
            'sel_camp': 'dummy',
            'sel_levl': 'dummy',
            'sel_sess': 'dummy',
            'sel_instr': 'dummy',
            'sel_ptrm': 'dummy',
            'sel_attr': 'dummy',
            'sel_crse': '',
            'sel_title': '',
            'sel_from_cred': '',
            'sel_to_cred': '',
            'begin_hh': '0',
            'begin_mi': '0',
            'begin_ap': 'a',
            'end_hh': '0',
            'end_mi': '0',
            'end_ap': 'a'
        }
        
        try:
            response = session.post(COURSES_URL, data=payload)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Banner structure:
            # <td class="nttitle"><a>Course Title</a></td>
            # <td class="ntdefault">Description...</td>
            
            course_titles = soup.find_all('td', class_='nttitle')
            
            for title_elem in course_titles:
                # Extract Code and Name from title (e.g., "CS 110 - Programming and Problem Solving")
                title_text = title_elem.text.strip()
                parts = title_text.split(' - ', 1)
                
                if len(parts) == 2:
                    code = parts[0]
                    name = parts[1]
                    
                    # The description is usually in the next row's 'ntdefault' cell
                    # We need to navigate the DOM carefully
                    description_row = title_elem.parent.find_next_sibling('tr')
                    if description_row:
                        description_cell = description_row.find('td', class_='ntdefault')
                        if description_cell:
                            description = description_cell.text.strip()
                            
                            # Clean up description (remove "3.000 Credit hours" etc if present at start)
                            # Banner often puts credit hours in the text
                            credits = 3 # Default
                            credit_match = re.search(r'(\d+\.\d+)\s+Credit\s+hours', description, re.IGNORECASE)
                            if credit_match:
                                credits = float(credit_match.group(1))
                            
                            # Extract prerequisites
                            prerequisites = extract_prerequisites(description)
                            
                            course_data = {
                                "code": code,
                                "name": name,
                                "department": subject['name'],
                                "description": description,
                                "credits": credits,
                                "prerequisites": prerequisites
                            }
                            all_courses.append(course_data)
                            
            time.sleep(1) # Be polite to the server
            
        except Exception as e:
            print(f"Error scraping {subject['code']}: {e}")
            
    return all_courses

def main():
    session = requests.Session()
    # Add headers to mimic a browser
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    })
    
    try:
        term = get_current_term(session)
        subjects = get_subjects(session, term)
        courses = scrape_courses(session, term, subjects)
        
        output_file = 'uregina_courses.json'
        with open(output_file, 'w') as f:
            json.dump(courses, f, indent=2)
            
        print(f"Successfully scraped {len(courses)} courses. Saved to {output_file}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
