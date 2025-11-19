import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '@/lib/data';

export function ReviewList({ reviews }: { reviews: Review[] }) {
    return (
        <div className="space-y-3">
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
        </div>
    );
}
