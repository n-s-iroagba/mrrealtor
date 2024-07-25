
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import initializeSockets from './sockets';
import sequelize from './config/orm_setup';
import router from './router/router';
import { OAuth2Client } from 'google-auth-library';


const app = express();
app.use(cors());

const server = http.createServer(app);

initializeSockets(server);

app.get('/', async (req, res) => {
  res.send('Socket.io server is running');
});
app.use('/messages/:id',router)
app.use('/admins/:id', router);


app.use('/realtors', router);

app.use('/realtors', router);

app.use('/realtors/:id', router);

app.use('/realtors/:id', router);

app.use('/realtors/:id', router);

app.use('/likes', router)

app.use('/all-likes', router)


app.use('/properties', router);


app.use('/properties', router);


app.use('/properties/:id', router);

app.use('/properties/:realtorId',router);


app.use('/properties/:id', router);

app.use('/properties/:id', router)

const PORT = 4000;
sequelize
  .sync({
    alter:true,
  force:true
  })
  .then(() => console.log('models formed'))
  .catch((err:any) => console.log(err));
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

