const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const fs = require('fs')
const {JSDOM} = require('jsdom');

chai.use(chaiHttp);

const server = 'http://localhost:3000';
const TIMEOUT = 10000; // ms

describe('Image auto-tagger', () => {

    describe('GET /', () => {
        it('should return the index page', async () => {
            const res = await chai.request(server)
                .get('/')
                .send();
            expect(res).to.have.status(200);
            expect(res).to.be.html;
        }).timeout(TIMEOUT);
    });

    describe('POST /upload (0 images)', () => {
        it('should upload 0 images and fail (min number of images is 1)', async () => {
            const res = await chai.request(server)
                .post('/upload')
                .attach('multi-files', Buffer.from(''), '');
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('No images selected. Select between 1 and 4 images in JPEG or PNG format.');
        }).timeout(TIMEOUT);
    });

    describe('POST /upload (1 image)', () => {
        it('should upload one image and return a page with tags assigned automatically to the image', async () => {
            const res = await chai.request(server)
                .post('/upload')
                .attach('multi-files', fs.readFileSync('test/files/palace.jpg'), 'palace.jpg');
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            const dom = new JSDOM(res.text);
            const tags = dom.window.document.getElementById('tags0').textContent.replace(/ +(?= )|\n/g, '').trim();
            expect(tags).to.equal('palace  residence  house  building  dwelling  architecture  temple  structure  water  reflection  travel  river  tourism  housing  sky');
        }).timeout(TIMEOUT);
    });

    describe('POST /upload (2 images)', () => {
        it('should upload two images and return a page with tags assigned automatically to each image', async () => {
            const res = await chai.request(server)
                .post('/upload')
                .attach('multi-files', fs.readFileSync('test/files/palace.jpg'), 'palace.jpg')
                .attach('multi-files', fs.readFileSync('test/files/shrine.jpg'), 'shrine.jpg');
            expect(res).to.have.status(200);
            expect(res).to.be.html;

            const dom = new JSDOM(res.text);

            // tags for first image (palace.jpg)
            const tags0 = dom.window.document.getElementById('tags0').textContent.replace(/ +(?= )|\n/g, '').trim();
            expect(tags0).to.equal('palace  residence  house  building  dwelling  architecture  temple  structure  water  reflection  travel  river  tourism  housing  sky');

            // tags for second image (shrine.jpg)
            const tags1 = dom.window.document.getElementById('tags1').textContent.replace(/ +(?= )|\n/g, '').trim();
            expect(tags1).to.equal('shrine  place of worship  building  temple  religion  architecture  structure  culture  travel  ancient  religious  old  landmark  history  tourism');
        }).timeout(TIMEOUT);
    });

    describe('POST /upload (5 images)', () => {
        it('should upload 5 images and fail (max number of images is 4)', async () => {
            const res = await chai.request(server)
                .post('/upload')
                .attach('multi-files', fs.readFileSync('test/files/palace.jpg'), 'palace.jpg')
                .attach('multi-files', fs.readFileSync('test/files/palace1.jpg'), 'palace1.jpg')
                .attach('multi-files', fs.readFileSync('test/files/palace2.jpg'), 'palace2.jpg')
                .attach('multi-files', fs.readFileSync('test/files/palace3.jpg'), 'palace3.jpg')
                .attach('multi-files', fs.readFileSync('test/files/shrine.jpg'), 'shrine.jpg');
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('Upload error. Select between 1 and 4 images in JPEG or PNG format.');
        }).timeout(TIMEOUT);
    });

    describe('POST /upload (non-image file)', () => {
        it('should upload a text file and fail (only images in JPEG or PNG format are supported)', async () => {
            const res = await chai.request(server)
                .post('/upload')
                .attach('multi-files', fs.readFileSync('test/files/text.txt'), 'text.txt');
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('Upload error. Select between 1 and 4 images in JPEG or PNG format.');
        }).timeout(TIMEOUT);
    });

});
