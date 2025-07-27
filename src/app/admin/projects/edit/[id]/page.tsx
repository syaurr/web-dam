'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';
import Image from 'next/image';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id; // params langsung sebagai objek

  const [project, setProject] = useState<Project | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [projectLink, setProjectLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setMessage(`Error fetching project: ${error.message}`);
        setLoading(false);
        return;
      }

      setProject(data as Project);
      setTitle(data.title || '');
      setDescription(data.description || '');
      setProjectLink(data.project_link || '');
      setGithubLink(data.github_link || '');
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    setMessage('');

    let image_url = project?.image_url;
    if (imageFile) {
      const fileName = `public/${imageFile.name}_${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project_images')
        .upload(fileName, imageFile, { upsert: true });

      if (uploadError) {
        setMessage(`Error uploading new image: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      image_url = supabase.storage
        .from('project_images')
        .getPublicUrl(uploadData.path)
        .data.publicUrl;
    }

    const { error } = await supabase.from('projects').update({
      title,
      description,
      image_url,
      project_link: projectLink,
      github_link: githubLink,
    }).eq('id', id);

    if (error) {
      setMessage(`Error updating project: ${error.message}`);
    } else {
      setMessage('Project updated successfully!');
      router.push('/admin/projects');
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-700">Loading project data...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-500">
          Project not found or an error occurred.
        </p>
        <button
          onClick={() => router.push('/admin/projects')}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Edit Project</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto"
      >
        {/* Form input fields */}
        {/* Omitted here for brevity; remains same structure as original */}
      </form>
    </div>
  );
}
