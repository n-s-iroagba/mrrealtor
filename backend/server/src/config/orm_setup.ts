import { Sequelize } from "sequelize";
import { Realtor } from "../models/Realtor.Model";
import { BuildingLikes } from "../models/BuildingLikes.Model";
import Building from "../models/Building.Model";




const sequelize = new Sequelize('realtor', 'root', '97chocho', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
});


export default sequelize;

