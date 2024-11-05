import {VideoTypes} from "@/input-output-types/video-types";

export type VideoDbType =  {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction?: any;
    createdAt: string;
    publicationDate: string;
    availableResolutions: VideoTypes[];
}