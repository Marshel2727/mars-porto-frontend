import api from "./api";
import { Message } from "@/types";

export type ApiStatus = "success" | "error";

interface MessageResponseSingle {
  status: ApiStatus;
  data: Message;
  message?: string;
}

interface MessageResponseArray {
  status: ApiStatus;
  data: Message[];
  message?: string;
}

export const getAllMessages = async (): Promise<Message[]> => {
  const response = await api.get<MessageResponseArray>('/messages/');
  return response.data.data;
};

export const getMessageById = async (id: number): Promise<Message> => {
  const response = await api.get<MessageResponseSingle>(`/messages/${id}`);
  return response.data.data;
};

export const createMessage = async (data: { name: string; email: string; content: string }): Promise<Message> => {
  // Ingat: Rute POST ini di Flask tidak butuh token admin
  const response = await api.post<MessageResponseSingle>('/messages/', data);
  return response.data.data;
};

export const markMessageAsRead = async (id: number): Promise<boolean> => {
  const response = await api.put(`/messages/${id}`);
  return response.status === 200;
};

export const deleteMessage = async (id: number): Promise<boolean> => {
  const response = await api.delete(`/messages/${id}`);
  return response.status === 200;
};