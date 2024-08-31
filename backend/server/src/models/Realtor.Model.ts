
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import sequelize from '../config/orm_setup';
import { Building } from './Building.Model';


export class Realtor  extends Model<InferAttributes<Realtor>, InferCreationAttributes<Realtor>>{
declare id: CreationOptional<number>;
declare lastName: string;
declare firstName: string;

declare email: string;

declare password: string;

declare country: string;

declare verificationToken: string | null;

declare isVerified: boolean | null;
declare socketId: string|null
declare phoneNumber: string | null;
declare changePasswordToken: string | null;
declare buildings: NonAttribute<Building[]>;
}



export default Realtor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    verificationToken: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    changePasswordToken: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
    socketId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  { sequelize, modelName: 'Realtor' }
);




  



