// import {VideoDBType} from '../src/db/video-db-type'
// import {Resolutions} from '../src/input-output-types/video-types'
import {DBType} from '../src/db/db'
import {Resolutions} from "../src/input-output-types/video-types";
import {VideoDbType} from "../src/db/video-db-type";

// готовые данные для переиспользования в тестах

export const video1: VideoDbType /*VideoDBType*/ = {
    id: Date.now() + Math.random(),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: [Resolutions.P240],
}

export const dataset1: DBType = {
    videos: [video1],
}
