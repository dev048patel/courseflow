import { notFound } from 'next/navigation';
import { CourseHeader } from '@/components/course/CourseHeader';
import { PrerequisiteTree } from '@/components/course/PrerequisiteTree';
import { ReviewList } from '@/components/course/ReviewList';
import { ReviewForm } from '@/components/course/ReviewForm';
import { SyllabusList } from '@/components/course/SyllabusList';
import { getCourseDetails } from '@/lib/data';

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    const courseData = await getCourseDetails(courseId);

    if (!courseData) return notFound();

    const { course, reviews, syllabi } = courseData;

    return (
        <main className="min-h-screen bg-[#F3F2EF] py-6">
            <div className="max-w-7xl mx-auto px-4">
                {/* Course Header */}
                <CourseHeader
                    code={course.code}
                    name={course.name}
                    description={course.description}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left & Center Column: Reviews (2/3 width) */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Write Review Card */}
                        <section>
                            <h2 className="text-xl font-bold mb-3 text-slate-800 px-1">Write a Review</h2>
                            <ReviewForm courseId={courseId} />
                        </section>

                        {/* Reviews List Card */}
                        <section>
                            <h2 className="text-xl font-bold mb-3 text-slate-800 px-1">
                                Student Reviews ({reviews.length})
                            </h2>
                            {reviews.length > 0 ? (
                                <ReviewList reviews={reviews} />
                            ) : (
                                <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-8 text-center">
                                    <p className="text-slate-500">No reviews yet. Be the first to review!</p>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Sidebar: Tools & Resources (1/3 width) */}
                    <div className="space-y-4">
                        {/* Prerequisite Tree Card */}
                        <section className="bg-white border border-gray-300 rounded-lg shadow-sm p-4">
                            <h3 className="font-semibold mb-3 text-slate-800 text-sm">Prerequisite Path</h3>
                            <PrerequisiteTree courseCode={course.code} />
                        </section>

                        {/* Syllabus Vault Card */}
                        <section className="bg-white border border-gray-300 rounded-lg shadow-sm p-4">
                            <h3 className="font-semibold text-slate-800 mb-3 text-sm">Syllabus Vault</h3>
                            <SyllabusList syllabi={syllabi} courseId={courseId} />
                        </section>

                        {/* Quick Stats Card */}
                        <section className="bg-white border border-gray-300 rounded-lg shadow-sm p-4">
                            <h3 className="font-semibold text-slate-800 mb-3 text-sm">Course Stats</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Total Reviews</span>
                                    <span className="font-semibold text-slate-800">{reviews.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Average Rating</span>
                                    <span className="font-semibold text-slate-800">
                                        {reviews.length > 0
                                            ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                                            : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Syllabi Available</span>
                                    <span className="font-semibold text-slate-800">{syllabi.length}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
