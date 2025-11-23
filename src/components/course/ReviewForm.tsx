'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Star, Briefcase, Users, Check, Search } from 'lucide-react';
import { TagInput } from '@/components/ui/TagInput';
import { motion, AnimatePresence } from 'framer-motion';

export function ReviewForm() {
    const [courseQuery, setCourseQuery] = useState('');
    const [professorQuery, setProfessorQuery] = useState('');
    const [rating, setRating] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [comment, setComment] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [careerRelevance, setCareerRelevance] = useState(0);
    const [mentorship, setMentorship] = useState({
        is_accessible: false,
        is_career_mentor: false,
        inspires_interest: false
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Suggestions state
    const [courseSuggestions, setCourseSuggestions] = useState<any[]>([]);
    const [profSuggestions, setProfSuggestions] = useState<any[]>([]);
    const [showCourseSuggestions, setShowCourseSuggestions] = useState(false);
    const [showProfSuggestions, setShowProfSuggestions] = useState(false);

    const supabase = createClient();

    // Fetch suggestions
    useEffect(() => {
        const fetchCourses = async () => {
            if (courseQuery.length < 2) {
                setCourseSuggestions([]);
                return;
            }
            const { data } = await supabase
                .from('courses')
                .select('code, name')
                .ilike('code', `%${courseQuery}%`)
                .limit(5);
            setCourseSuggestions(data || []);
        };
        const timer = setTimeout(fetchCourses, 300);
        return () => clearTimeout(timer);
    }, [courseQuery]);

    useEffect(() => {
        const fetchProfs = async () => {
            if (professorQuery.length < 2) {
                setProfSuggestions([]);
                return;
            }
            const { data } = await supabase
                .from('professors')
                .select('name')
                .ilike('name', `%${professorQuery}%`)
                .limit(5);
            setProfSuggestions(data || []);
        };
        const timer = setTimeout(fetchProfs, 300);
        return () => clearTimeout(timer);
    }, [professorQuery]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (rating === 0 || difficulty === 0) {
            setError('Please provide a rating and difficulty score.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    course_code: courseQuery,
                    course_name: courseQuery, // Fallback
                    professor_name: professorQuery,
                    rating,
                    difficulty,
                    comment,
                    skills_learned: skills,
                    career_relevance_rating: careerRelevance,
                    mentorship_score: mentorship
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit review');
            }

            setSuccess(true);
            // Reset form
            setCourseQuery('');
            setProfessorQuery('');
            setRating(0);
            setDifficulty(0);
            setComment('');
            setSkills([]);
            setCareerRelevance(0);
            setMentorship({ is_accessible: false, is_career_mentor: false, inspires_interest: false });

            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel p-6 rounded-xl border border-white/10">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Write a Review</h2>
                <p className="text-sm text-gray-400">Share your experience to help others.</p>
            </div>

            {success ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-center gap-3 text-green-400"
                >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="font-semibold">Review Submitted!</p>
                        <p className="text-xs opacity-80">Thanks for contributing to the community.</p>
                    </div>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Course Input */}
                    <div className="space-y-1.5 relative">
                        <label className="text-xs font-medium text-gray-400 ml-1">Course Code</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                value={courseQuery}
                                onChange={(e) => {
                                    setCourseQuery(e.target.value);
                                    setShowCourseSuggestions(true);
                                }}
                                onFocus={() => setShowCourseSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowCourseSuggestions(false), 200)}
                                placeholder="e.g. CS 110"
                                className="input-primary pl-10"
                                required
                            />
                        </div>
                        {/* Suggestions Dropdown */}
                        <AnimatePresence>
                            {showCourseSuggestions && courseSuggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute z-10 w-full mt-1 bg-[#1A1C23] border border-white/10 rounded-lg shadow-xl overflow-hidden"
                                >
                                    {courseSuggestions.map((course) => (
                                        <button
                                            key={course.code}
                                            type="button"
                                            onClick={() => {
                                                setCourseQuery(course.code);
                                                setShowCourseSuggestions(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            <span className="font-bold text-blue-400">{course.code}</span> - {course.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Professor Input */}
                    <div className="space-y-1.5 relative">
                        <label className="text-xs font-medium text-gray-400 ml-1">Professor</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                value={professorQuery}
                                onChange={(e) => {
                                    setProfessorQuery(e.target.value);
                                    setShowProfSuggestions(true);
                                }}
                                onFocus={() => setShowProfSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowProfSuggestions(false), 200)}
                                placeholder="e.g. Dr. Smith"
                                className="input-primary pl-10"
                                required
                            />
                        </div>
                        {/* Suggestions Dropdown */}
                        <AnimatePresence>
                            {showProfSuggestions && profSuggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute z-10 w-full mt-1 bg-[#1A1C23] border border-white/10 rounded-lg shadow-xl overflow-hidden"
                                >
                                    {profSuggestions.map((prof) => (
                                        <button
                                            key={prof.name}
                                            type="button"
                                            onClick={() => {
                                                setProfessorQuery(prof.name);
                                                setShowProfSuggestions(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            {prof.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Ratings Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400 ml-1">Quality (1-5)</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`p-1 rounded-md transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-500'
                                            }`}
                                    >
                                        <Star className="w-6 h-6 fill-current" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400 ml-1">Difficulty (1-5)</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => setDifficulty(level)}
                                        className={`w-8 h-8 rounded-md text-sm font-bold transition-all border ${difficulty === level
                                                ? 'bg-red-500/20 border-red-500 text-red-400'
                                                : 'border-gray-700 text-gray-500 hover:border-gray-500'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Skills Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Skills Learned</label>
                        <TagInput
                            tags={skills}
                            onTagsChange={setSkills}
                            placeholder="Type a skill and press Enter (e.g. React, SQL)"
                        />
                    </div>

                    {/* Career Relevance */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Career Relevance (1-5)</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={careerRelevance}
                                onChange={(e) => setCareerRelevance(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <span className="text-sm font-bold text-blue-400 w-4">{careerRelevance}</span>
                        </div>
                    </div>

                    {/* Mentorship Checkboxes */}
                    <div className="space-y-2 p-3 rounded-lg bg-white/5 border border-white/5">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={mentorship.is_accessible}
                                onChange={(e) => setMentorship({ ...mentorship, is_accessible: e.target.checked })}
                                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500/20"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Professor is accessible outside class</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={mentorship.is_career_mentor}
                                onChange={(e) => setMentorship({ ...mentorship, is_career_mentor: e.target.checked })}
                                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500/20"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Provides career guidance/mentorship</span>
                        </label>
                    </div>

                    {/* Comment */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Review</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="What was the course like? Any tips?"
                            className="input-primary min-h-[100px] resize-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full"
                    >
                        {loading ? 'Submitting...' : 'Post Review'}
                    </button>
                </form>
            )}
        </div>
    );
}
