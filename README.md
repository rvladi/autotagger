# Image Auto-Tagger

A useful feature of an image repository is the ability to automatically assign relevant tags to every image uploaded by a user. This is what the Image Auto-Tagger application does. The main page allows the user to select between 1 and 4 images in JPEG or PNG format. It then displays previews of the selected images. When the user uploads the images, the results page displays next to each image a list of up to 15 automatically assigned tags. The tags are sorted by confidence in descending order.

The Image Auto-Tagger application integrates with the AI-powered image tagging API provided by [Imagga](https://imagga.com). Imagga offers a set of image understanding and analysis technologies available as a software-as-a-service (SaaS). The image tagging deep learning model analyzes the pixel content of visuals, extracts their features, and detects objects of interest. Imagga's image tagging API accurately recognizes objects, scenes, and concepts.

## Project Setup

1\. Install [Node.js](https://nodejs.org).

2\. Clone the repository or download the project ZIP.

3\. Open a terminal and navigate to the project folder.

4\. Run: `npm install`

## Starting the Server

From the project folder, run: `npm start`

The following message is displayed: `Image auto-tagging server running at localhost:3000`

## Running the Tests

1\. Open a terminal and start the server: `npm start`

2\. Open a terminal and run the tests: `npm test`

The following output is generated:
```
Image auto-tagger
    GET /
      ✔ should return the index page (51ms)
    POST /upload (0 images)
      ✔ should upload 0 images and fail (min number of images is 1)
    POST /upload (1 image)
      ✔ should upload one image and return a page with tags assigned automatically to the image (752ms)
    POST /upload (2 images)
      ✔ should upload two images and return a page with tags assigned automatically to each image (1111ms)
    POST /upload (5 images)
      ✔ should upload 5 images and fail (max number of images is 4)
    POST /upload (non-image file)
      ✔ should upload a text file and fail (only images in JPEG or PNG format are supported)
```

## Using the Application

1\. Open a terminal and start the server: `npm start`

2\. Launch a browser and navigate to: http://localhost:3000

3\. On the main page, press the `Choose Files` button to the select between 1 and 4 images in JPEG or PNG format.

4\. Inspect the image previews to ensure the right images have been selected.

5\. Press the `Upload image(s) for auto-tagging` button.

6\. On the results page, review the automatically assigned tags displayed next to each image.

7\. Press the `Select new images` button to select a new set of images for auto-tagging.
