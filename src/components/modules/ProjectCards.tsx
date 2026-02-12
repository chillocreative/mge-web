"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  featured_image: string | null;
}

export default function ProjectCards({ projects }: { projects: ProjectItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const imagesWithIndex = projects
    .map((p, i) => ({ ...p, originalIndex: i }))
    .filter((p) => p.featured_image);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex(activeIndex === 0 ? imagesWithIndex.length - 1 : activeIndex - 1);
  }, [activeIndex, imagesWithIndex.length]);
  const next = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex(activeIndex === imagesWithIndex.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, imagesWithIndex.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, close, prev, next]);

  const openLightbox = (projectIndex: number) => {
    const lightboxIndex = imagesWithIndex.findIndex((p) => p.originalIndex === projectIndex);
    if (lightboxIndex !== -1) setActiveIndex(lightboxIndex);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="group cursor-pointer"
            onClick={() => project.featured_image && openLightbox(i)}
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
                <Expand className="text-white w-6 h-6" />
              </div>
            </div>
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
              <h3 className="text-2xl font-bold font-heading text-primary group-hover:text-accent transition-colors">{project.title}</h3>
              <p className="text-neutral-500 text-xs mt-2 font-bold uppercase tracking-widest">{project.location} {project.year && `\u2022 ${project.year}`}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={close}>
          <button onClick={close} className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>

          {imagesWithIndex.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 z-10 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-accent text-white transition-all">
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          <div className="max-w-5xl max-h-[85vh] mx-16 md:mx-24 relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={imagesWithIndex[activeIndex].featured_image!}
              alt={imagesWithIndex[activeIndex].title}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <p className="text-white text-center text-lg mt-4 font-bold font-heading">
              {imagesWithIndex[activeIndex].title}
            </p>
            <p className="text-white/50 text-center text-xs mt-1">
              {imagesWithIndex[activeIndex].location} {imagesWithIndex[activeIndex].year && `\u2022 ${imagesWithIndex[activeIndex].year}`}
              {imagesWithIndex.length > 1 && ` \u2014 ${activeIndex + 1} / ${imagesWithIndex.length}`}
            </p>
          </div>

          {imagesWithIndex.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 z-10 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-accent text-white transition-all">
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
