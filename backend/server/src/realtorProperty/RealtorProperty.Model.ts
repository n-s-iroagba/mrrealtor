import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/orm_setup';

export class RealtorProperty extends Model<InferAttributes<RealtorProperty>, InferCreationAttributes<RealtorProperty>> {}

RealtorProperty.init(
  {
    propertyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'properties',
        key: 'id',
      },
      primaryKey: true,
    },
    interestedPartyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'realtors',
        key: 'id',
      },
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'realtorsProperties' }
);
