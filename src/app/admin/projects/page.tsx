'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProjects(data as Project[]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setLoading(true);
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        setError(error.message);
      } else {
        fetchProjects(); // Refresh the list
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-700">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Manage Projects</h1>
      <Link href="/admin/projects/add" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mb-6 inline-block transition-colors">
        Add New Project
      </Link>

      {projects.length === 0 ? (
        <p className="text-gray-600 text-lg mt-8">No projects found. Add your first project!</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        width={80}
                        height={80}
                        className="rounded-md object-cover" // objectFit="cover" dipindahkan ke className
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md text-gray-500 text-xs">No Image</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.title}</div>
                    <div className="text-sm text-gray-500">{project.project_link}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">{project.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/admin/projects/edit/${project.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}