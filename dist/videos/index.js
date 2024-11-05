"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.video = exports.videosController = exports.videosRouter = void 0;
const express_1 = require("express");
const createVideoController_1 = require("./createVideoController");
const findVideoController_1 = require("./findVideoController");
const deleteVideoController_1 = require("./deleteVideoController");
const db_1 = require("@/db/db");
exports.videosRouter = (0, express_1.Router)();
exports.videosController = {
    getVideo: (req, res) => {
        const videos = db_1.db.videos;
        res
            .status(200)
            .json(videos);
    },
    createVideo: (req, res) => (0, createVideoController_1.createVideoController)(req, res),
    findVideo: (req, res) => 
};
exports.videosRouter.get('/', exports.videosController.getVideo);
exports.videosRouter.post('/', exports.videosController.createVideo);
exports.videosRouter.get('/:id', findVideoController_1.findVideoController);
exports.videosRouter.delete('/:id', deleteVideoController_1.deleteVideoController);
// ...
// не забудьте добавить роут в апп
