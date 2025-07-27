// src/types/index.ts

export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  project_link: string | null;
  github_link: string | null;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  // Add any other user-related fields if needed
}