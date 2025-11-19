-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    university_name TEXT NOT NULL,
    major TEXT NOT NULL,
    graduation_year INTEGER NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE, -- Set to TRUE after .edu email verification
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Professors Table
CREATE TABLE professors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    university_name TEXT NOT NULL
);

-- 3. Courses Table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL, -- e.g., "BIO 101"
    name TEXT NOT NULL, -- e.g., "Introduction to Biology"
    department TEXT NOT NULL,
    university_name TEXT NOT NULL,
    description TEXT,
    UNIQUE(code, university_name)
);

-- 4. Enrollments (The Link)
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    semester TEXT NOT NULL, -- e.g., "Fall 2023"
    grade_range TEXT, -- e.g., "A", "B+", "Pass" (Private/Verified data)
    visible_on_profile BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id) -- Prevent duplicate enrollments
);

-- 5. Reviews (Anonymity Engine)
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    professor_id UUID REFERENCES professors(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 5),
    comment TEXT,
    
    -- Anonymity Metadata (Snapshot at time of review)
    author_year_snapshot INTEGER, -- e.g., 3 (Junior)
    author_major_snapshot TEXT,   -- e.g., "Biology"
    author_grade_snapshot TEXT,   -- e.g., "A"
    
    -- Internal Verification Link (NOT exposed to public API)
    -- We link to Enrollment, not User directly, to enforce "Must have taken class"
    linked_enrollment_id UUID REFERENCES enrollments(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Syllabus Vault
CREATE TABLE syllabus_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    uploader_enrollment_id UUID REFERENCES enrollments(id) ON DELETE SET NULL,
    file_url TEXT NOT NULL,
    semester TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Marketplace Listings
CREATE TABLE marketplace_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE, -- "Selling book for BIO 101"
    title TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active', -- active, sold
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
