import api from "./api";
import { Skill } from "@/types";

interface SkillResponseSingle{
  status: string;
  data: Skill;
  message?: string;
}

interface SkillResponseArray {
  status: string;
  data: Skill[];
  message?: string;
}

export const getAllSkill = async (): Promise<Skill[]> => {
  const response = await api.get<SkillResponseArray>('/skills/');
  return response.data.data;
};

export const getSkillById = async (id: number): Promise<Skill> => {
  const response = await api.get<SkillResponseSingle>(`/skills/${id}`);
  return response.data.data;
};

export const createSkill = async (formData: FormData): Promise<Skill> => {
  const response = await api.post<SkillResponseSingle>('/skills/', formData);
  return response.data.data;
};

export const updateSkill = async (id: number, formData: FormData): Promise<Skill> => {
  const response = await api.put<SkillResponseSingle>(`/skills/${id}`, formData);
  return response.data.data;
};

export const deleteSkill = async (id: number): Promise<boolean> => {
  const response = await api.delete(`/skills/${id}`);
  return response.data.status === 'success';
};