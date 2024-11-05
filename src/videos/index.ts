import {Request, Response, Router} from 'express'
import {createVideoController} from './createVideoController'
import {deleteVideoController} from './deleteVideoController'
import {db} from "@/db/db";

export const videosRouter = Router()

export const videosController = {
    getVideo: (req: Request<any>, res: Response<any>) => {
        const videos = db.videos
        res
            .status(200)
            .json(videos)
    },
    createVideo: (req: Request<any>, res: Response<any>) => createVideoController(req, res),
    findVideo: (req: Request<any>, res: Response<any>) => {
        if(db.videos){

        const videoFound = db.videos.find(v => req.body.id = v.id)
        res
            .status(200)
            .json(videoFound)
        } else {

            res
                .status(404)
                .json({message: 'Video dont found!', field: 'availableResolution'})
            return
        }
    }
    ,deleteVideo: (req: Request<any>, res: Response<any>) =>{

    }
}

videosRouter.get('/', videosController.getVideo)
videosRouter.post('/', videosController.createVideo)
videosRouter.get('/:id', videosController.findVideo)
videosRouter.delete('/:id', deleteVideoController)
// ...

// не забудьте добавить роут в апп