const uploadFiles = require('../utils/uploadFiles');
const fs = require('fs');
const got = require('got');
const FormData = require('form-data');

// Imagga parameters
const IMAGGA_URL = 'https://api.imagga.com/v2/tags';
const IMAGGA_API_KEY = 'acc_59f12b4941b7e23';
const IMAGGA_API_SECRET = '83e6e39bfcf95de7b7a58850f6242c67';

const upload = async (req, res) => {
    try {
        // upload files
        await uploadFiles(req, res);

        // check number of files
        if (req.files.length === 0) {
            const err = 'No images selected. Select between 1 and 4 images in JPEG or PNG format.';
            res.render('index', {
                err: err
            });
            return;
        }

        // requests to the Imagga API are sent sequentially due to limitations in the free subscription plan
        const images = [];
        for (const file of req.files) {
            const formData = new FormData();
            formData.append('image', fs.createReadStream(file.path));
            formData.append('limit', 15); // 15 tags

            // send request to the Imagga API to retrieve the tags for the image
            const {result: {tags}} = await got.post(IMAGGA_URL, {
                body: formData, username: IMAGGA_API_KEY, password: IMAGGA_API_SECRET
            }).json();

            images.push({
                src: 'uploads/' + file.filename,
                tags: tags.map(tag => tag.tag.en)
            });
        }

        // render the results page with automatically assigned tags displayed next to each image
        res.render('result', {
            images: images
        });
    } catch (error) {
        res.render('index', {
            err: 'Upload error. Select between 1 and 4 images in JPEG or PNG format.'
        });
    }
};

module.exports = upload;
