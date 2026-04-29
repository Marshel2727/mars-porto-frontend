"use client"; // Wajib ditambahkan karena sekarang kita pakai useState
import { motion } from "framer-motion";

import { useState } from "react";
import { Project } from "@/types";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  // State untuk menyimpan proyek mana yang sedang di-klik/dibuka
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-8 relative">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">Proyek Terbaru</h2>
      
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada proyek yang ditambahkan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} // Muncul saat kartu sudah agak masuk layar
              transition={{ duration: 0.6, delay: index * 0.2 }} // Efek delay per kartu
              onClick={() => setSelectedProject(project)}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-teal-500/50 transition flex flex-col cursor-pointer group"
            >
              {/* Sisa kode gambar dan deskripsi proyek tetap sama seperti yang kamu buat sebelumnya... */}
              <div className="overflow-hidden">
                <img 
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${project.image_url}`} 
                  alt={project.title} 
                  className="w-full h-48 object-cover border-b border-gray-700 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>
                <span className="text-teal-500 text-sm font-semibold mt-auto group-hover:underline">
                  Lihat Detail →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* JURUS 2: MODAL POP-UP (Hanya muncul jika ada proyek yang diklik) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Latar Belakang Gelap (Backdrop Blur) */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProject(null)} // Tutup modal jika luar kotak diklik
          ></div>

          {/* Kotak Konten Modal */}
          <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Tombol Close (X) */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-red-500 rounded-full p-2 transition backdrop-blur-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Gambar Besar di Modal */}
            <img 
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectedProject.image_url}`} 
              alt={selectedProject.title} 
              className="w-full h-64 sm:h-80 object-cover border-b border-gray-800"
            />

            {/* Area Teks Modal (Bisa di-scroll jika kepanjangan) */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {selectedProject.title}
              </h2>
              
              {/* JURUS RAPIKAN TEKS: whitespace-pre-wrap agar enter/paragraf dari database tetap terbaca */}
              <p className="text-gray-300 leading-relaxed mb-8 whitespace-pre-wrap">
                {selectedProject.description}
              </p>

              {/* Tombol Link */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                {selectedProject.demo_url && (
                  <a href={selectedProject.demo_url} target="_blank" rel="noreferrer" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-center py-3 rounded-lg font-semibold transition shadow-lg shadow-teal-500/20">
                    Kunjungi Live Demo
                  </a>
                )}
                {selectedProject.github_url && (
                  <a href={selectedProject.github_url} target="_blank" rel="noreferrer" className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-center py-3 rounded-lg font-semibold transition">
                    Lihat Kode di GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}