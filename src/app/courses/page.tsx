import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Search, BookOpen, ArrowRight, Filter } from 'lucide-react';

export default async function CoursesPage() {
    const supabase = await createClient();
    const { data: courses } = await supabase.from('courses').select('*').limit(20);

    return (
        <main className="min-h-screen bg-[#0B0C0E] py-6 pt-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Sidebar - Filters */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="glass-panel rounded-xl p-6 sticky top-24 border border-white/10">
                        <div className="flex items-center gap-2 mb-6">
                            <Filter className="w-4 h-4 text-blue-400" />
                            <h3 className="font-bold text-white">Filter Courses</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-3 block tracking-wider">Department</label>
                                <div className="space-y-3">
                                    {['Computer Science', 'Mathematics', 'Physics', 'Biology', 'Economics'].map((dept) => (
                                        <label key={dept} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer h-4 w-4 rounded border-gray-600 bg-[#1A1C23] text-blue-500 focus:ring-blue-500/20 focus:ring-offset-0 transition-all" />
                                            </div>
                                            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{dept}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-6 border-t border-white/10">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-3 block tracking-wider">Level</label>
                                <div className="space-y-3">
                                    {['100 Level', '200 Level', '300 Level', '400+ Level'].map((level) => (
                                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer h-4 w-4 rounded border-gray-600 bg-[#1A1C23] text-blue-500 focus:ring-blue-500/20 focus:ring-offset-0 transition-all" />
                                            </div>
                                            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{level}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Course List */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Search Header */}
                    <div className="glass-panel rounded-xl p-6 border border-white/10">
                        <h1 className="text-2xl font-bold text-white mb-6">Browse Courses</h1>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by course code, name, or topic..."
                                className="w-full pl-12 pr-4 py-4 bg-[#1A1C23] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Course Cards */}
                    <div className="space-y-4">
                        {courses && courses.length > 0 ? (
                            courses.map((course) => (
                                <div key={course.id} className="glass-panel rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all group hover:bg-[#1A1C23]/80">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-5">
                                            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform">
                                                <BookOpen className="w-7 h-7 text-blue-400" />
                                            </div>
                                            <div>
                                                <Link href={`/courses/${course.id}`} className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                                    {course.code}: {course.name}
                                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </Link>
                                                <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                                                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs">{course.department}</span>
                                                    <span>•</span>
                                                    <span>{course.university_name}</span>
                                                </p>
                                                <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed max-w-2xl">{course.description}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/courses/${course.id}`}
                                            className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-blue-600 hover:border-blue-500 transition-all"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="glass-panel rounded-xl p-12 text-center border border-white/10">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-600" />
                                </div>
                                <h3 className="text-lg font-bold text-white">No courses found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
