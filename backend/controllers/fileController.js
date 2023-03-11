// const asyncHandler = require('express-async-handler')
const formidable = require('formidable');
const path = require('path')
const fs = require('fs')
const FileSchema = require('../models/schema')
const asyncHandler = require('express-async-handler')

let upload_path = path.join(__dirname, '../uploadFolder/')

const uploadFile = asyncHandler(async (req, res, next) => {
    const form = formidable();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        // console.log(files)
        const { username } = fields

        if (!username) {
            res.status(401)
            return next(new Error("Please provide username"))
        }
        if (!files.uploadFile) {
            try {
                const response = await FileSchema.create({ name: username, path: '' })
                res.json({ response })
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
            return
        }
        // console.log(uploadedFile)
        var oldpath = files.uploadFile.filepath;
        var newpath = upload_path + new Date().getTime() + path.extname(files.uploadFile.originalFilename)
        let newName = new Date().getTime() + path.extname(files.uploadFile.originalFilename)
        // console.log("orginal name", files.uploadFile.originalFilename)


        fs.rename(oldpath, newpath, function (err) {
            if (err) throw new Error(err);
            // pathToUpload = newpath
        });
        // res.json({ name: username, path: newpath })
        try {
            const response = await FileSchema.create({ name: username, path: newpath, fileName: newName })
            res.json({ response })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })

})


const getAllFiles = asyncHandler(async (req, res) => {
    const allFile = await FileSchema.find({})
    res.json(allFile)
})
module.exports = { uploadFile, getAllFiles }