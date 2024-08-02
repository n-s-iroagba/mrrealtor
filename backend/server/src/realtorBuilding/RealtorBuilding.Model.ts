import { DataTypes, Model, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import sequelize from '../config/orm_setup';
import Building from '../building/Building.Model';
import { Realtor } from '../realtor/Realtor.Model';

export class RealtorBuilding extends Model<InferAttributes<RealtorBuilding>, InferCreationAttributes<RealtorBuilding>> {
  declare buildingId: ForeignKey<Building['id']>;
  declare interestedPartyId: ForeignKey<Realtor['id']>
}

RealtorBuilding.init(
  {
    buildingId: {
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
  { sequelize, modelName: 'realtorsBuildings' }
);
