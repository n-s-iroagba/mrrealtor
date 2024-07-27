import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
    DataTypes,
    Sequelize
  } from 'sequelize';
import sequelize from '../config/orm_setup';
  import { Realtor } from '../realtor/Realtor.Model';
  import { Property } from '../property/Property.Model';
  import { Land } from '../land/Land.Model';
  
  export class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {
    declare id: CreationOptional<number>;
    declare date: Date;
    declare location: string;
    declare realtorId: ForeignKey<Realtor['id']>;
    declare clientId: ForeignKey<Realtor['id']>;
    declare propertyInQuestionId: ForeignKey<Property['id'] | Land['id']>;
    declare propertyType: 'property' | 'land';
  
    declare realtor: NonAttribute<Realtor>;
    declare client: NonAttribute<Realtor>;
    declare propertyInQuestion: NonAttribute<Property | Land>;
  }
  
  Appointment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      realtorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      propertyInQuestionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      propertyType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'appointment',
      tableName: 'appointments',
    }
  );
  