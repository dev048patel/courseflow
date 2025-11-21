import { Briefcase, MapPin, Building2, Clock } from 'lucide-react';

export default function JobsPage() {
    const jobs = [
        { id: 1, title: 'Software Engineering Intern', company: 'TechCorp', location: 'San Francisco, CA', type: 'Internship', posted: '2d ago' },
        { id: 2, title: 'Data Science Research Assistant', company: 'University Lab', location: 'On Campus', type: 'Part-time', posted: '4h ago' },
        { id: 3, title: 'Product Management Intern', company: 'StartUp Inc', location: 'Remote', type: 'Internship', posted: '1w ago' },
        { id: 4, title: 'Teaching Assistant - CS101', company: 'Computer Science Dept', location: 'On Campus', type: 'Part-time', posted: '3d ago' },
        { id: 5, title: 'Frontend Developer Junior', company: 'WebSolutions', location: 'New York, NY', type: 'Full-time', posted: '5d ago' },
    ];

    return (
        <main className="min-h-screen bg-[#F3F2EF] py-6">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Sidebar - Job Filters */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 sticky top-20">
                        <div className="flex items-center gap-2 mb-4 text-slate-800">
                            <Briefcase className="w-5 h-5" />
                            <h3 className="font-semibold">Job Preferences</h3>
                        </div>
                        <div className="space-y-1">
                            <button className="w-full text-left px-2 py-1.5 text-sm font-semibold text-slate-800 bg-gray-100 rounded">
                                My Jobs
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm text-slate-600 hover:bg-gray-50 rounded">
                                Job Alerts
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm text-slate-600 hover:bg-gray-50 rounded">
                                Skill Assessments
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-sm text-slate-600 hover:bg-gray-50 rounded">
                                Interview Prep
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content - Job Feed */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Header */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
                        <h1 className="text-xl font-bold text-slate-800 mb-2">Recommended for you</h1>
                        <p className="text-sm text-slate-600">Based on your profile and search history</p>
                    </div>

                    {/* Job List */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {jobs.map((job) => (
                                <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                            <Building2 className="w-6 h-6 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-semibold text-[#0a66c2] group-hover:underline mb-0.5">
                                                {job.title}
                                            </h3>
                                            <p className="text-sm text-slate-800 mb-1">{job.company}</p>
                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {job.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Briefcase className="w-3 h-3" /> {job.type}
                                                </span>
                                                <span className="flex items-center gap-1 text-green-700 font-medium">
                                                    <Clock className="w-3 h-3" /> {job.posted}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="hidden sm:block px-4 py-1.5 rounded-full border border-[#0a66c2] text-[#0a66c2] font-semibold text-sm hover:bg-blue-50 transition-colors">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-t border-gray-200 text-center">
                            <button className="text-sm font-semibold text-slate-600 hover:bg-gray-100 px-4 py-2 rounded transition-colors">
                                Show more results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
