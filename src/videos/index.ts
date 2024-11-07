import {Request, Response, Router} from 'express'
import {createVideoController} from './createVideoController'
import {db} from "../db/db";
import {InputVideoType, Resolutions, ResolutionVideoTypes} from "../input-output-types/resolution-video-types";
import {VideoDbType} from "../db/video-db-type";
import {OutputErrorsType} from "../input-output-types/output-errors-type";
import {BodyType, OutputType, ParamType} from "../videos/some";

export const videosRouter = Router()

export const videosController = {
    getVideo: (req: Request<void>, res: Response<VideoDbType[]>) => {
        const videos = db.videos
        res
            .status(200)
            .json(videos)
    },
    createVideo: (req: Request<InputVideoType>, res: Response<VideoDbType>) => createVideoController(req, res),
    findVideo: (req: Request<ParamType>, res: Response<OutputType>) => {
        const videoId = +req.params.id
        if (Array.isArray(db.videos) && videoId) {
            const videoFound = db.videos.find(v => videoId === v.id)
            if (videoFound) {
                res.status(200).json(videoFound)
                return
            } else {
                const error: OutputErrorsType = {
                    errorsMessages: [
                        {
                            message: 'Video for passed id doesn`t exist', field: 'id'
                        }
                    ]
                }
                res
                    .status(404)
                    .json(error)
                return
            }

        }
    },
    updateVideo: (req: Request<ParamType,any,BodyType>, res: Response<OutputType>) => {

        const videoId = +req.params.id
        const newTitle = req.body.title
        const newAuthor = req.body.author
        const newAvailableResolution = req.body.availableResolutions
        const newCanBeDownloaded = req.body.canBeDownloaded
        const newMinAgeRestriction = req.body.minAgeRestriction
        const newPublicationDate = req.body.publicationDate

        if (Array.isArray(db.videos) && videoId) {
            const videoFound = db.videos.find(v => videoId === v.id)
            if (videoFound) {

                if(newTitle && newAuthor) {

                    const updatedVideo:VideoDbType = {
                        id: videoId,
                        title: newTitle,
                        author: newAuthor,
                        canBeDownloaded: newCanBeDownloaded ? newCanBeDownloaded : videoFound.canBeDownloaded,
                        minAgeRestriction: newMinAgeRestriction ? newMinAgeRestriction : videoFound.minAgeRestriction,
                        createdAt: videoFound.createdAt,
                        publicationDate: newPublicationDate ? newPublicationDate : videoFound.publicationDate,
                        availableResolutions:newAvailableResolution ?
                            [...newAvailableResolution]
                            : videoFound.availableResolutions,
                    }

                    db.videos.splice(videoId, 1, updatedVideo)
                    res.status(201).json(updatedVideo)

                } else{
                    const error: OutputErrorsType = {
                        errorsMessages: [
                            {
                                message: 'You mees write title or author', field: 'title or author'
                            }
                        ]
                    }
                    res
                        .status(400)
                        .json(error)
                    return
                }

                res.status(204).json(videoFound)
                return
            } else {
                const error: OutputErrorsType = {
                    errorsMessages: [
                        {
                            message: 'Video for passed id doesn`t exist', field: 'id'
                        }
                    ]
                }
                res
                    .status(404)
                    .json(error)
                return
            }

        }
    },
    deleteVideo: (req: Request<any>, res: Response<any>) => {
        const videoId = +req.params.id
        if (videoId && db.videos) {
            const index = db.videos.findIndex(v => v.id === videoId)
            // let index: number | undefined
            // for (let i = 0; i < db.videos.length; i++) {
            //     if (db.videos[i].id === videoId) {
            //         index= i
            //         break
            //     }
            // }
            if (index !== undefined) {
                db.videos.splice(index, 1)
                res.status(204)
                return
            } else {
                res.status(404)
                return
            }
        } else {
            res.status(500)
            return
        }
    }
}

videosRouter.get('/', videosController.getVideo)
videosRouter.post('/', videosController.createVideo)
videosRouter.get('/:id', videosController.findVideo)
videosRouter.put('/:id', videosController.updateVideo)
videosRouter.delete('/:id', videosController.deleteVideo)


