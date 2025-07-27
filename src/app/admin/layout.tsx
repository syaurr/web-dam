'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

type AdminProfile = {
  role: string;
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { session: sess }, error } = await supabase.auth.getSession();
      if (error || !sess) return router.push('/admin/login');

      setSession(sess);

      const { data: prof, error: profError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', sess.user.id)
        .single();

      if (profError || prof?.role !== 'admin') {
        console.error('Profile not found or not admin', profError);
        await supabase.auth.signOut();
        return router.push('/admin/login');
      }

      setProfile(prof);
      setLoading(false);
    };

    init();

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
      // lakukan pengecekan role pada session baru
      if (newSession?.user) {
        supabase
          .from('profiles')
          .select('role')
          .eq('id', newSession.user.id)
          .single()
          .then(({ data: prof2, error: profError2 }) => {
            if (profError2 || prof2?.role !== 'admin') {
              supabase.auth.signOut();
              router.push('/admin/login');
            } else {
              setProfile(prof2);
            }
          });
      } else {
        setProfile(null);
        router.push('/admin/login');
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  if (!session || !profile) {
    return null;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error.message);
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <Link href="/admin" className={`block py-2 px-4 rounded ${pathname === '/admin' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                Dashboard Overview
              </Link>
            </li>
            <li>
              <Link href="/admin/projects" className={`block py-2 px-4 rounded ${pathname.startsWith('/admin/projects') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                Manage Projects
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <p className="text-sm text-gray-400 mb-4">Logged in as: {session.user.email}</p>
          <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
