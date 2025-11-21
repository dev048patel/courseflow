import { createClient } from '@/utils/supabase/server';
import { Star, BookOpen, Trash2, Edit2 } from 'lucide-react';
import Link from 'next/link';

export default async function MyReviewsPage() {
    // In a real app, we would get the logged-in user's ID
    // For this demo, we'll fetch recent reviews to simulate "my" reviews
    const supabase = await createClient();
    const { data: reviews } = await supabase
        .from('reviews')
        .select(`
      *,
      courses (
        id,
        code,
        name
      )
    `)
        .limit(5);

    return (
        <main className="min-h-screen bg-[#F3F2EF] py-6">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header Card */}
                <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 mb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">My Reviews</h1>
                        <p className="text-sm text-slate-600 mt-1">Manage and edit your course contributions</p>
                    </div>
                    <div className="bg-blue-50 text-[#0a66c2] px-4 py-2 rounded-lg font-semibold text-sm">
                        {reviews?.length || 0} Reviews Posted
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review: any) => (
                            <div key={review.id} className="bg-white border border-gray-300 rounded-lg shadow-sm p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-[#0a66c2]" />
                                        </div>
                                        <div>
                                            <Link href={`/courses/${review.courses.id}`} className="font-semibold text-slate-800 hover:text-[#0a66c2] hover:underline">
                                                {review.courses.code}: {review.courses.name}
                                            </Link>
                                            <p className="text-xs text-slate-500">Posted on {new Date(review.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-slate-500 hover:bg-gray-100 rounded-full transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="pl-13">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">
                                            • Difficulty: {review.difficulty}/5
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        "{review.comment}"
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">No reviews yet</h3>
                            <p className="text-slate-600 mb-6">You haven't written any reviews yet. Share your experience!</p>
                            <Link
                                href="/courses"
                                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-[#0a66c2] hover:bg-[#004182] transition-colors"
                            >
                                Write a Review
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
