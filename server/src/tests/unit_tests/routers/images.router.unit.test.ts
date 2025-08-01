jest.mock('../../../controllers/images.controller');

import request from 'supertest';
import app from '../../../app';
import { getAllImagesMetadata } from '../../../controllers/images.controller';

describe('/GET /images/metadata ', () => {

    const mockImagesController = getAllImagesMetadata as jest.Mock;

    afterEach(async () => {
        mockImagesController.mockRestore();
    });

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