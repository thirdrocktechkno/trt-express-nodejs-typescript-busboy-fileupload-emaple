import { NextFunction, Request, Response, Router } from "express";
import * as Busboy from "busboy";
import * as path from "path";
import * as fs from "fs";

/**
 * Code for file uploads.
 *
 * @class FileUploader
 */
export class FileUploader {

    // method for file upload to server.
    public upload(req: Request, res: Response, next: NextFunction) {
        const busboy = Busboy({ headers: req.headers });

        busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {

            // path to file upload
            const saveTo = path.join((path.join(__dirname, "/../images/" + filename)));

            file.pipe(fs.createWriteStream(saveTo));
        });

        busboy.on("finish", function () {
            res.status(200).json({ "message": "File uploaded successfully." });
        });
        req.pipe(busboy);

    }
}