'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { CareerRoadmap } from '@/components/roadmap/CareerRoadmap';
import { OutcomePanel } from '@/components/roadmap/OutcomePanel';
import { Star, Clock, BookOpen, Users } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function CoursePage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const [course, setCourse] = useState<any>(null);
    const [activeNode, setActiveNode] = useState<any>(null);
    const [unlockedSkills, setUnlockedSkills] = useState<string[]>([]);
    const [careerImpact, setCareerImpact] = useState(0);
    const supabase = createClient();

    useEffect(() => {
        const fetchCourse = async () => {
            const { data } = await supabase
                .from('courses')
                .select('*')
                .eq('id', courseId)
                .single();

            if (data) setCourse(data);
        };
        fetchCourse();
    }, [courseId]);

    const handleNodeClick = (node: any, skills: string[]) => {
        setActiveNode(node);
        setUnlockedSkills(skills);
        // Simulate career impact calculation based on node depth or data
        setCareerImpact(Math.floor(Math.random() * 30) + 60); // Random 60-90%
    };

    if (!course) return <div className="min-h-screen bg-[#0B0C0E] flex items-center justify-center text-white">Loading...</div>;

    return (
        <main className="min-h-screen bg-[#0B0C0E] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT COLUMN: Course Info (3 cols) */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="glass-panel p-6 rounded-xl border border-white/10">
                        <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4 text-blue-400 font-bold">
                            {course.code.split(' ')[0]}
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">{course.code}</h1>
                        <h2 className="text-lg text-gray-300 mb-4">{course.name}</h2>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>4.8/5.0 Rating</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span>3 Credit Hours</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Users className="w-4 h-4 text-purple-400" />
                                <span>250+ Students Enrolled</span>
                            </div>
                        </div>

                        <p className="mt-6 text-sm text-gray-400 leading-relaxed">
                            {course.description || "An intensive exploration of fundamental concepts, designed to prepare students for advanced topics in the field."}
                        </p>

                        <button className="btn-primary w-full mt-6">
                            Write a Review
                        </button>
                    </div>
                </div>

                {/* CENTER COLUMN: Career Roadmap (6 cols) */}
                <div className="lg:col-span-6">
                    <div className="glass-panel p-1 rounded-xl border border-white/10 h-full min-h-[600px]">
                        <CareerRoadmap
                            courseId={courseId}
                            onNodeClick={handleNodeClick}
                        />
                    </div>
                </div>

                {/* RIGHT COLUMN: Outcome Panel (3 cols) */}
                <div className="lg:col-span-3">
                    <OutcomePanel
                        activeNode={activeNode}
                        unlockedSkills={unlockedSkills}
                        careerImpact={careerImpact}
                    />
                </div>

            </div>
        </main>
    );
}
