export interface Skill {
    id: number;
    name: string;
    level: string;
    icon_url: string;
    created_at?: string;
    updated_at?: string;
}

export interface Project {
    id:number;
    title: string;
    description: string;
    demo_url?: string;
    github_url?: string;
    image_url: string;
    created_at?: string;
    updated_at?: string;
}

export interface Message {
    id:  number;
    name: string;
    email: string;
    content: string;
    is_read: boolean;
    created_at?: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    created_at?: string;
    updated_at?: string;
}