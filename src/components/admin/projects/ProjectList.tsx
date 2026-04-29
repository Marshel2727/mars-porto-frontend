"use client";

import { Project } from "@/types";
import { deleteProject } from "@/services/project";

interface projecListProps {
  projects: Project[];
  isLoading: boolean;
  onRefresh: () => void;
  onEdit: (project: Project) => void;
}

export default function projectList({ projects, isLoading, onRefresh, onEdit }: projecListProps) {
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin hapus project ini?")) return;
    try {
      await deleteProject(id);
      onRefresh();
    } catch (error) {
      console.error("Gagal Hapus", error);
      alert("Gagal Menghapus Project.")
    }
  };

  return (
    <div className="rounded-lg bg-gray-800 p-6 shadow-md border border-gray-700">
      <h2 className="mb-4 text-xl font-semibold text-white">DAFTAR PROJECT</h2>
      {isLoading ? (
        <p className="text-gray-400">Memuat data proyek...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400">Belum ada proyek yang ditambahkan.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-700 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-4 py-3">Gambar</th>
                <th className="px-4 py-3">Judul</th>
                <th className="px-4 py-3">Deskripsi</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-700">
                  <td className="px-4 py-3">
                    <img 
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${project.image_url}`} 
                      alt={project.title}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{project.title}</td>
                  <td className="px-4 py-3 font-medium text-white">{project.description}</td>
                  <td className="px-4 py-3 text-center space-x-4">
                    <button
                      onClick={() => onEdit(project)}
                      className="text-blue-400 hover:text-blue-300 transition font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-500 hover:text-red-400 transition font-medium"
                    >
                      Hapus
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