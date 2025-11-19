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
        <main className="container mx-auto px-4 py-8 max-w-5xl">
            {/* 1. Course Info Header */}
            <CourseHeader
                code={course.code}
                name={course.name}
                description={course.description}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {/* Left Column: Reviews (2/3 width) */}
                <div className="md:col-span-2 space-y-8">
                    {/* Review Form */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">Write a Review</h2>
                        <ReviewForm courseId={courseId} />
                    </section>

                    {/* Reviews List */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">Student Reviews</h2>
                        {reviews.length > 0 ? (
                            <ReviewList reviews={reviews} />
                        ) : (
                            <p className="text-slate-500 text-center py-8">No reviews yet. Be the first to review!</p>
                        )}
                    </section>
                </div>

                {/* Right Column: Tools & Stats (1/3 width) */}
                <div className="space-y-6">
                    {/* 2. Visual Prerequisite Tree (Placeholder) */}
                    <section className="bg-slate-50 p-4 rounded-xl border">
                        <h3 className="font-semibold mb-2 text-slate-700">Prerequisite Path</h3>
                        <PrerequisiteTree courseCode={course.code} />
                    </section>

                    {/* Syllabus Vault */}
                    <div className="p-4 border rounded-xl bg-blue-50">
                        <h3 className="font-bold text-blue-800 mb-2">Syllabus Vault</h3>
                        <SyllabusList syllabi={syllabi} courseId={courseId} />
                    </div>
                </div>
            </div>
        </main>
    );
}
