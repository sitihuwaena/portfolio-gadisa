import { MetadataTypes } from "./MetadataTypes";

export interface ProjectPageTypes {
    id: number;
    documentId: string;
    metadata: MetadataTypes | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}