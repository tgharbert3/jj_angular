process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const https = require('https');
const fetch = require('node-fetch');

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

describe('POST /login', () => {
    it('should return the users email on valid login', async () => {
        const response = await fetch('https://hopper.cis.uncw.edu:5001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:
                JSON.stringify({ email: "test@gmail.com", password: "Test1234!" }),
            agent: httpsAgent,
        });

        expect(response.status).toBe(200);

        const userEmail = await response.json();
        expect(userEmail.email).toBe("test@gmail.com")

    }, 15000);
});