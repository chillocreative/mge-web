"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  featured_image: string | null;
}

export default function ProjectCards({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.slug}`}
          className="group cursor-pointer block"
        >
          <div className="aspect-video bg-primary mb-6 overflow-hidden relative">
            {project.featured_image && (
              <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                style={{ backgroundImage: `url('${project.featured_image}')` }}
              />
            )}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-6 right-6 w-12 h-12 bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <ArrowUpRight className="text-white w-6 h-6" />
            </div>
          </div>
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
            <h3 className="text-2xl font-bold font-heading text-primary group-hover:text-accent transition-colors">{project.title}</h3>
            <p className="text-neutral-500 text-xs mt-2 font-bold uppercase tracking-widest">{project.location} {project.year && `\u2022 ${project.year}`}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
