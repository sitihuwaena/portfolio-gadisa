import { MetadataTypes } from "./MetadataTypes";

export interface TechStackPageTypes {
    id: number;
    documentId: string;
    metadata: MetadataTypes | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}