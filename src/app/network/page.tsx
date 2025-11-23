import { Users, UserPlus, Briefcase, ChevronRight } from 'lucide-react';

export default function NetworkPage() {
    // Mock data for "People you may know"
    const suggestions = [
        { id: 1, name: 'Sarah Chen', major: 'Computer Science', year: 'Senior', mutual: 12 },
        { id: 2, name: 'Michael Ross', major: 'Business Admin', year: 'Junior', mutual: 5 },
        { id: 3, name: 'David Kim', major: 'Biology', year: 'Sophomore', mutual: 8 },
        { id: 4, name: 'Emily Watson', major: 'Psychology', year: 'Senior', mutual: 15 },
        { id: 5, name: 'James Wilson', major: 'Engineering', year: 'Freshman', mutual: 2 },
        { id: 6, name: 'Anita Patel', major: 'Data Science', year: 'Junior', mutual: 24 },
    ];

    return (
        <main className="min-h-screen bg-[#0B0C0E] py-6 pt-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Sidebar - Stats */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="glass-panel rounded-xl overflow-hidden sticky top-24 border border-white/10">
                        <div className="p-4 border-b border-white/10 bg-white/5">
                            <h3 className="font-bold text-white">Manage my network</h3>
                        </div>
                        <div className="py-2">
                            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors text-gray-400 hover:text-white group">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-blue-400" />
                                    <span className="text-sm font-medium">Connections</span>
                                </div>
                                <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">428</span>
                            </button>
                            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors text-gray-400 hover:text-white group">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-purple-400" />
                                    <span className="text-sm font-medium">Following & Followers</span>
                                </div>
                            </button>
                            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors text-gray-400 hover:text-white group">
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-green-400" />
                                    <span className="text-sm font-medium">Mentors</span>
                                </div>
                                <span className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">3</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Invitations Card */}
                    <div className="glass-panel rounded-xl p-6 border border-white/10 flex justify-between items-center">
                        <h2 className="text-base font-semibold text-gray-300">No pending invitations</h2>
                        <button className="text-sm font-bold text-white hover:text-blue-400 px-3 py-1 rounded transition-colors">
                            Manage
                        </button>
                    </div>

                    {/* Suggestions Grid */}
                    <div className="glass-panel rounded-xl p-6 border border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-white">People you may know</h2>
                            <button className="text-sm font-bold text-gray-400 hover:text-white px-3 py-1 rounded transition-colors flex items-center gap-1">
                                See all <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {suggestions.map((person) => (
                                <div key={person.id} className="bg-[#1A1C23] border border-white/5 rounded-xl overflow-hidden flex flex-col items-center text-center relative group hover:border-blue-500/30 transition-all hover:-translate-y-1">
                                    {/* Banner Background */}
                                    <div className="h-20 w-full bg-gradient-to-r from-blue-900/50 to-purple-900/50 absolute top-0 left-0 z-0"></div>

                                    {/* Close Button (Mock) */}
                                    <button className="absolute top-2 right-2 z-20 text-white/50 hover:text-white bg-black/20 rounded-full p-1 backdrop-blur-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>

                                    {/* Avatar */}
                                    <div className="w-24 h-24 bg-[#1A1C23] rounded-full p-1.5 relative z-10 mt-8">
                                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-gray-400 border-2 border-[#1A1C23]">
                                            <Users className="w-10 h-10" />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 pt-2 flex-1 flex flex-col items-center w-full">
                                        <h3 className="font-bold text-white text-base truncate w-full group-hover:text-blue-400 transition-colors">{person.name}</h3>
                                        <p className="text-xs text-gray-400 mt-1">{person.major} • {person.year}</p>
                                        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full">
                                            <Users className="w-3 h-3" /> {person.mutual} mutual connections
                                        </p>

                                        <button className="mt-5 w-full py-2 rounded-full border border-blue-500 text-blue-400 font-bold text-sm hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                            <UserPlus className="w-4 h-4" /> Connect
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
