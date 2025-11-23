-- Create user_pathways table for Personal Roadmap
CREATE TABLE IF NOT EXISTS user_pathways (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    parent_course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    status TEXT CHECK (status IN ('planned', 'in-progress', 'completed')) DEFAULT 'planned',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_pathways_user_id ON user_pathways(user_id);
