import React from 'react';

interface PrerequisiteTreeProps {
    courseCode: string;
}

export function PrerequisiteTree({ courseCode }: PrerequisiteTreeProps) {
    return (
        <div className="flex flex-col items-center justify-center h-48 text-slate-400 border-2 border-dashed rounded-lg">
            <p className="text-sm font-medium">Visual Prerequisite Tree</p>
            <p className="text-xs mt-1">Graph for {courseCode} loading...</p>
        </div>
    );
}
