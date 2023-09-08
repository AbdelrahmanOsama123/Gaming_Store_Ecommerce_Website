import app from '../server';
import supertest from 'supertest';
// import imageProcess from '../conroller/imagesController';
// import path from 'path';
const request = supertest(app);

describe('Testing Endpoint status',()=>{
    it('get endpoint api without query paramaters to be invalid',async ()=>{
        const response = await request.get('/api/images');
        expect(response.status).toBe(400);
    })
    it('get endpoint api with query paramaters(filename , width and height)',async ()=>{
        const response = await request.get(
        '/api/images?filename=santamonica&width=300&height=300');
        expect(response.status).toBe(200);
    })
});
// describe('image processing',()=>{
//     it('testing image Processing controller with correct path',async()=>{
//         const resizeImagePath = await imageProcess('santamonica',200,300);
//         const expectedPath = path.resolve('../images/resizedImages/santamonica_200_300.jpg');
//         expect(resizeImagePath).toEqual(expectedPath);
//     });
// })