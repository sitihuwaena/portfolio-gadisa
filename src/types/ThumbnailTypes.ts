import { ImageFormat } from "./ImageFormatTypes";

export interface Thumbnail {
    id: number;
    documentId: string;
    name: string;
    url: string;
    formats: {
        large: ImageFormat;
        small: ImageFormat;
        medium: ImageFormat;
        thumbnail: ImageFormat;
    } | null;
}