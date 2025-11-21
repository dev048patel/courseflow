import { MapPin, Building2, Calendar, Edit2, Plus, GraduationCap, Award, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-[#F3F2EF] pb-12">
            <div className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Main Content Column */}
                <div className="lg:col-span-3 space-y-4">

                    {/* Profile Header Card */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden relative">
                        {/* Cover Image */}
                        <div className="h-48 bg-gradient-to-r from-[#004182] to-[#0a66c2]"></div>

                        <div className="px-6 pb-6">
                            {/* Profile Picture */}
                            <div className="relative -mt-24 mb-4">
                                <div className="w-40 h-40 bg-white rounded-full p-1.5 inline-block">
                                    <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-slate-400 border-4 border-white">
                                        <span className="text-4xl font-bold">DP</span>
                                    </div>
                                </div>
                                <button className="absolute bottom-2 left-28 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 text-[#0a66c2]">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Basic Info */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">Dev Patel</h1>
                                    <p className="text-base text-slate-900 mt-1">Computer Science Student at University of Technology</p>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> San Francisco Bay Area
                                        </span>
                                        <span className="text-[#0a66c2] font-semibold hover:underline cursor-pointer">Contact info</span>
                                    </div>
                                    <div className="mt-2 text-[#0a66c2] font-semibold hover:underline cursor-pointer text-sm">
                                        500+ connections
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-md">
                                            <Building2 className="w-8 h-8 text-[#0a66c2]" />
                                            <div className="text-sm">
                                                <p className="font-semibold text-slate-900">University of Tech</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-4">
                                <button className="px-6 py-1.5 bg-[#0a66c2] text-white font-semibold rounded-full hover:bg-[#004182] transition-colors">
                                    Open to
                                </button>
                                <button className="px-6 py-1.5 border border-[#0a66c2] text-[#0a66c2] font-semibold rounded-full hover:bg-blue-50 transition-colors">
                                    Add profile section
                                </button>
                                <button className="px-6 py-1.5 border border-gray-500 text-gray-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                                    More
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-bold text-slate-900">About</h2>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Edit2 className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                        <p className="text-sm text-slate-900 leading-relaxed">
                            Passionate Computer Science student with a focus on Full Stack Development and Artificial Intelligence.
                            Experienced in building web applications using React, Next.js, and Node.js.
                            Always eager to learn new technologies and solve complex problems.
                        </p>
                    </div>

                    {/* Education Section */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-slate-900">Education</h2>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Plus className="w-5 h-5 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Edit2 className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-6 h-6 text-gray-500" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900">University of Technology</h3>
                                <p className="text-sm text-slate-900">Bachelor of Science - BS, Computer Science</p>
                                <p className="text-sm text-slate-500">2022 - 2026</p>
                                <p className="text-sm text-slate-900 mt-2">
                                    <span className="font-semibold">Activities and societies:</span> Computer Science Club, Hackathon Team, AI Research Group
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-slate-900">Experience</h2>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Plus className="w-5 h-5 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Edit2 className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                                    <BriefcaseIcon className="w-6 h-6 text-[#0a66c2]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900">Software Engineering Intern</h3>
                                    <p className="text-sm text-slate-900">TechCorp Inc. • Internship</p>
                                    <p className="text-sm text-slate-500">Jun 2024 - Aug 2024 • 3 mos</p>
                                    <p className="text-sm text-slate-500">San Francisco, California, United States</p>
                                    <p className="text-sm text-slate-900 mt-2">
                                        Developed full-stack features for the main product dashboard using React and Node.js. Improved API performance by 20%.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Verified Courses Section (Unique to CourseFlow) */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-slate-900">Verified Course History</h2>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">Verified Student</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { code: 'CS 101', name: 'Intro to Computer Science', grade: 'A', term: 'Fall 2022' },
                                { code: 'MATH 201', name: 'Calculus II', grade: 'A-', term: 'Spring 2023' },
                                { code: 'CS 202', name: 'Data Structures', grade: 'B+', term: 'Fall 2023' },
                                { code: 'PHYS 101', name: 'General Physics', grade: 'A', term: 'Fall 2023' },
                            ].map((course, idx) => (
                                <div key={idx} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="w-5 h-5 text-[#0a66c2]" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 text-sm">{course.code}: {course.name}</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">{course.term}</p>
                                            <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700">
                                                Grade: {course.grade}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <button className="text-sm font-semibold text-slate-600 hover:bg-gray-100 px-4 py-2 rounded transition-colors">
                                Show all 12 courses
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="hidden lg:block lg:col-span-1 space-y-4">

                    {/* Profile Language & URL */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
                            <h3 className="font-semibold text-slate-600 text-sm">Profile language</h3>
                            <Edit2 className="w-4 h-4 text-gray-500 cursor-pointer" />
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-slate-600 text-sm">Public profile & URL</h3>
                            <Edit2 className="w-4 h-4 text-gray-500 cursor-pointer" />
                        </div>
                    </div>

                    {/* Suggested for you */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4">
                        <h3 className="font-semibold text-slate-900 mb-3">Suggested for you</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0"></div>
                                <div>
                                    <h4 className="font-semibold text-sm text-slate-900">Learn React Native</h4>
                                    <p className="text-xs text-slate-500">Course • 2h 30m</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0"></div>
                                <div>
                                    <h4 className="font-semibold text-sm text-slate-900">Mastering CSS Grid</h4>
                                    <p className="text-xs text-slate-500">Course • 1h 45m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

function BriefcaseIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    );
}
