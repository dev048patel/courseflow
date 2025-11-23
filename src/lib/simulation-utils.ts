import { Edge, Node } from 'reactflow';

export interface CareerNode extends Node {
    data: {
        label: string;
        skills: string[];
        jobRoles: string[];
        description?: string;
    };
}

export const calculateProjectedOutcome = (selectedNodes: CareerNode[]) => {
    const skills = new Set<string>();
    const roles = new Set<string>();

    selectedNodes.forEach(node => {
        if (node.data.skills) {
            node.data.skills.forEach(skill => skills.add(skill));
        }
        if (node.data.jobRoles) {
            node.data.jobRoles.forEach(role => roles.add(role));
        }
    });

    return {
        unlockedSkills: Array.from(skills),
        optimizedRoles: Array.from(roles)
    };
};

export const getMockCareerGraph = (courseId: string) => {
    // This would eventually be fetched from the DB
    const nodes: CareerNode[] = [
        {
            id: '1',
            type: 'input',
            data: {
                label: 'CS 101: Intro to CS',
                skills: ['Python', 'Algorithmic Thinking'],
                jobRoles: ['Junior Developer']
            },
            position: { x: 250, y: 0 },
        },
        {
            id: '2',
            data: {
                label: 'CS 102: Data Structures',
                skills: ['Java', 'Data Structures', 'Complexity Analysis'],
                jobRoles: ['Backend Intern']
            },
            position: { x: 250, y: 100 },
        },
        {
            id: '3',
            data: {
                label: 'CS 201: Algorithms',
                skills: ['Dynamic Programming', 'Graph Theory'],
                jobRoles: ['Software Engineer']
            },
            position: { x: 100, y: 200 },
        },
        {
            id: '4',
            data: {
                label: 'CS 202: Systems',
                skills: ['C', 'Memory Management', 'Concurrency'],
                jobRoles: ['Systems Engineer', 'Embedded Dev']
            },
            position: { x: 400, y: 200 },
        },
        {
            id: '5',
            data: {
                label: 'Internship: Tech Corp',
                skills: ['Professionalism', 'Teamwork', 'Git'],
                jobRoles: ['Full Stack Developer']
            },
            position: { x: 250, y: 300 },
        },
    ];

    const edges: Edge[] = [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-5', source: '3', target: '5' },
        { id: 'e4-5', source: '4', target: '5' },
    ];

    return { nodes, edges };
};
