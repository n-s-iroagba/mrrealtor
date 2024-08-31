
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../config/orm_setup';

export class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare password: string;
  declare email: string;
  declare changePasswordToken?: string | null;
  declare verificationToken?: string | null;
  declare isVerified: boolean|null;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    changePasswordToken: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
    verificationToken: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
   { sequelize, 
    modelName: 'Admin',     
  }
);
