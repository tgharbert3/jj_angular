jest.mock('../../../controllers/images.controller');

import request from 'supertest';
import path from 'path';
import app from '../../../app';
import { getAllImagesMetadata, getImage } from '../../../controllers/images.controller';

describe('/GET /images/metadata ', () => {

    const mockImagesController = getAllImagesMetadata as jest.Mock;

    beforeEach(async () => {
        jest.clearAllMocks();
    });

    /**Tests for normal operation */
    it('should return a 200', async () => {
        mockImagesController.mockReturnValueOnce([
            {
                id: 1,
                fileName: 'mockFilname',
            }
        ]);

        const response = await request(app)
            .get('/images/metadata');
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(mockImagesController).toHaveBeenCalledTimes(1);

    });

    /**tests for invalid metadata */
    it('should return an 404', async () => {
        mockImagesController.mockReturnValueOnce(null);

        const response = await request(app)
            .get('/images/metadata');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: "No metadata available"
        })
        expect(mockImagesController).toHaveBeenCalledTimes(1);
    });

    /**Tests the catch block */
    it('Should return an error', async () => {
        mockImagesController.mockRejectedValueOnce(new Error("DB failure"));

        const response = await request(app).get('/images/metadata');
        expect(response.status).toEqual(500);
        expect(response.body).toEqual({
            message: 'DB failure',
        });
        expect(mockImagesController).toHaveBeenCalledTimes(1);
    });
});

describe('/GET /images/:id', () => {
    const mockGetImage = getImage as jest.Mock;

    beforeEach(async () => {
        jest.clearAllMocks();
    });

    /**Testing the route if it works */
    it('Should return a file', async () => {
        const filePath = path.join(__dirname, '..', 'testing_assets', 'basin.jpg');
        mockGetImage.mockReturnValueOnce(filePath);

        const response = await request(app).get('/images/1');
        expect(response.status).toBe(200);
        expect(mockGetImage).toHaveBeenCalledTimes(1);
    });

    /**Testing a not valid req param */
    it('Should return 400, image not found', async () => {

        const response = await request(app).get('/images/t');
        expect(response.status).toBe(400);
        expect(response.body.error).toMatch("Invalid image ID");
    });

    /**Tests if there the param is a valid number not a matching image */
    it('Should return 404, Image not found', async () => {

        mockGetImage.mockReturnValueOnce('');

        const response = await request(app).get('/images/2');
        expect(response.status).toBe(404);
        expect(response.body.error).toMatch('Image not found');
        expect(mockGetImage).toHaveBeenCalledTimes(1);
    });

    /**Tests the catch block */
    it('Should consle error and return 500 status', async () => {
        mockGetImage.mockRejectedValueOnce(new Error("Get image Error"));

        const response = await request(app).get('/images/1');
        expect(response.status).toBe(500);
        expect(response.body.message).toMatch("Get image Error");
        expect(mockGetImage).toHaveBeenCalledTimes(1);
    });
})