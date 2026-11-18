import { MetadataTypes } from "./MetadataTypes";

export interface AboutPageTypes {
    id: number;
    documentId: string;
    metadata: MetadataTypes | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}