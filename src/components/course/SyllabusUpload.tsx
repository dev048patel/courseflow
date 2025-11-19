'use client';

import React, { useState } from 'react';
import { Upload, Loader2, CheckCircle, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SyllabusUploadProps {
    courseId: string;
    onUploadSuccess?: () => void;
}

export function SyllabusUpload({ courseId, onUploadSuccess }: SyllabusUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [semester, setSemester] = useState('');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!semester.trim()) {
            setError('Please enter the semester');
            return;
        }

        setIsUploading(true);
        setError('');
        setSuccess(false);

        try {
            // TODO: Replace with actual user ID from authentication
            const userId = 'mock-user-id';

            // First, verify the user is enrolled in this course
            const { data: enrollment, error: enrollmentError } = await supabase
                .from('enrollments')
                .select('id')
                .eq('user_id', userId)
                .eq('course_id', courseId)
                .single();

            if (enrollmentError || !enrollment) {
                throw new Error('You must be enrolled in this course to upload a syllabus');
            }

            // Upload file to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${courseId}/${Date.now()}.${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('syllabi')
                .upload(fileName, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from('syllabi')
                .getPublicUrl(fileName);

            // Save the metadata to the database
            const { error: dbError } = await supabase
                .from('syllabus_uploads')
                .insert({
                    course_id: courseId,
                    uploader_enrollment_id: enrollment.id,
                    file_url: publicUrl,
                    semester: semester.trim()
                });

            if (dbError) {
                throw dbError;
            }

            // Success!
            setSuccess(true);
            setSemester('');
            e.target.value = ''; // Reset file input

            // Call callback
            if (onUploadSuccess) {
                onUploadSuccess();
            }

            // Hide success message after 3 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 3000);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload syllabus');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-3">
            {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Syllabus uploaded successfully!</span>
                </div>
            )}

            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Semester
                </label>
                <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="e.g., Fall 2023"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="relative">
                <input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="syllabus-file-input"
                />
                <label
                    htmlFor="syllabus-file-input"
                    className={`flex items-center justify-center gap-2 w-full px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isUploading
                            ? 'bg-slate-100 border-slate-300 cursor-not-allowed'
                            : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50 text-blue-700'
                        }`}
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm font-medium">Uploading...</span>
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4" />
                            <span className="text-sm font-medium">Upload Syllabus</span>
                        </>
                    )}
                </label>
            </div>

            <p className="text-xs text-slate-500">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
            </p>
        </div>
    );
}
