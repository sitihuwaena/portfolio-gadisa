export interface OrganizationMedia {
    id: number;
    documentId: string;
    name: string;
    url: string;
    mime: string;
    alternativeText: string | null;
}

export interface OrganizationTypes {
    id: number;
    documentId: string;
    Judul: string;
    Role: string | null;
    deskripsi: string | null;
    media: OrganizationMedia[] | null;
    awal: string | null;
    akhir: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}
