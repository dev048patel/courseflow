'use client';

import Link from 'next/link';
import { Home, Users, BookOpen, Search, Briefcase } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-[#0a66c2] rounded flex items-center justify-center text-white font-bold text-lg">
                            CF
                        </div>
                        <span className="hidden md:block font-semibold text-gray-800">CourseFlow</span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md mx-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses, professors..."
                                className="w-full pl-10 pr-4 py-1.5 bg-[#EEF3F8] rounded-md text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0a66c2] transition-all"
                            />
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 group">
                            <Home className="w-5 h-5" />
                            <span className="text-xs font-medium">Home</span>
                        </Link>
                        <Link href="/network" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 group">
                            <Users className="w-5 h-5" />
                            <span className="text-xs font-medium">Network</span>
                        </Link>
                        <Link href="/jobs" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 group">
                            <Briefcase className="w-5 h-5" />
                            <span className="text-xs font-medium">Jobs</span>
                        </Link>
                        <Link href="/courses" className="flex flex-col items-center gap-0.5 text-[#0a66c2] group">
                            <BookOpen className="w-5 h-5" />
                            <span className="text-xs font-medium">Courses</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
