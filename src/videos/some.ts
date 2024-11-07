import {Request, Response} from 'express'
import {VideoDbType} from "../db/video-db-type";
import {OutputErrorsType} from "../input-output-types/output-errors-type";
import {ResolutionVideoTypes} from "../input-output-types/resolution-video-types";

export type ParamType = {
    id: string
}

export type BodyType = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction?: any;
    createdAt: string;
    publicationDate: string;
    availableResolutions: ResolutionVideoTypes[];
}

export type QueryType = {
    search?: string
}

export type OutputType = VideoDbType | OutputErrorsType

export const someController = (
    req: Request<ParamType, OutputType, BodyType, QueryType>,
    res: Response<OutputType>
) => {

}