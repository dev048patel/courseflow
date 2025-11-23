'use client';

import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Flag, MoreHorizontal } from 'lucide-react';
import { Review } from '@/lib/data';

interface ReviewListProps {
    initialReviews: Review[];
    courseId: string;
}

export function ReviewList({ initialReviews, courseId }: ReviewListProps) {
    const [reviews, setReviews] = useState(initialReviews);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialReviews.length >= 5); // Assuming limit is 5

    const loadMore = async () => {
        setLoading(true);
        const nextPage = page + 1;
        try {
            const res = await fetch(`/api/reviews?courseId=${courseId}&page=${nextPage}&limit=5`);
            const newReviews = await res.json();

            if (newReviews.length < 5) {
                setHasMore(false);
            }

            setReviews([...reviews, ...newReviews]);
            setPage(nextPage);
        } catch (error) {
            console.error('Failed to load reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-300 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                        {/* Anonymous Metadata Badge */}
                        <div className="flex flex-col">
                            <span className="font-semibold text-slate-800 text-sm">
                                {review.author_year_snapshot === 1 ? "Freshman" :
                                    review.author_year_snapshot === 2 ? "Sophomore" :
                                        review.author_year_snapshot === 3 ? "Junior" : "Senior"}
                                {" "}• {review.author_major_snapshot} Major
                            </span>
                            <span className="text-xs text-slate-500 mt-1">
                                Verified Grade: <span className="font-medium text-green-600">{review.author_grade_snapshot}</span>
                            </span>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                            <span className="font-bold mr-1 text-sm text-amber-700">{review.rating}</span>
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        </div>
                    </div>

                    <p className="text-slate-700 text-sm leading-relaxed">
                        "{review.comment}"
                    </p>
                </div>
            ))}

            {hasMore && (
                <button
                    onClick={loadMore}
                    disabled={loading}
                    className="w-full py-3 text-sm font-semibold text-[#0a66c2] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Show more reviews'}
                </button>
            )}
        </div>
    );
}
