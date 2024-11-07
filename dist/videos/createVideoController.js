"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoController = void 0;
const db_1 = require("../db/db");
const resolution_video_types_1 = require("../input-output-types/resolution-video-types");
const inputValidation = (video) => {
    const errors = {
        errorsMessages: []
    };
    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !resolution_video_types_1.Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolution'
        });
    }
    return errors;
};
const createVideoController = (req, res) => {
    var _a;
    const errors = inputValidation(req.body);
    if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors);
        return;
    }
    if (req.body.author || req.body.author.trim().length < 20 || req.body.title || req.body.title.trim().length < 40 || req.body.availableResolutions) {
        const newVideo = Object.assign(Object.assign({}, req.body), { id: Date.now() + Math.random(), canBeDownloaded: true, minAgeRestriction: null, createdAt: new Date().toISOString(), publicationDate: new Date().toISOString() });
        db_1.db.videos = [...((_a = db_1.db.videos) !== null && _a !== void 0 ? _a : []), newVideo];
        res
            .status(201)
            .json(newVideo);
        return;
    }
};
exports.createVideoController = createVideoController;
