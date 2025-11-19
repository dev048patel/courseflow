'use client';

import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { SyllabusUpload as SyllabusUploadType } from '@/lib/data';
import { SyllabusUpload } from './SyllabusUpload';

interface SyllabusListProps {
    syllabi: SyllabusUploadType[];
    courseId: string;
}

export function SyllabusList({ syllabi, courseId }: SyllabusListProps) {
    return (
        <div className="space-y-4">
            {/* Upload Section */}
            <SyllabusUpload courseId={courseId} />

            {/* Syllabi List */}
            {syllabi.length > 0 ? (
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-800">Available Syllabi</h4>
                    {syllabi.map((syllabus) => (
                        <a
                            key={syllabus.id}
                            href={syllabus.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-[#0a66c2] transition-all group"
                        >
                            <FileText className="w-5 h-5 text-[#0a66c2]" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">
                                    {syllabus.semester}
                                </p>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(syllabus.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <Download className="w-4 h-4 text-[#0a66c2] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>
            ) : (
                <p className="text-xs text-slate-500 text-center py-3 bg-gray-50 rounded-lg border border-gray-200">
                    No syllabi available yet. Be the first to upload!
                </p>
            )}
        </div>
    );
}
