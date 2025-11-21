import { Users, UserPlus, Briefcase } from 'lucide-react';

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
        <main className="min-h-screen bg-[#F3F2EF] py-6">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Sidebar - Stats */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden sticky top-20">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-slate-800">Manage my network</h3>
                        </div>
                        <div className="py-2">
                            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-slate-600 hover:text-slate-800">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5" />
                                    <span className="text-sm font-medium">Connections</span>
                                </div>
                                <span className="text-sm font-semibold">428</span>
                            </button>
                            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-slate-600 hover:text-slate-800">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5" />
                                    <span className="text-sm font-medium">Following & Followers</span>
                                </div>
                            </button>
                            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-slate-600 hover:text-slate-800">
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-5 h-5" />
                                    <span className="text-sm font-medium">Mentors</span>
                                </div>
                                <span className="text-sm font-semibold">3</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Invitations Card */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex justify-between items-center">
                        <h2 className="text-base font-semibold text-slate-800">No pending invitations</h2>
                        <button className="text-sm font-semibold text-slate-600 hover:bg-gray-100 px-3 py-1 rounded transition-colors">
                            Manage
                        </button>
                    </div>

                    {/* Suggestions Grid */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-base font-semibold text-slate-800">People you may know</h2>
                            <button className="text-sm font-semibold text-slate-600 hover:bg-gray-100 px-3 py-1 rounded transition-colors">
                                See all
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {suggestions.map((person) => (
                                <div key={person.id} className="border border-gray-200 rounded-lg p-0 overflow-hidden flex flex-col items-center text-center relative">
                                    {/* Banner Background */}
                                    <div className="h-14 w-full bg-gradient-to-r from-blue-100 to-blue-50 absolute top-0 left-0 z-0"></div>

                                    {/* Avatar */}
                                    <div className="w-20 h-20 bg-white rounded-full p-1 relative z-10 mt-6">
                                        <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                                            <Users className="w-10 h-10" />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 pt-2 flex-1 flex flex-col items-center w-full">
                                        <h3 className="font-semibold text-slate-800 text-base truncate w-full">{person.name}</h3>
                                        <p className="text-xs text-slate-600 mt-1">{person.major} • {person.year}</p>
                                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                            <Users className="w-3 h-3" /> {person.mutual} mutual connections
                                        </p>

                                        <button className="mt-4 w-full py-1.5 rounded-full border border-[#0a66c2] text-[#0a66c2] font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
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
