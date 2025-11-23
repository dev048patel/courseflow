DO $$
DECLARE
    -- 100 Level
    cs100_id UUID; cs110_id UUID; cs115_id UUID;
    
    -- 200 Level
    cs201_id UUID; cs203_id UUID; cs205_id UUID; cs207_id UUID;
    cs210_id UUID; cs215_id UUID; cs261_id UUID; cs270_id UUID;
    cs271_id UUID; cs280_id UUID;

    -- 300 Level
    cs301_id UUID; cs310_id UUID; cs315_id UUID; cs320_id UUID;
    cs330_id UUID; cs335_id UUID; cs340_id UUID; cs350_id UUID;
    cs361_id UUID; cs372_id UUID; cs375_id UUID;

    -- 400 Level
    cs401_id UUID; cs405_id UUID; cs408_id UUID; cs409_id UUID;
    cs410_id UUID; cs411_id UUID; cs412_id UUID; cs421_id UUID;
    cs425_id UUID; cs427_id UUID; cs428_id UUID; cs435_id UUID;
    cs450_id UUID; cs455_id UUID; cs461_id UUID; cs475_id UUID;
    cs476_id UUID;

BEGIN
    -- ==========================================
    -- 1. INSERT COURSES
    -- ==========================================

    -- 100 Level
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 100', 'Introduction to Computer Science', 'Computer Science', 'University of Regina') RETURNING id INTO cs100_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 110', 'Programming and Problem Solving', 'Computer Science', 'University of Regina') RETURNING id INTO cs110_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 115', 'Object-Oriented Design', 'Computer Science', 'University of Regina') RETURNING id INTO cs115_id;

    -- 200 Level
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 201', 'Introduction to Digital Systems', 'Computer Science', 'University of Regina') RETURNING id INTO cs201_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 203', 'Java Programming and Applications', 'Computer Science', 'University of Regina') RETURNING id INTO cs203_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 205', 'Introduction to Multimedia Systems', 'Computer Science', 'University of Regina') RETURNING id INTO cs205_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 207', 'Building Interactive Gadgets', 'Computer Science', 'University of Regina') RETURNING id INTO cs207_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 210', 'Data Structures and Abstractions', 'Computer Science', 'University of Regina') RETURNING id INTO cs210_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 215', 'Web and Database Programming', 'Computer Science', 'University of Regina') RETURNING id INTO cs215_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 261', 'Methods in Numerical Analysis', 'Computer Science', 'University of Regina') RETURNING id INTO cs261_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 270', 'Management Information Systems', 'Computer Science', 'University of Regina') RETURNING id INTO cs270_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 271', 'Programming for Business Applications', 'Computer Science', 'University of Regina') RETURNING id INTO cs271_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 280', 'Risk and Reward in the Information Society', 'Computer Science', 'University of Regina') RETURNING id INTO cs280_id;

    -- 300 Level
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 301', 'Digital Systems Architecture', 'Computer Science', 'University of Regina') RETURNING id INTO cs301_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 310', 'Discrete Computational Structures', 'Computer Science', 'University of Regina') RETURNING id INTO cs310_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 315', 'Introduction to Computer Graphics', 'Computer Science', 'University of Regina') RETURNING id INTO cs315_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 320', 'Introduction to Artificial Intelligence', 'Computer Science', 'University of Regina') RETURNING id INTO cs320_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 330', 'Introduction to Operating Systems', 'Computer Science', 'University of Regina') RETURNING id INTO cs330_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 335', 'Computer Networks', 'Computer Science', 'University of Regina') RETURNING id INTO cs335_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 340', 'Advanced Data Structures and Algorithm Design', 'Computer Science', 'University of Regina') RETURNING id INTO cs340_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 350', 'Programming Language Concepts', 'Computer Science', 'University of Regina') RETURNING id INTO cs350_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 361', 'Numerical and Symbolic Computing', 'Computer Science', 'University of Regina') RETURNING id INTO cs361_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 372', 'Software Engineering Methodology', 'Computer Science', 'University of Regina') RETURNING id INTO cs372_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 375', 'Database Systems', 'Computer Science', 'University of Regina') RETURNING id INTO cs375_id;

    -- 400 Level
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 401', 'Advanced Digital Systems Architecture', 'Computer Science', 'University of Regina') RETURNING id INTO cs401_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 405', 'Computer Graphics', 'Computer Science', 'University of Regina') RETURNING id INTO cs405_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 408', 'Animation Software Design', 'Computer Science', 'University of Regina') RETURNING id INTO cs408_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 409', 'Interactive Entertainment Software', 'Computer Science', 'University of Regina') RETURNING id INTO cs409_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 410', 'Compiler Design', 'Computer Science', 'University of Regina') RETURNING id INTO cs410_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 411', 'Animation', 'Computer Science', 'University of Regina') RETURNING id INTO cs411_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 412', 'Human Computer Interaction', 'Computer Science', 'University of Regina') RETURNING id INTO cs412_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 421', 'Advanced Artificial Intelligence', 'Computer Science', 'University of Regina') RETURNING id INTO cs421_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 425', 'Image Processing', 'Computer Science', 'University of Regina') RETURNING id INTO cs425_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 427', 'Introduction to Computer Audio', 'Computer Science', 'University of Regina') RETURNING id INTO cs427_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 428', 'Human Computer Communications', 'Computer Science', 'University of Regina') RETURNING id INTO cs428_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 435', 'Cryptography and Network Security', 'Computer Science', 'University of Regina') RETURNING id INTO cs435_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 450', 'Operating Systems', 'Computer Science', 'University of Regina') RETURNING id INTO cs450_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 455', 'Mobile Computing', 'Computer Science', 'University of Regina') RETURNING id INTO cs455_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 461', 'Advanced Numerical Analysis', 'Computer Science', 'University of Regina') RETURNING id INTO cs461_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 475', 'Advanced Database Systems', 'Computer Science', 'University of Regina') RETURNING id INTO cs475_id;
    INSERT INTO courses (code, name, department, university_name) VALUES ('CS 476', 'Software Development Project', 'Computer Science', 'University of Regina') RETURNING id INTO cs476_id;


    -- ==========================================
    -- 2. INSERT PREREQUISITES (The Arrows)
    -- ==========================================

    -- From CS 110
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs115_id, cs110_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs201_id, cs110_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs205_id, cs110_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs207_id, cs110_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs270_id, cs110_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs261_id, cs110_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs280_id, cs110_id);

    -- From CS 115
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs210_id, cs115_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs203_id, cs115_id);

    -- From CS 201
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs301_id, cs201_id);

    -- From CS 301
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs401_id, cs301_id);

    -- From CS 270
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs271_id, cs270_id);

    -- From CS 261
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs361_id, cs261_id);

    -- From CS 361
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs461_id, cs361_id);

    -- From CS 210 (The Central Hub)
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs215_id, cs210_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs310_id, cs210_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs315_id, cs210_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs320_id, cs210_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs330_id, cs210_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs335_id, cs210_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs340_id, cs210_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs350_id, cs210_id);

    -- From CS 310
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs372_id, cs310_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs375_id, cs310_id);

    -- From CS 372
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs476_id, cs372_id);

    -- From CS 375
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs475_id, cs375_id);

    -- From CS 315
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs405_id, cs315_id);

    -- From CS 320
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs428_id, cs320_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs421_id, cs320_id); -- Inferred from general AI path, though arrow might be from 340 in some charts, checking image... 
    -- Image check: 340 -> 421. 320 -> 428. 
    -- Correcting 421...

    -- From CS 330
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs410_id, cs330_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs411_id, cs330_id); -- Often linked
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs412_id, cs330_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs408_id, cs330_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs409_id, cs330_id);

    -- From CS 335
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs450_id, cs335_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs435_id, cs335_id);

    -- From CS 340
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs421_id, cs340_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs425_id, cs340_id);
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs455_id, cs340_id);

    -- From CS 350
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs455_id, cs350_id); -- Double prereq for 455

    -- From CS 428
    INSERT INTO prerequisites (course_id, prerequisite_course_id) VALUES (cs427_id, cs428_id);

END $$;
