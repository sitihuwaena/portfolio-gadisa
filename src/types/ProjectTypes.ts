import { CategoryProjectTypes } from "./CategoryProjectTypes";
import { MetadataTypes } from "./MetadataTypes";
import { MetaSourceTypes } from "./MetaSourceTypes";
import { Skill } from "./SkillTypes";
import { Thumbnail } from "./ThumbnailTypes";

export interface ProjectTypes {
    id: number;
    documentId: string;
    title: string;
    subtitle: string;
    live_preview: string | null;
    view_code: string | null;
    description: string | null;
    startDate: string | null;
    endDate: string | null;
    type: string | null;
    complexity: string | null;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    categoryProjects: CategoryProjectTypes[] | null;
    locale: string;
    metadata: MetadataTypes | null;
    featured: boolean | null;
    small_business: boolean | null;
    thumbnail: Thumbnail | null;
    gallery: Thumbnail[] | null;
    skills: Skill[];
}

// Small business projects are listed in their own section, so the main list excludes them
export const excludeSmallBusinessParams = {
    "filters[$or][0][small_business][$null]": true,
    "filters[$or][1][small_business][$eq]": false,
}

export interface ProjectState {
    source: ProjectTypes[];
    detail: ProjectTypes | null;
    meta: MetaSourceTypes;
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    params: any | null;
}

export const initialProjectState: ProjectState = {
    source: [],
    detail: null,
    loading: false,
    loadingMore: false,
    meta: {
        pagination: {
            page: 1,
            pageSize: 9,
            pageCount: 0,
            total: 0,
        }
    },
    error: null,
    params: {
        "pagination[pageSize]": 9,
        "sort": "endDate:desc",
        ...excludeSmallBusinessParams,
    },
} as ProjectState;