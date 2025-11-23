'use client';

import { motion } from 'framer-motion';
import { Trophy, Briefcase, TrendingUp } from 'lucide-react';

interface OutcomePanelProps {
    activeNode: any; // In a real app, define a proper type
    unlockedSkills: string[];
    careerImpact: number; // 0-100
}

export function OutcomePanel({ activeNode, unlockedSkills, careerImpact }: OutcomePanelProps) {
    if (!activeNode) {
        return (
            <div className="glass-panel p-6 rounded-xl border border-white/10 h-full flex items-center justify-center text-center">
                <div>
                    <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-gray-400 font-medium">Select a course to see its impact</h3>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={activeNode.id}
            className="glass-panel p-6 rounded-xl border border-white/10 h-full sticky top-24"
        >
            <div className="mb-6">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Projected Outcome</span>
                <h2 className="text-2xl font-bold text-white mt-2 mb-1">{activeNode.data.label}</h2>
                <p className="text-sm text-gray-400">{activeNode.data.code}</p>
            </div>

            <div className="space-y-8">
                {/* Skills Unlocked */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <h3 className="text-sm font-semibold text-white">Skills Unlocked</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {unlockedSkills.length > 0 ? (
                            unlockedSkills.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20"
                                >
                                    {skill}
                                </motion.span>
                            ))
                        ) : (
                            <span className="text-sm text-gray-500 italic">No specific skills data available</span>
                        )}
                    </div>
                </div>

                {/* Career Impact */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="w-4 h-4 text-purple-500" />
                        <h3 className="text-sm font-semibold text-white">Career Relevance</h3>
                    </div>

                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block text-purple-300">
                                    Software Engineer Alignment
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-white">
                                    {careerImpact}%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-800">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${careerImpact}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-600"
                            ></motion.div>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            This course provides foundational knowledge critical for technical interviews and system design roles.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
