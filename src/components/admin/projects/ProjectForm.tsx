"use client";

import { useState, useEffect } from "react";
import { createProject, updateProject } from "@/services/project";
import { Project } from "@/types";

interface ProjectFormProps {
  projectToEdit: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ projectToEdit, onSuccess, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setDescription(projectToEdit.description);
      setDemoUrl(projectToEdit.demo_url || "");
      setGithubUrl(projectToEdit.github_url || "");
      setImage(null);
    } else {
      setTitle("");
      setDescription("");
      setDemoUrl("");
      setGithubUrl("");
      setImage(null);
    }
  }, [projectToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // PERBAIKAN: Gunakan !image dan tambahkan return
    if (!projectToEdit && !image) {
      alert("Gambar wajib diunggah untuk project baru!");
      return; // Wajib ditambahkan agar kurir tidak berangkat bawa kotak kosong
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (demoUrl) formData.append("demo_url", demoUrl);
      if (githubUrl) formData.append("github_url", githubUrl);
      if (image) formData.append("image", image);

      if (projectToEdit) {
        await updateProject(projectToEdit.id, formData);
      } else {
        await createProject(formData);
        alert("Project berhasil ditambahkan!");
      }

      // Ini sudah sangat pintar! Membersihkan sisa teks nama file di kotak input
      const fileInput = document.getElementById("image-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      setTitle("");
      setDescription("");
      setDemoUrl("");
      setGithubUrl("");
      setImage(null);

      onSuccess();
    } catch (error) {
      console.error("Gagal menyimpan proyek", error);
      alert("Terjadi kesalahan saat menyimpan proyek."); // Tambahan info untuk user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-gray-800 p-6 shadow-md border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          {projectToEdit ? "Edit Proyek" : "Tambah Proyek Baru"}
        </h2>
        {projectToEdit && (
          <button onClick={onCancel} className="text-sm text-red-400 hover:text-red-300">
            Batal Edit
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-gray-300">Judul Proyek *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded bg-gray-700 p-2 text-white border border-gray-600 focus:border-teal-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">
              Gambar {projectToEdit ? "(Abaikan jika tidak ganti)" : "*"}
            </label>
            <input id="image-upload" type="file" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={(e) => setImage(e.target.files?.[0] || null)} className="w-full rounded bg-gray-700 p-1.5 text-white border border-gray-600 file:mr-4 file:rounded file:border-0 file:bg-teal-600 file:px-4 file:py-1 file:text-white hover:file:bg-teal-700" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-gray-300">Deskripsi *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="w-full rounded bg-gray-700 p-2 text-white border border-gray-600 focus:border-teal-500 focus:outline-none"></textarea>
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">Demo URL</label>
            <input type="url" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} className="w-full rounded bg-gray-700 p-2 text-white border border-gray-600 focus:border-teal-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">GitHub URL</label>
            <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full rounded bg-gray-700 p-2 text-white border border-gray-600 focus:border-teal-500 focus:outline-none" />
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="rounded bg-teal-600 px-6 py-2 text-white hover:bg-teal-700 disabled:bg-teal-800 transition">
          {isSubmitting ? "Menyimpan..." : (projectToEdit ? "Simpan Perubahan" : "Simpan Proyek")}
        </button>
      </form>
    </div>
  );
}