const index = (req, res) => {
    // render the main page of the application which allows users to
    // select images, view previews, and upload the images for auto-tagging
    res.render('index', {
        err: ''
    });
};

module.exports = index;
