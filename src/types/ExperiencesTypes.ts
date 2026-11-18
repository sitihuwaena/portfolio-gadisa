export interface ExperiencesTypes {
    id: number;
    documentId: string;
    title: string;
    company: string;
    location: string;
    from: string;
    to: string | null;
    type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    responbilities: {
        id: number;
        job_desc: string;
    }[];
}