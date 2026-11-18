import { MetadataTypes } from "./MetadataTypes";

export interface ReachMePageTypes {
    id: number;
    documentId: string;
    metadata: MetadataTypes | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}