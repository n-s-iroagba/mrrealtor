import sequelize from '../../src/config/orm_setup'
import request from 'supertest';
import app from '../../src';


let server:any  

beforeAll((done) => {
  server = app.listen(4000, () => {
    console.log('Test server running on port 4000');
    done();  
  });
});

afterAll(async () => {
  try {
    await sequelize.close();  
  } catch (err) {
    console.error('Error closing sequelize connection:', err);
  }
  try {
    await new Promise<void>((resolve) => server.close(() => resolve()));  
  } catch (err) {
    console.error('Error closing server:', err);
  }
});

describe('GET index route', () => {
  it('should return a 200 status and success message', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('server is running');  
  });
});
