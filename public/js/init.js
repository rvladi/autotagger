// set up displaying of image previews for the images selected by the user

// maximum number of images to preview
const MAX_NUMBER_OF_IMAGES = 4;

// only images in JPEG or PNG format are supported
const MIME_TYPES = ['image/jpeg', 'image/png'];

$(document).ready(function () {
    $('#input-multi-files').on('change', function () {
        if (this.files) {
            const spanErr = $('span.err');
            spanErr.empty();
            $('div.preview-images').empty();

            if (this.files.length > MAX_NUMBER_OF_IMAGES) {
                const err = 'Too many images selected. Select between 1 and 4 images in JPEG or PNG format.';
                spanErr.text(err);
                return;
            }

            for (const file of this.files) {
                if (MIME_TYPES.indexOf(file.type) === -1) {
                    const err = `${file.name} is not in a supported format. Select images in JPEG or PNG format.`;
                    spanErr.text(err);
                    return;
                }
                const reader = new FileReader();
                reader.onload = function (event) {
                    $($.parseHTML('<img class="m5">'))
                        .attr('src', event.target.result)
                        .appendTo('div.preview-images');
                };
                reader.readAsDataURL(file);
            }
        }
    });
});
