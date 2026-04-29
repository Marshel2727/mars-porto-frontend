"use client";

import { useState, useEffect } from "react";
import { getAllProjects } from "@/services/project";
import { Project } from "@/types";
import ProjectForm from "@/components/admin/projects/ProjectForm";
import ProjectList from "@/components/admin/projects/ProjectList";

export default function ProjectAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error("Gagal memuat project", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const hadleSuccessForm = () => {
    setProjectToEdit(null);
    loadProjects();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white text-center">Kelola Project</h1>

      <ProjectForm
        projectToEdit={projectToEdit}
        onSuccess={hadleSuccessForm}
        onCancel={() => setProjectToEdit(null)}
      />

      <ProjectList
        projects={projects}
        isLoading={isLoading}
        onRefresh={loadProjects}
        onEdit={(project) => setProjectToEdit(project)}
      />
    </div>
  );
}