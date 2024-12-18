import express from "express";
import {HTTP_STATUSES} from "../../status.code";
import {blogCollection, postCollection, usersCollection} from "../../db/mongo.db";

export const testRouter = express.Router()

export const testingController = {
    async deleteAllData  (req: any, res:any){
        try{
            await Promise.all([
                blogCollection.deleteMany(),
                postCollection.deleteMany(),
                usersCollection.deleteMany(),
            ])

            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
            return

        } catch(err){
            console.log(err)
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return
        }
    }
}


testRouter.delete('/all-data', testingController.deleteAllData)