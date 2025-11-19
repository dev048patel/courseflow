import React from 'react';

interface CourseHeaderProps {
    code: string;
    name: string;
    description: string;
}

export function CourseHeader({ code, name, description }: CourseHeaderProps) {
    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
                <span className="px-4 py-1.5 bg-[#0a66c2] text-white text-sm font-bold rounded-full">
                    {code}
                </span>
                <h1 className="text-2xl font-bold text-slate-800">{name}</h1>
            </div>
            <p className="text-base text-slate-600 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
