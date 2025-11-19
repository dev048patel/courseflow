import React from 'react';

interface CourseHeaderProps {
    code: string;
    name: string;
    description: string;
}

export function CourseHeader({ code, name, description }: CourseHeaderProps) {
    return (
        <div className="bg-white border-b pb-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
                    {code}
                </span>
                <h1 className="text-3xl font-bold text-slate-900">{name}</h1>
            </div>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                {description}
            </p>
        </div>
    );
}
