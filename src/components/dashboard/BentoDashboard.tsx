'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { User, GraduationCap, BookOpen, TrendingUp, Zap } from 'lucide-react';
import { CareerRoadmap } from '@/components/career/CareerRoadmap';

export function BentoDashboard() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Academic Command Center
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">

                {/* Tile 1: Profile */}
                <GlassCard className="col-span-1 row-span-1 flex flex-col items-center justify-center text-center" hoverEffect>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] mb-4">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                            <User className="w-10 h-10 text-gray-300" />
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-white">Alex Student</h2>
                    <p className="text-sm text-gray-400">Computer Science • Junior</p>
                </GlassCard>

                {/* Tile 2: Stat Tracker */}
                <GlassCard className="col-span-1 md:col-span-2 row-span-1 flex items-center justify-around" hoverEffect>
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
                                <circle cx="48" cy="48" r="40" stroke="#3b82f6" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="50" strokeLinecap="round" />
                            </svg>
                            <span className="absolute text-2xl font-bold text-white">3.8</span>
                        </div>
                        <span className="mt-2 text-sm text-gray-400 uppercase tracking-wider">GPA</span>
                    </div>

                    <div className="h-16 w-[1px] bg-white/10"></div>

                    <div className="flex flex-col items-center gap-2">
                        <GraduationCap className="w-8 h-8 text-purple-400" />
                        <span className="text-2xl font-bold text-white">86</span>
                        <span className="text-sm text-gray-400 uppercase tracking-wider">Credits</span>
                    </div>

                    <div className="h-16 w-[1px] bg-white/10"></div>

                    <div className="flex flex-col items-center gap-2">
                        <BookOpen className="w-8 h-8 text-emerald-400" />
                        <span className="text-2xl font-bold text-white">12</span>
                        <span className="text-sm text-gray-400 uppercase tracking-wider">Courses</span>
                    </div>
                </GlassCard>

                {/* Tile 3: Visual Roadmap Focus */}
                <GlassCard className="col-span-1 md:col-span-3 row-span-2 relative overflow-hidden group" hoverEffect>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-400" />
                            Career Trajectory
                        </h3>
                        <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View Full Map →</button>
                    </div>

                    {/* Embed Roadmap (Simplified view or full component) */}
                    <div className="h-[400px] w-full bg-black/20 rounded-xl border border-white/5 overflow-hidden relative">
                        {/* We can reuse the CareerRoadmap here, but maybe pass a prop to make it 'dashboard mode' if needed */}
                        {/* For now, just rendering it directly. Note: CareerRoadmap needs to be updated to look good in dark mode */}
                        <CareerRoadmap courseId="demo-dashboard" />

                        {/* Overlay gradient for depth */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
                    </div>
                </GlassCard>

                {/* Tile 4: Recent Activity / Quick Actions */}
                <GlassCard className="col-span-1 md:col-span-3 flex justify-between items-center py-4" hoverEffect>
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-white font-medium">New Review Available</p>
                            <p className="text-xs text-gray-500">CS 202 • Systems Programming</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm text-white transition-colors">
                        Write Review
                    </button>
                </GlassCard>

            </div>
        </div>
    );
}
