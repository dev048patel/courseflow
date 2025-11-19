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
        <div className="bg-white border rounded-lg p-6 shadow-sm">
            {showSuccess && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Review submitted successfully!</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
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
                                    className={`w-8 h-8 ${value <= rating
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'text-slate-300'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Difficulty */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Difficulty Level *
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setDifficulty(value)}
                                className={`px-4 py-2 rounded-md border-2 transition-all ${value === difficulty
                                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                                        : 'border-slate-300 text-slate-600 hover:border-slate-400'
                                    }`}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">1 = Easy, 5 = Very Hard</p>
                </div>

                {/* Comment */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Your Review *
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience with this course..."
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={4}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
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
