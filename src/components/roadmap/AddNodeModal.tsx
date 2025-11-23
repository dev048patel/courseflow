'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Plus } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface AddNodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: any) => void;
    existingNodes: any[];
}

export function AddNodeModal({ isOpen, onClose, onAdd, existingNodes }: AddNodeModalProps) {
    const [courseQuery, setCourseQuery] = useState('');
    const [parentId, setParentId] = useState('');
    const [status, setStatus] = useState('planned');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        const fetchCourses = async () => {
            if (courseQuery.length < 2) {
                setSuggestions([]);
                return;
            }
            const { data } = await supabase
                .from('courses')
                .select('code, name')
                .ilike('code', `%${courseQuery}%`)
                .limit(5);
            setSuggestions(data || []);
        };
        const timer = setTimeout(fetchCourses, 300);
        return () => clearTimeout(timer);
    }, [courseQuery]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/roadmap/personal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    course_code: courseQuery,
                    parent_course_id: parentId || null,
                    status
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            onAdd(data);
            onClose();
            // Reset
            setCourseQuery('');
            setParentId('');
            setStatus('planned');
        } catch (error) {
            console.error('Failed to add node:', error);
            // Handle error (toast, etc)
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-md h-fit z-50"
                    >
                        <div className="glass-panel p-6 rounded-xl border border-white/10 shadow-2xl mx-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white">Add to Roadmap</h3>
                                <button onClick={onClose} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                                setShowSuggestions(true);
                                            }}
                                            onFocus={() => setShowSuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                            placeholder="e.g. CS 400"
                                            className="input-primary pl-10"
                                            required
                                        />
                                    </div>
                                    {/* Suggestions */}
                                    {showSuggestions && suggestions.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-[#1A1C23] border border-white/10 rounded-lg shadow-xl overflow-hidden">
                                            {suggestions.map((course) => (
                                                <button
                                                    key={course.code}
                                                    type="button"
                                                    onClick={() => {
                                                        setCourseQuery(course.code);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                                                >
                                                    <span className="font-bold text-blue-400">{course.code}</span> - {course.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Connect To Dropdown */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-400 ml-1">Connects to (Prerequisite)</label>
                                    <select
                                        value={parentId}
                                        onChange={(e) => setParentId(e.target.value)}
                                        className="input-primary appearance-none"
                                    >
                                        <option value="">-- No Connection (Root) --</option>
                                        {existingNodes.map((node) => (
                                            <option key={node.id} value={node.id}>
                                                {node.data.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status Dropdown */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-400 ml-1">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="input-primary appearance-none"
                                    >
                                        <option value="planned">Planned</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary w-full mt-4 justify-center"
                                >
                                    {loading ? 'Adding...' : (
                                        <span className="flex items-center gap-2">
                                            <Plus className="w-4 h-4" />
                                            Add Node
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
