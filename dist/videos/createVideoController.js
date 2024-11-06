"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoController = void 0;
const db_1 = require("../db/db");
const video_types_1 = require("../input-output-types/video-types");
const inputValidation = (video) => {
    const errors = {
        errorsMessages: []
    };
    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !video_types_1.Resolutions[p])) {
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
    // если всё ок - добавляем видео
    const newVideo = Object.assign(Object.assign({}, req.body), { id: Date.now() + Math.random() });
    db_1.db.videos = [...((_a = db_1.db.videos) !== null && _a !== void 0 ? _a : []), newVideo];
    res
        .status(201)
        .json(newVideo);
};
exports.createVideoController = createVideoController;
