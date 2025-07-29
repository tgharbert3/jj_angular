jest.mock('../../../controllers/images.controller');

import request from 'supertest';
import app from '../../../app';
import { getAllImagesMetadata } from '../../../controllers/images.controller';

describe('/GET from images router ', () => {

    const mockImagesController = getAllImagesMetadata as jest.Mock;

    afterAll(async () => {
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

    });

    it('should return an 404', async () => {
        mockImagesController.mockReturnValueOnce(null);

        const response = await request(app)
            .get('/images/metadata');
        expect(response.status).toEqual(404);
    });

    it('Should return an error', async () => {
        mockImagesController.mockRejectedValueOnce(new Error("DB failure"));

        const response = await request(app).get('/images/metadata');
        expect(response.status).toEqual(500);
        console.log(response.body);
        expect(response.body).toEqual({
            message: 'DB failure',
        });
    });
});