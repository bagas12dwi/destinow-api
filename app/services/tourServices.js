let config = require('../config/config');
let Tour = require('../models/Tour');
let fs = require('fs');
const path = require('path');



async function index(req, res, next) {
    try {
        let tourServices = await Tour.find().select();
        return res.json({
            success: "true",
            message: "success get data tour",
            data: tourServices
        });
    } catch (error) {
        return res.json({
            success: "false",
            message: "failed get data",
            log : error.message,
        });
    }
}

async function store(req, res, next) {
    try {
        let payload = req.body;
        let file = req.files;

        let uploadImage = await uploadFile(file[0]);

        if (!uploadImage.status) {
            return res.json({
                success: 'false',
                message: 'failed to upload image, try again later!',
            });
        }

        console.log(uploadImage.status);

        await Tour.insertMany({
            name: payload.name,
            address: payload.address,
            province: payload.province,
            regency: payload.regency,
            price: payload.price,
            image_path: uploadImage.name,
            opening_hours: payload.opening_hours,
            description: payload.description,
            rating: payload.rating,
            lat: payload.lat,
            long: payload.long
        });

        return res.json({
            success: "true",
            message: "success adding new tour",
        });
    } catch (error) {
        return res.json({
            success: "false",
            message: "fail, get data",
            log: error.message,
        });
    }
}

async function uploadFile(file) {
    if (file) {
        let filename = file.originalname;
        let fileType = filename.split(".").length == 2 ? filename.split(".")[1] : "jpg";
        let newname = Date.parse(new Date()) + '-' + Math.floor(Math.random() * 999) + '.' + fileType;
        let targetDirectory = path.join(__dirname, config.ASSETS, "/tourImage/");

        if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory, { recursive: true }); // Create the directory
        }
    
        const target = path.join(__dirname, config.ASSETS + "/tourImage/", newname);
        console.log(file.tmp);
        fs.renameSync(file.path, target);
    
        return {
            status: true,
            name: config.URL_WEB + 'public/images/tourImage/' + newname,
        };
    } else {
        return {
            status: false,
            name: null,
        };
    }
}

module.exports = {
    index,
    store
}