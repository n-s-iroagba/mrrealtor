import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/orm_setup';

export class RealtorLand extends Model<InferAttributes<RealtorLand>, InferCreationAttributes<RealtorLand>> {}

RealtorLand.init(
  {
    landId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lands',
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
  { sequelize, modelName: 'realtorsLands' }
);
