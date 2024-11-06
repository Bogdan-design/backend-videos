"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosController = exports.videosRouter = void 0;
const express_1 = require("express");
const createVideoController_1 = require("./createVideoController");
// import {deleteVideoController} from './deleteVideoController'
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
        if (db_1.db.videos) {
            const videoFound = db_1.db.videos.find(v => req.body.id = v.id);
            res
                .status(200)
                .json(videoFound);
        }
        else {
            res
                .status(404)
                .json({ message: 'Video dont found!', field: 'availableResolution' });
            return;
        }
    },
    deleteVideo: (req, res) => {
    }
};
exports.videosRouter.get('/', exports.videosController.getVideo);
exports.videosRouter.post('/', exports.videosController.createVideo);
exports.videosRouter.get('/:id', exports.videosController.findVideo);
// videosRouter.delete('/:id', deleteVideoController)
// ...
// не забудьте добавить роут в апп
