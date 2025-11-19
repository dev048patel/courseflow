-- Storage Policies for Syllabus Vault

-- Note: These commands should be run in the Supabase SQL Editor

-- 1. Create the storage bucket (if not already created via the UI)
-- This can also be created via Supabase Dashboard > Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('syllabi', 'syllabi', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow anyone to download/view syllabi (public read)
CREATE POLICY "Allow public read access to syllabi"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'syllabi');

-- 3. Allow only enrolled users to upload syllabi
-- This policy checks if the user has an enrollment record
CREATE POLICY "Allow enrolled users to upload syllabi"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'syllabi' 
  AND 
  EXISTS (
    SELECT 1 
    FROM enrollments 
    WHERE user_id = auth.uid()
  )
);

-- 4. Allow users to update their own uploads
CREATE POLICY "Allow users to update own syllabi"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'syllabi' 
  AND owner = auth.uid()
);

-- 5. Allow users to delete their own uploads
CREATE POLICY "Allow users to delete own syllabi"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'syllabi' 
  AND owner = auth.uid()
);
