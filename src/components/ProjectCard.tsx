// src/components/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      {project.image_url && (
        <div className="relative w-full h-48">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-3">
          {project.project_link && (
            <Link href={project.project_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              View Project
            </Link>
          )}
          {project.github_link && (
            <Link href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline text-sm">
              GitHub Repo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}