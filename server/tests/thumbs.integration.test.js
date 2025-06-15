const https = require('https');
const fetch = require('node-fetch');

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

describe("/GET Thumbs", () => {
    it("Should return an araay of strings which are the names of files", async () => {
        const response = await fetch('https://hopper.cis.uncw.edu:5001/gallery/load?page=2', {
            agent: httpsAgent
        });
        expect(response.ok).toBe(true);

        const data = await response.json();
        expect(Array.isArray(data.filenames)).toBe(true);
        data.filenames.forEach(file => {
            expect(typeof file).toBe("string");
        });
    });


})