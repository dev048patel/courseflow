import { supabase } from './supabase';

export interface Course {
    id: string;
    code: string;
    name: string;
    description: string;
    department: string;
    university_name: string;
}

export interface Review {
    id: string;
    rating: number;
    difficulty: number;
    comment: string;
    author_year_snapshot: number;
    author_major_snapshot: string;
    author_grade_snapshot: string;
    created_at: string;
}

export interface SyllabusUpload {
    id: string;
    file_url: string;
    semester: string;
    created_at: string;
}

export interface CourseDetails {
    course: Course;
    reviews: Review[];
    syllabi: SyllabusUpload[];
}

export async function getCourseDetails(courseId: string): Promise<CourseDetails | null> {
    try {
        // Fetch course details
        const { data: course, error: courseError } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        if (courseError || !course) {
            console.error('Course fetch error:', courseError);
            return null;
        }

        // Fetch reviews for this course
        const { data: reviews, error: reviewsError } = await supabase
            .from('reviews')
            .select('id, rating, difficulty, comment, author_year_snapshot, author_major_snapshot, author_grade_snapshot, created_at')
            .eq('course_id', courseId)
            .order('created_at', { ascending: false });

        if (reviewsError) {
            console.error('Reviews fetch error:', reviewsError);
        }

        // Fetch syllabi for this course
        const { data: syllabi, error: syllabiError } = await supabase
            .from('syllabus_uploads')
            .select('id, file_url, semester, created_at')
            .eq('course_id', courseId)
            .order('created_at', { ascending: false });

        if (syllabiError) {
            console.error('Syllabi fetch error:', syllabiError);
        }

        return {
            course,
            reviews: reviews || [],
            syllabi: syllabi || []
        };
    } catch (error) {
        console.error('getCourseDetails error:', error);
        return null;
    }
}
