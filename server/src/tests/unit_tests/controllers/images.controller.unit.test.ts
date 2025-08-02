jest.mock('../../../services/images.service')

import { getAllImagesMetadata, getImage } from "../../../controllers/images.controller";
import * as imageService from '../../../services/images.service';


describe('Unit tests for metadata function', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**Tests metadata under normal operation */
    it('Should return an object when db call succeeds', async () => {

        const mockMetadata = {
            id: 1,
            caption: "Water basin at Ryoanji temple, Kyoto",
            price: "99",
            details: "This is a lovely 16 x 20 inch silkscreen print.",
            filename: "basin.jpg"
        }

        jest.spyOn(imageService, 'getImagesMetaData').mockResolvedValue([mockMetadata]);
        const result = await getAllImagesMetadata();
        expect(result).toEqual([mockMetadata]);
    });

    /**Tests catch block */
    it('Should return an error', async () => {
        const error = new Error('Db Fail');

        jest.spyOn(imageService, 'getImagesMetaData').mockRejectedValue(error);
        await expect(getAllImagesMetadata()).rejects.toThrow(/Could not get all images metadata:/)
    });
});

describe('Tests the getImage function', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockFindImageById = imageService.findImagebyId as jest.Mock;
    const mockGetImageFromServer = imageService.getImageFromServer as jest.Mock;

    /**Tests if the paramter is not valid  */
    it('Should return null', async () => {
        const negative = await getImage(-1);
        const nan = await getImage(NaN);
        const infin = await getImage(Infinity);
        expect(negative).toBeNull();
        expect(nan).toBeNull();
        expect(infin).toBeNull();
    });

    /**Tests getting the image information from the db */
    it('Should return an object with the image info', async () => {
        mockFindImageById.mockReturnValueOnce({
            imageId: 1,
            fileName: 'basin.jpg',
            caption: 'basin',
            price: 99,
        });

        mockGetImageFromServer.mockReturnValueOnce('basin image from server')

        const response = await getImage(1);
        expect(response).toMatch('basin image from server');
        expect(mockFindImageById).toHaveBeenCalledTimes(1);
        expect(mockFindImageById).toHaveBeenCalledTimes(1);
    });

    /**Tests if the server returns null */
    it('Should return null', async () => {
        mockFindImageById.mockReturnValueOnce(null);

        const response = await getImage(1);
        expect(response).toBe(null);
        expect(mockFindImageById).toHaveBeenCalledTimes(1);
    });

    /**Tests the catch block */
    it('Should throw error', async () => {
        mockFindImageById.mockRejectedValueOnce(new Error('Failed'));

        await expect(getImage(1)).rejects.toThrow('Failed');
        expect(mockFindImageById).toHaveBeenCalledTimes(1);
    })

});
