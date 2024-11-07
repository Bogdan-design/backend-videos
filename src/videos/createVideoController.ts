import {Response, Request} from 'express'
import {OutputErrorsType} from '../input-output-types/output-errors-type'
import {db} from '../db/db'
import {InputVideoType, Resolutions} from '../input-output-types/resolution-video-types'
import {VideoDbType} from "../db/video-db-type";

const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = { // объект для сбора ошибок
        errorsMessages: []
    }

    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolution'
        })
    }
    return errors
}

export const createVideoController = (req: Request<any,any,InputVideoType>, res: Response<any /*OutputVideoType*/ | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors)
        return
    }
    if(req.body.author || req.body.author.trim().length<20  || req.body.title || req.body.title.trim().length<40  || req.body.availableResolutions){
        const newVideo: VideoDbType = {
            ...req.body,
            id: Date.now() + Math.random(),
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString()
        }
        db.videos = [...(db.videos ?? []), newVideo]

        res
            .status(201)
            .json(newVideo)
        return
    }

}