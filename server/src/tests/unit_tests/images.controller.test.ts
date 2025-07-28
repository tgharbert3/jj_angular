import { getAllImagesMetadata } from "../../controllers/images.controller";
import * as imageService from '../../services/images.service';


describe('Unit tests for the images controller', () => {

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
        console.log(result);
        expect(result).toEqual([mockMetadata]);
    });

    it('Should return an error', async () => {
        const error = new Error('Db Fail');

        jest.spyOn(imageService, 'getImagesMetaData').mockRejectedValue(error);

        await expect(getAllImagesMetadata()).rejects.toThrow(/Could not get all images metadata:/)
    })
});