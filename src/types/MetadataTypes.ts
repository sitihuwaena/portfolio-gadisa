import { Thumbnail } from "./ThumbnailTypes";

export interface MetadataTypes {
    id: number;
    meta_description: string;
    title: string;
    keyword: string[];
    meta_image: Thumbnail;
}