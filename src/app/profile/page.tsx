import { MapPin, Building2, Calendar, Edit2, Plus, GraduationCap, Award, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-[#0B0C0E] pb-12 pt-20"> {/* Added pt-20 for fixed navbar */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Main Content Column */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Profile Header Card */}
                    <div className="glass-panel rounded-xl overflow-hidden relative border border-white/10">
                        {/* Cover Image */}
                        <div className="h-48 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900"></div>

                        <div className="px-8 pb-8">
                            {/* Profile Picture */}
                            <div className="relative -mt-20 mb-6">
                                <div className="w-40 h-40 rounded-full p-1.5 inline-block bg-[#0B0C0E]">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white border-4 border-[#0B0C0E] shadow-2xl">
                                        <span className="text-4xl font-bold">DP</span>
                                    </div>
                                </div>
                                <button className="absolute bottom-2 left-28 p-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-500 text-white transition-all">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Basic Info */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-white tracking-tight">Dev Patel</h1>
                                    <p className="text-lg text-blue-200 mt-1">Computer Science Student at University of Technology</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-3">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4 text-blue-400" /> San Francisco Bay Area
                                        </span>
                                        <span className="text-blue-400 font-semibold hover:text-blue-300 cursor-pointer transition-colors">Contact info</span>
                                    </div>
                                    <div className="mt-2 text-blue-400 font-semibold hover:text-blue-300 cursor-pointer text-sm transition-colors">
                                        500+ connections
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                                        <Building2 className="w-8 h-8 text-blue-400" />
                                        <div className="text-sm">
                                            <p className="font-semibold text-white">University of Tech</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                    Open to
                                </button>
                                <button className="px-6 py-2 border border-blue-500/50 text-blue-400 font-semibold rounded-full hover:bg-blue-500/10 transition-all">
                                    Add profile section
                                </button>
                                <button className="px-6 py-2 border border-white/20 text-gray-300 font-semibold rounded-full hover:bg-white/5 transition-all">
                                    More
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="glass-panel rounded-xl p-8 border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">About</h2>
                            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <Edit2 className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Passionate Computer Science student with a focus on Full Stack Development and Artificial Intelligence.
                            Experienced in building web applications using React, Next.js, and Node.js.
                            Always eager to learn new technologies and solve complex problems.
                        </p>
                    </div>

                    {/* Education Section */}
                    <div className="glass-panel rounded-xl p-8 border border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Education</h2>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <Plus className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <Edit2 className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
                                <Building2 className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">University of Technology</h3>
                                <p className="text-sm text-gray-300">Bachelor of Science - BS, Computer Science</p>
                                <p className="text-sm text-gray-500 mt-1">2022 - 2026</p>
                                <p className="text-sm text-gray-400 mt-3">
                                    <span className="font-semibold text-white">Activities and societies:</span> Computer Science Club, Hackathon Team, AI Research Group
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="glass-panel rounded-xl p-8 border border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Experience</h2>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <Plus className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <Edit2 className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                                    <BriefcaseIcon className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Software Engineering Intern</h3>
                                    <p className="text-sm text-gray-300">TechCorp Inc. • Internship</p>
                                    <p className="text-sm text-gray-500 mt-1">Jun 2024 - Aug 2024 • 3 mos</p>
                                    <p className="text-sm text-gray-500">San Francisco, California, United States</p>
                                    <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                                        Developed full-stack features for the main product dashboard using React and Node.js. Improved API performance by 20%.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Verified Courses Section (Unique to CourseFlow) */}
                    <div className="glass-panel rounded-xl p-8 border border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Verified Course History</h2>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold rounded-full uppercase tracking-wide shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                                    Verified Student
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { code: 'CS 101', name: 'Intro to Computer Science', grade: 'A', term: 'Fall 2022' },
                                { code: 'MATH 201', name: 'Calculus II', grade: 'A-', term: 'Spring 2023' },
                                { code: 'CS 202', name: 'Data Structures', grade: 'B+', term: 'Fall 2023' },
                                { code: 'PHYS 101', name: 'General Physics', grade: 'A', term: 'Fall 2023' },
                            ].map((course, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/10 transition-all hover:border-white/20 group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <BookOpen className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{course.code}: {course.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{course.term}</p>
                                            <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                                                Grade: {course.grade}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <button className="text-sm font-semibold text-gray-400 hover:text-white px-4 py-2 rounded transition-colors">
                                Show all 12 courses
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="hidden lg:block lg:col-span-1 space-y-6">

                    {/* Profile Language & URL */}
                    <div className="glass-panel rounded-xl p-6 border border-white/10">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                            <h3 className="font-semibold text-gray-300 text-sm">Profile language</h3>
                            <Edit2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-white" />
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-300 text-sm">Public profile & URL</h3>
                            <Edit2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-white" />
                        </div>
                    </div>

                    {/* Suggested for you */}
                    <div className="glass-panel rounded-xl p-6 border border-white/10">
                        <h3 className="font-semibold text-white mb-4">Suggested for you</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3 group cursor-pointer">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex-shrink-0 border border-white/5 group-hover:border-white/20 transition-colors"></div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-200 group-hover:text-blue-400 transition-colors">Learn React Native</h4>
                                    <p className="text-xs text-gray-500">Course • 2h 30m</p>
                                </div>
                            </div>
                            <div className="flex gap-3 group cursor-pointer">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex-shrink-0 border border-white/5 group-hover:border-white/20 transition-colors"></div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-200 group-hover:text-blue-400 transition-colors">Mastering CSS Grid</h4>
                                    <p className="text-xs text-gray-500">Course • 1h 45m</p>
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
