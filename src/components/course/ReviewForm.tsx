'use client';

import React, { useState } from 'react';
import { Star, Loader2, CheckCircle } from 'lucide-react';

interface ReviewFormProps {
    courseId: string;
}

export function ReviewForm({ courseId }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }
        if (difficulty === 0) {
            setError('Please select a difficulty level');
            return;
        }
        if (comment.trim() === '') {
            setError('Please write a comment');
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual user ID from authentication
            const userId = 'mock-user-id';
            const professorId = 'mock-professor-id';

            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    courseId,
                    professorId,
                    rating,
                    difficulty,
                    comment,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit review');
            }

            // Success!
            setShowSuccess(true);
            setRating(0);
            setDifficulty(0);
            setComment('');

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
            {showSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium text-sm">Review submitted successfully!</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Rating */}
                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                        Overall Rating *
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setRating(value)}
                                className="transition-transform hover:scale-110"
                            >
                                <Star
                                    className={`w-7 h-7 ${value <= rating
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'text-gray-300'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Difficulty */}
                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                        Difficulty Level *
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setDifficulty(value)}
                                className={`px-4 py-2 rounded-md border-2 text-sm font-medium transition-all ${value === difficulty
                                        ? 'border-[#0a66c2] bg-blue-50 text-[#0a66c2]'
                                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                                    }`}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">1 = Easy, 5 = Very Hard</p>
                </div>

                {/* Comment */}
                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                        Your Review *
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience with this course..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent resize-none text-sm"
                        rows={4}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#0a66c2] text-white py-2.5 rounded-full font-semibold text-sm hover:bg-[#004182] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        'Submit Review'
                    )}
                </button>
            </form>
        </div>
    );
}
