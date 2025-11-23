'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Node,
    Edge,
    Connection,
    Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { calculateProjectedOutcome, getMockCareerGraph, CareerNode } from '@/lib/simulation-utils';
import { Trophy, Briefcase, Zap } from 'lucide-react';

interface CareerRoadmapProps {
    courseId: string;
}

export function CareerRoadmap({ courseId }: CareerRoadmapProps) {
    const { nodes: initialNodes, edges: initialEdges } = getMockCareerGraph(courseId);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedPath, setSelectedPath] = useState<CareerNode[]>([]);
    const [outcome, setOutcome] = useState<{ unlockedSkills: string[], optimizedRoles: string[] }>({
        unlockedSkills: [],
        optimizedRoles: []
    });

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        // Simple logic: Select node and all its ancestors (mock logic for now)
        // In a real app, we'd traverse the graph.
        // For this demo, we just toggle selection of the clicked node

        const careerNode = node as CareerNode;

        setSelectedPath((prev) => {
            const isSelected = prev.find(n => n.id === node.id);
            let newPath;
            if (isSelected) {
                newPath = prev.filter(n => n.id !== node.id);
            } else {
                newPath = [...prev, careerNode];
            }
            return newPath;
        });
    }, []);

    useEffect(() => {
        const result = calculateProjectedOutcome(selectedPath);
        setOutcome(result);

        // Highlight selected nodes
        setNodes((nds) =>
            nds.map((n) => ({
                ...n,
                style: {
                    ...n.style,
                    background: selectedPath.find(sn => sn.id === n.id) ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: selectedPath.find(sn => sn.id === n.id) ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    backdropFilter: 'blur(10px)',
                },
            }))
        );
    }, [selectedPath, setNodes]);

    return (
        <div className="h-[500px] w-full border border-white/10 rounded-lg bg-[#0a0a0a] flex flex-col lg:flex-row overflow-hidden relative">
            {/* Scrollytelling Animation Overlay (Conceptual) */}
            <motion.div
                className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 z-10"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Graph Area */}
            <div className="flex-grow h-[300px] lg:h-full relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={onNodeClick}
                    fitView
                    className="bg-[#0a0a0a]"
                >
                    <Controls className="bg-white/10 border-white/10 fill-white" />
                    <Background color="#333" gap={16} />
                    <Panel position="top-left" className="glass-panel p-2 rounded text-xs text-gray-400">
                        Click nodes to simulate your path
                    </Panel>
                </ReactFlow>
            </div>

            {/* Outcome Panel */}
            <div className="w-full lg:w-80 bg-[#111] border-t lg:border-t-0 lg:border-l border-white/10 p-6 overflow-y-auto">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    Projected Outcome
                </h3>

                {selectedPath.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                        Select courses on the map to see what skills and roles you unlock.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {/* Skills */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-blue-400" />
                                Unlocked Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {outcome.unlockedSkills.map(skill => (
                                    <motion.span
                                        key={skill}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium border border-blue-500/30"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Roles */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-green-400" />
                                Optimized For
                            </h4>
                            <ul className="space-y-2">
                                {outcome.optimizedRoles.map(role => (
                                    <motion.li
                                        key={role}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className="text-sm text-gray-400 flex items-start gap-2"
                                    >
                                        <span className="mt-1 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                                        {role}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <p className="text-xs text-gray-600">
                                Based on {selectedPath.length} selected course{selectedPath.length !== 1 ? 's' : ''}.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
