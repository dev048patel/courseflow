import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface PrerequisiteTreeProps {
    courseId: string;
    courseCode: string;
}

export function PrerequisiteTree({ courseId, courseCode }: PrerequisiteTreeProps) {
    // Mock data for visualization (since we don't have real data populated yet)
    // In a real app, this would be fetched from the 'prerequisites' table
    const treeData = {
        code: courseCode,
        children: [
            { code: 'CS 101', children: [] },
            {
                code: 'MATH 101',
                children: [
                    { code: 'MATH 100', children: [] }
                ]
            }
        ]
    };

    const renderNode = (node: any, isRoot = false) => (
        <div className="flex flex-col items-center">
            <div className={`
        px-4 py-2 rounded-lg border shadow-sm text-sm font-semibold mb-4 relative
        ${isRoot ? 'bg-[#0a66c2] text-white border-[#0a66c2]' : 'bg-white text-slate-800 border-gray-300'}
      `}>
                {node.code}
                {!isRoot && (
                    <div className="absolute -bottom-4 left-1/2 w-px h-4 bg-gray-300 -translate-x-1/2"></div>
                )}
            </div>

            {node.children.length > 0 && (
                <div className="flex gap-4 relative">
                    {/* Connector line for multiple children */}
                    {node.children.length > 1 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] h-px bg-gray-300"></div>
                    )}

                    {node.children.map((child: any, idx: number) => (
                        <div key={idx} className="relative pt-4">
                            {/* Vertical line to child */}
                            <div className="absolute -top-0 left-1/2 w-px h-4 bg-gray-300 -translate-x-1/2"></div>
                            {renderNode(child)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-[#0a66c2]" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Prerequisite Path</h3>
            </div>

            <div className="overflow-x-auto pb-4">
                <div className="min-w-[300px] flex justify-center">
                    {/* 
             Simple Tree Visualization 
             Root is at the bottom (target course), prerequisites are above it? 
             Or Root at top (prereq) -> Target?
             Usually Prereq Tree shows what you need BEFORE.
             Let's show Target at TOP, and prerequisites BELOW it (dependencies).
             Actually, "Prerequisite Tree" usually means "What unlocks what".
             But for a single course page, we want "What do I need to take THIS course?"
             So: Target Course -> requires -> Prereq 1 & Prereq 2.
           */}

                    <div className="flex flex-col items-center">
                        {/* Target Course */}
                        <div className="px-6 py-3 bg-[#0a66c2] text-white rounded-lg font-bold shadow-md mb-8 relative z-10">
                            {courseCode}
                        </div>

                        {/* Connector */}
                        <div className="h-8 w-px bg-gray-300 -mt-8 mb-0"></div>

                        {/* Prerequisites Level 1 */}
                        <div className="flex gap-8 relative">
                            {/* Horizontal Bar if multiple */}
                            <div className="absolute top-0 left-8 right-8 h-px bg-gray-300"></div>

                            {/* Mock Prereq 1 */}
                            <div className="flex flex-col items-center relative">
                                <div className="h-4 w-px bg-gray-300"></div>
                                <Link href="#" className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-semibold text-slate-700 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors shadow-sm">
                                    CS 101
                                </Link>
                            </div>

                            {/* Mock Prereq 2 */}
                            <div className="flex flex-col items-center relative">
                                <div className="h-4 w-px bg-gray-300"></div>
                                <Link href="#" className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-semibold text-slate-700 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors shadow-sm">
                                    MATH 101
                                </Link>

                                {/* Nested Prereq */}
                                <div className="h-4 w-px bg-gray-300"></div>
                                <Link href="#" className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-semibold text-slate-700 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors shadow-sm">
                                    MATH 100
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center">
                <p className="text-xs text-slate-500">
                    Visualizing the path to <strong>{courseCode}</strong>
                </p>
            </div>
        </div>
    );
}
