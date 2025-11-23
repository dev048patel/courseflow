'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, Edit2, Save } from 'lucide-react';
import { AddNodeModal } from './AddNodeModal';

// Custom Node Component
const CustomNode = ({ data, selected }: any) => {
    return (
        <div
            className={`
        px-4 py-3 rounded-lg shadow-lg min-w-[150px] text-center transition-all duration-300
        ${selected
                    ? 'bg-[#1A1C23] border-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                    : 'bg-[#1A1C23]/80 border border-white/10 hover:border-white/30 backdrop-blur-md'}
        ${data.isPersonal ? 'border-dashed border-purple-500/50' : ''}
      `}
        >
            <div className="text-xs text-gray-400 mb-1">{data.code}</div>
            <div className="text-sm font-bold text-white">{data.label}</div>
            {data.status && (
                <div className={`text-[10px] mt-1 uppercase tracking-wider font-bold
          ${data.status === 'completed' ? 'text-green-400' :
                        data.status === 'in-progress' ? 'text-yellow-400' : 'text-gray-500'}
        `}>
                    {data.status}
                </div>
            )}
        </div>
    );
};

const nodeTypes = {
    custom: CustomNode,
};

interface CareerRoadmapProps {
    courseId: string;
    onNodeClick: (node: Node, skills: string[]) => void;
}

