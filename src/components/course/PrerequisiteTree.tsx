import React from 'react';
import { GitBranch } from 'lucide-react';

interface PrerequisiteTreeProps {
    courseCode: string;
}

export function PrerequisiteTree({ courseCode }: PrerequisiteTreeProps) {
    return (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <GitBranch className="w-8 h-8 mb-2" />
            <p className="text-sm font-medium text-gray-600">Prerequisite Graph</p>
            <p className="text-xs mt-1 text-gray-500">For {courseCode}</p>
            <p className="text-xs mt-2 text-gray-400">Coming Soon</p>
        </div>
    );
}
