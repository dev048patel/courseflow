'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { LogOut, User as UserIcon, Search } from 'lucide-react';

export function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-8">
                        <Link href="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">CF</span>
                            </div>
                            CourseFlow
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/courses" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                Explore
                            </Link>
                            <Link href="/network" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                Network
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search courses, professors..."
                                className="input-primary pl-10 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-white/10">
                                        <UserIcon className="w-4 h-4 text-white" />
                                    </div>
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="btn-primary text-xs py-2 px-4 !rounded-full flex items-center gap-2"
                                >
                                    <LogOut className="w-3 h-3" />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="btn-primary text-sm py-2 px-6 !rounded-full"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
