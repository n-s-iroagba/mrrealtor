
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import cron from 'node-cron';
import initializeSockets from './sockets';
import sequelize from './config/orm_setup';
import router from './router/router';
import { OAuth2Client } from 'google-auth-library';
import { sendReminders } from './cron/appointmentCron';
import { registerBuildingRoute } from './config/apiRoutes';


const app = express();
app.use(cors());
app.use(express.json()); // Ensure that Express can parse JSON requests
app.use(router);

const server = http.createServer(app);

initializeSockets(server);


cron.schedule('0 * * * *', sendReminders);


const PORT = 7000;
sequelize
  .sync({
    //alter:true,
  force:true
  })
  .then(() => console.log('models formed'))
  .catch((err:any) => console.log(err));
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;