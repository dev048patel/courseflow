import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Search, BookOpen, ArrowRight } from 'lucide-react';

export default async function CoursesPage() {
    const supabase = await createClient();
    const { data: courses } = await supabase.from('courses').select('*').limit(20);

    return (
        <main className="min-h-screen bg-[#F3F2EF] py-6">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Sidebar - Filters */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 sticky top-20">
                        <h3 className="font-semibold text-slate-800 mb-4">Filter Courses</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-600 uppercase mb-2 block">Department</label>
                                <div className="space-y-2">
                                    {['Computer Science', 'Mathematics', 'Physics', 'Biology', 'Economics'].map((dept) => (
                                        <label key={dept} className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="rounded text-[#0a66c2] focus:ring-[#0a66c2]" />
                                            <span className="text-sm text-slate-700">{dept}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <label className="text-xs font-semibold text-slate-600 uppercase mb-2 block">Level</label>
                                <div className="space-y-2">
                                    {['100 Level', '200 Level', '300 Level', '400+ Level'].map((level) => (
                                        <label key={level} className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="rounded text-[#0a66c2] focus:ring-[#0a66c2]" />
                                            <span className="text-sm text-slate-700">{level}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Course List */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Search Header */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4">
                        <h1 className="text-xl font-bold text-slate-800 mb-4">Browse Courses</h1>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by course code, name, or topic..."
                                className="w-full pl-10 pr-4 py-2 bg-[#EEF3F8] border border-transparent rounded-md text-sm focus:outline-none focus:bg-white focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] transition-all"
                            />
                        </div>
                    </div>

                    {/* Course Cards */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                        {courses && courses.length > 0 ? (
                            <div className="divide-y divide-gray-200">
                                {courses.map((course) => (
                                    <div key={course.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                                                    <BookOpen className="w-6 h-6 text-[#0a66c2]" />
                                                </div>
                                                <div>
                                                    <Link href={`/courses/${course.id}`} className="text-base font-semibold text-[#0a66c2] hover:underline">
                                                        {course.code}: {course.name}
                                                    </Link>
                                                    <p className="text-sm text-slate-600 mt-1">{course.department} • {course.university_name}</p>
                                                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">{course.description}</p>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/courses/${course.id}`}
                                                className="hidden sm:flex items-center gap-1 px-4 py-1.5 rounded-full border border-[#0a66c2] text-[#0a66c2] font-semibold text-sm hover:bg-blue-50 transition-colors"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-slate-500">No courses found. Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
