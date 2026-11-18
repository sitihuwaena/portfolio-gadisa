export interface Skill {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    source: {
        id: number;
        documentId: string;
        name: string;
        url: string;
        formats: any | null;
    } | null;
    understanding: any[];
}