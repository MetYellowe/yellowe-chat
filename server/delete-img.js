import express from 'express'
const app = express()
app.use(express.json())
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

app.post('/', async (req, res, next) => {
    const { body: { public_id } } = req

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });
    const options = {
        invalidate: true
    }
    const callback = function(error,result) {
        console.log(result, error)
    }
    if(public_id[0]) {
        await cloudinary.api.delete_resources(public_id, options, callback);
    } else {
        await cloudinary.uploader.destroy(public_id, options, callback);
        next()
    }
})

export default {
    path: '/server/delete-img',
    handler: app
}