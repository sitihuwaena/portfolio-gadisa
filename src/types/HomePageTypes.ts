import { MetadataTypes } from "./MetadataTypes";

export interface HomePageTypes {
    id: number;
    documentId: string;
    about: string;
    experiences: number;
    projects: number;
    resume: string;
    metadata: MetadataTypes | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}