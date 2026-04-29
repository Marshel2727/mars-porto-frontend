import api from "./api";
import { Project } from "@/types";

interface ProjectResponseSingle {
    status: string;
    data: Project;
    message?: string;
}

interface ProjectResponseArray {
    status: string;
    data: Project[];
    message?: string;
}

export const getAllProjects = async (): Promise<Project[]> => {
    const response = await api.get<ProjectResponseArray>('/projects/');
    return response.data.data;
};

export const getProjectById = async (id: number): Promise<Project> => {
    const response = await api.get<ProjectResponseSingle>(`/projects/${id}`);
    return response.data.data;
};

export const createProject = async (formData: FormData): Promise<Project> => {
    const response = await api.post<ProjectResponseSingle>('/projects/', formData);
    return response.data.data;
};

export const updateProject = async (id: number, formData: FormData): Promise<Project> => {
    const response = await api.put<ProjectResponseSingle>(`/projects/${id}`, formData);
    return response.data.data
};

export const deleteProject = async (id: number): Promise<boolean> => {
    const response = await api.delete<ProjectResponseSingle>(`/projects/${id}`);
    return response.data.status === 'success';
}
