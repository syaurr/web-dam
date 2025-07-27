// src/app/admin/layout.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link'; // Import Link
import { AuthError } from '@supabase/supabase-js'; // Import AuthError for error handling

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null); // State untuk menyimpan user

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        router.push('/admin/login');
      } else {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError || profileData?.role !== 'admin') {
          console.error("User is not an admin or profile not found:", profileError);
          await supabase.auth.signOut();
          router.push('/admin/login');
        } else {
          setUser(session.user); // Set user jika admin
        }
      }
      setLoading(false);
    };

    checkUserAndRedirect();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/admin/login');
      } else {
        supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profileData, error: profileError }) => {
            if (profileError || profileData?.role !== 'admin') {
              console.error("User role check failed on state change:", profileError);
              supabase.auth.signOut();
              router.push('/admin/login');
            } else {
              setUser(session.user);
            }
          });
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [router]);

  // Ini penting! Kalau loading true, tampilkan loading.
  // Kalau loading false DAN user tidak ada (misal redirecting), jangan tampilkan apa-apa sementara.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  // Ini juga penting! Jika user belum terautentikasi atau bukan admin
  // dan redirecting, kita tidak perlu me-render konten kosong.
  // Layout akan menunggu sampai user valid atau redirect selesai.
  if (!user && pathname !== '/admin/login') { // Tambahkan kondisi agar form login tetap terlihat
    return null;
  }

  // Render login form jika di halaman login, tanpa sidebar
  if (pathname === '/admin/login') {
    return children; // Hanya render children (login page)
  }

  const handleLogout = async () => {
    try {
      const { error }: { error: AuthError | null } = await supabase.auth.signOut();
      if (error) {
        console.error('Error during logout:', error.message);
      } else {
        router.push('/admin/login');
      }
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    }
  };

  // Render dashboard dengan sidebar jika sudah login sebagai admin
  // Render dashboard dengan sidebar jika sudah login sebagai admin
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
          {user && <p className="text-sm text-gray-400 mb-4">Logged in as: {user.email}</p>}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}