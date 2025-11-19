import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '@/lib/data';

export function ReviewList({ reviews }: { reviews: Review[] }) {
    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.id} className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                        {/* Anonymous Metadata Badge */}
                        <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">
                                {review.author_year_snapshot === 1 ? "Freshman" :
                                    review.author_year_snapshot === 2 ? "Sophomore" :
                                        review.author_year_snapshot === 3 ? "Junior" : "Senior"}
                                {" "}&bull; {review.author_major_snapshot} Major
                            </span>
                            <span className="text-xs text-slate-500 uppercase tracking-wide mt-1">
                                Verified Grade: <span className="font-medium text-green-600">{review.author_grade_snapshot}</span>
                            </span>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-amber-700">
                            <span className="font-bold mr-1">{review.rating}</span>
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                    </div>

                    <p className="text-slate-700 leading-relaxed">
                        "{review.comment}"
                    </p>
                </div>
            ))}
        </div>
    );
}
