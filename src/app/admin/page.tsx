'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const { count, error } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      if (error) {
        setError(error.message);
      } else {
        setProjectCount(count);
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>
      <p className="text-xl text-gray-700 mb-6">Welcome to your personal portfolio administration panel.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Total Projects</h2>
          {loading ? (
            <p className="text-lg text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-lg text-red-500">Error: {error}</p>
          ) : (
            <p className="text-5xl font-bold text-blue-600">{projectCount}</p>
          )}
        </div>
        {/* Tambah kartu statistik lain di sini jika diperlukan */}
      </div>

      <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/projects/add" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg font-medium transition-colors">
            Add New Project
          </Link>
          <Link href="/admin/projects" className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg text-lg font-medium transition-colors">
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}