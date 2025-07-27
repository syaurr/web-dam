'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AddProjectPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [projectLink, setProjectLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    let image_url = null;
    if (imageFile) {
      const { data, error: uploadError } = await supabase.storage
        .from('project-images') // Pastikan bucket ini ada di Supabase
        .upload(`public/${imageFile.name}_${Date.now()}`, imageFile);

      if (uploadError) {
        setMessage(`Error uploading image: ${uploadError.message}`);
        setLoading(false);
        return;
      }
      image_url = supabase.storage.from('project-images').getPublicUrl(data.path).data.publicUrl;
    }

    const { error } = await supabase.from('projects').insert({
      title,
      description,
      image_url,
      project_link: projectLink,
      github_link: githubLink,
    });

    if (error) {
      setMessage(`Error adding project: ${error.message}`);
    } else {
      setMessage('Project added successfully!');
      router.push('/admin/projects');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Add New Project</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Project Title:
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            rows={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Project Image:
          </label>
            <input
              type="file"
              id="image"
              accept="image/*,application/pdf,.doc,.docx"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFileChange}
            />
          {imageFile && <p className="text-sm text-gray-500 mt-2">Selected: {imageFile.name}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="projectLink" className="block text-gray-700 text-sm font-bold mb-2">
            Project Live Link (Optional):
          </label>
          <input
            type="url"
            id="projectLink"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="githubLink" className="block text-gray-700 text-sm font-bold mb-2">
            GitHub Link (Optional):
          </label>
          <input
            type="url"
            id="githubLink"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Project'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
        {message && (
          <p className={`mt-4 text-center ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}