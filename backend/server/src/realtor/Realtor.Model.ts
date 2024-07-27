
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import sequelize from '../config/orm_setup';
import { Property } from '../property/Property.Model';
import { Chat } from '../chat/Chat.Model';
import { RealtorProperty } from '../realtorProperty/RealtorProperty.Model';
// import { RealtorProperty } from '../realtorProperty/RealtorProperty.Model';
// import { Message } from '../message/Message.Model';
// import { Chat } from '../chat/Chat.Model';



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

declare properties?: NonAttribute<Property[]>;
}



Realtor.init(
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
  { sequelize, modelName: 'realtors' }
);
Realtor.belongsToMany(Property, { through: RealtorProperty, foreignKey: 'realtorId' })
Realtor.hasMany(Property, { foreignKey: 'posterId' })
 Realtor.hasMany(Chat, { foreignKey: 'clientId' })
Realtor.hasMany(Chat, { foreignKey: 'realtorId' })



  



