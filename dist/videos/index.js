"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosController = exports.videosRouter = void 0;
const express_1 = require("express");
const createVideoController_1 = require("./createVideoController");
const db_1 = require("../db/db");
exports.videosRouter = (0, express_1.Router)();
exports.videosController = {
    getVideo: (req, res) => {
        const videos = db_1.db.videos;
        res
            .status(200)
            .json(videos);
    },
    createVideo: (req, res) => (0, createVideoController_1.createVideoController)(req, res),
    findVideo: (req, res) => {
        const videoId = +req.params.id;
        if (Array.isArray(db_1.db.videos) && videoId) {
            const videoFound = db_1.db.videos.find(v => videoId === v.id);
            if (videoFound) {
                res.status(200).json(videoFound);
                return;
            }
            else {
                const error = {
                    errorsMessages: [
                        {
                            message: 'Video for passed id doesn`t exist', field: 'id'
                        }
                    ]
                };
                res
                    .status(404)
                    .json(error);
                return;
            }
        }
    },
    updateVideo: (req, res) => {
        const videoId = +req.params.id;
        const newTitle = req.body.title;
        const newAuthor = req.body.author;
        const newAvailableResolution = req.body.availableResolutions;
        const newCanBeDownloaded = req.body.canBeDownloaded;
        const newMinAgeRestriction = req.body.minAgeRestriction;
        const newPublicationDate = req.body.publicationDate;
        if (Array.isArray(db_1.db.videos) && videoId) {
            const index = db_1.db.videos.findIndex(v => v.id === videoId);
            const videoFound = db_1.db.videos.find(v => videoId === v.id);
            if (videoFound && index) {
                if (newTitle && newAuthor) {
                    const updatedVideo = {
                        id: videoId,
                        title: newTitle,
                        author: newAuthor,
                        canBeDownloaded: newCanBeDownloaded ? newCanBeDownloaded : videoFound.canBeDownloaded,
                        minAgeRestriction: newMinAgeRestriction ? newMinAgeRestriction : videoFound.minAgeRestriction,
                        createdAt: videoFound.createdAt,
                        publicationDate: newPublicationDate ? newPublicationDate : videoFound.publicationDate,
                        availableResolutions: newAvailableResolution ?
                            [...newAvailableResolution]
                            : videoFound.availableResolutions,
                    };
                    db_1.db.videos.splice(index, 1, updatedVideo);
                    res.status(201).json(updatedVideo);
                }
                else {
                    const error = {
                        errorsMessages: [
                            {
                                message: 'You mees write title or author', field: 'title or author'
                            }
                        ]
                    };
                    res
                        .status(400)
                        .json(error);
                    return;
                }
                res.status(204).json(videoFound);
                return;
            }
            else {
                const error = {
                    errorsMessages: [
                        {
                            message: 'Video for passed id doesn`t exist', field: 'id'
                        }
                    ]
                };
                res
                    .status(404)
                    .json(error);
                return;
            }
        }
    },
    deleteVideo: (req, res) => {
        const videoId = +req.params.id;
        if (videoId && db_1.db.videos) {
            const index = db_1.db.videos.findIndex(v => v.id === videoId);
            // let index: number | undefined
            // for (let i = 0; i < db.videos.length; i++) {
            //     if (db.videos[i].id === videoId) {
            //         index= i
            //         break
            //     }
            // }
            if (index !== undefined) {
                db_1.db.videos.splice(index, 1);
                res.status(204);
                return;
            }
            else {
                res.status(404);
                return;
            }
        }
        else {
            res.status(500);
            return;
        }
    }
};
exports.videosRouter.get('/', exports.videosController.getVideo);
exports.videosRouter.post('/', exports.videosController.createVideo);
exports.videosRouter.get('/:id', exports.videosController.findVideo);
exports.videosRouter.put('/:id', exports.videosController.updateVideo);
exports.videosRouter.delete('/:id', exports.videosController.deleteVideo);