// Mock Global Data (Base Layer)
const getInitialGraph = (currentCourseId: string) => {
    // ... (Keep existing mock data or fetch from DB if available)
    // For now, using the same mock data as base
    const nodes: Node[] = [
        { id: '1', type: 'custom', position: { x: 250, y: 0 }, data: { label: 'Intro to CS', code: 'CS 101', skills: ['Python', 'Logic'] } },
        { id: '2', type: 'custom', position: { x: 100, y: 100 }, data: { label: 'Data Structures', code: 'CS 201', skills: ['Algorithms', 'Java'] } },
        { id: '3', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Web Dev', code: 'CS 202', skills: ['React', 'CSS'] } },
        { id: '4', type: 'custom', position: { x: 250, y: 200 }, data: { label: 'Algorithms', code: 'CS 301', skills: ['Graph Theory'] } },
        { id: '5', type: 'custom', position: { x: 250, y: 300 }, data: { label: 'System Design', code: 'CS 401', skills: ['Scalability'] } },
    ];

    const edges: Edge[] = [
        { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6' } },
        { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#3b82f6' } },
        { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#3b82f6' } },
        { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#3b82f6' } },
        { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#3b82f6' } },
    ];

    return { nodes, edges };
};

export function CareerRoadmap({ courseId, onNodeClick }: CareerRoadmapProps) {
    const { nodes: initialNodes, edges: initialEdges } = getInitialGraph(courseId);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch Personal Pathways
    useEffect(() => {
        const fetchPathways = async () => {
            try {
                const res = await fetch('/api/roadmap/personal');
                if (!res.ok) return; // Maybe user not logged in
                const pathways = await res.json();

                // Merge Logic
                const newNodes: Node[] = [];
                const newEdges: Edge[] = [];

                pathways.forEach((p: any) => {
                    // Check if node already exists in global graph
                    const exists = initialNodes.find(n => n.data.code === p.course.code);
                    if (!exists) {
                        // Add new personal node
                        newNodes.push({
                            id: `p-${p.id}`,
                            type: 'custom',
                            position: { x: Math.random() * 400, y: Math.random() * 400 + 400 }, // Random pos for now
                            data: {
                                label: p.course.name,
                                code: p.course.code,
                                skills: [],
                                isPersonal: true,
                                status: p.status
                            }
                        });
                    }

                    // Add connection if parent exists
                    if (p.parent_course) {
                        // Find parent ID in either global or personal nodes
                        // This logic is tricky without unified IDs. 
                        // For MVP, we'll try to match by Code or ID if we had it.
                        // Here we assume user selected a node from the dropdown which returns the ReactFlow ID.
                        // But the DB stores course_ids. 
                        // Simplified: We won't render edges for DB-fetched personal items in this MVP step 
                        // unless we map everything perfectly. 
                        // Let's focus on the "Add Node" flow rendering immediately.
                    }
                });

                setNodes(prev => [...prev, ...newNodes]);
            } catch (e) {
                console.error(e);
            }
        };
        fetchPathways();
    }, []);

    const handleAddNode = (pathway: any) => {
        // Add the new node to the graph immediately
        const newNode: Node = {
            id: `p-${pathway.id}`,
            type: 'custom',
            position: { x: 250, y: 450 }, // Default placement
            data: {
                label: pathway.course.name,
                code: pathway.course.code,
                skills: [],
                isPersonal: true,
                status: pathway.status
            },
        };

        setNodes((nds) => nds.concat(newNode));

        if (pathway.parent_course_id) {
            // We need to find the ReactFlow ID of the parent. 
            // In our modal, we passed the ReactFlow ID as the value.
            // But the API returns the DB ID.
            // We need to persist the connection.
            // For this demo, we'll assume the parent_course_id matches a known node or we handle it.
            // Actually, let's just use the parent_course_id returned if we can match it, 
            // BUT the modal sent the ReactFlow ID as 'parent_course_id' to the API? 
            // No, the modal logic needs to be aligned.
            // For simplicity in this "Visual" step, we will create an edge to the node selected in the modal.
            // We'll rely on the onAdd callback to pass the *ReactFlow* parent ID if possible, or we infer it.

            // Let's assume the API stored it correctly.
            // We'll just add a visual edge if we can find the parent in current nodes.
            // This part is complex to sync perfectly without a unified ID system.
            // We will skip auto-edge creation on fetch for now and focus on the "Add" interaction.
        }
    };

    // When adding from Modal, we get the full pathway object.
    // We also need to know which ReactFlow Node ID was selected as parent.
    // We'll cheat slightly and ask the modal to pass the parent ReactFlow ID back if needed,
    // or we just look for a node that matches the parent_course code.

    const onNodeClickWrapped = useCallback((event: React.MouseEvent, node: Node) => {
        const skills = node.data.skills || [];
        onNodeClick(node, skills);
    }, [onNodeClick]);

    return (
        <div className="relative w-full h-[600px] bg-[#0B0C0E] rounded-xl border border-white/5 overflow-hidden group">

            {/* Edit Toggle */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`
            p-2 rounded-full transition-all duration-300 flex items-center gap-2 px-4
            ${isEditing ? 'bg-blue-600 text-white' : 'bg-[#1A1C23] text-gray-400 hover:text-white border border-white/10'}
          `}
                >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                    <span className="text-xs font-bold">{isEditing ? 'Done' : 'Edit Roadmap'}</span>
                </button>
            </div>

            {/* FAB for Adding Nodes */}
            <AnimatePresence>
                {isEditing && (
                    <motion.button
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -90 }}
                        onClick={() => setIsModalOpen(true)}
                        className="absolute bottom-6 right-6 z-10 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors"
                    >
                        <Plus className="w-6 h-6 text-white" />
                    </motion.button>
                )}
            </AnimatePresence>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClickWrapped}
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.5}
                maxZoom={1.5}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
                    style: { strokeWidth: 2 }
                }}
            >
                <Background color="#333" gap={20} size={1} />
                <Controls className="bg-[#1A1C23] border border-white/10 fill-white text-white" />
            </ReactFlow>

            <AddNodeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={(pathway) => {
                    // Optimistic UI update
                    const newNode: Node = {
                        id: `p-${pathway.id}`,
                        type: 'custom',
                        position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 300 },
                        data: {
                            label: pathway.course.name,
                            code: pathway.course.code,
                            skills: [],
                            isPersonal: true,
                            status: pathway.status
                        }
                    };
                    setNodes((nds) => nds.concat(newNode));

                    // Add Edge if parent selected
                    if (pathway.parent_course_id) {
                        // We need to find the ReactFlow ID that corresponds to this DB ID.
                        // Since we don't have that mapping easily here without full graph sync,
                        // We will try to find a node with the same Code, or just skip for this demo step.
                        // In a real app, we'd map DB IDs to Node IDs consistently.

                        // For the DEMO visual:
                        // We'll assume the user selected a node in the modal, and we want to link to it.
                        // The modal passed the DB ID.
                        // Let's just create a visual edge to the *first* node for effect if we can't match.
                        // Or better: The modal *could* pass the ReactFlow ID back if we changed the prop.
                        // Let's leave it as just adding the node for now to ensure stability.
                    }
                }}
                existingNodes={nodes}
            />
        </div>
    );
}
