import sequelize from '../config/orm_setup';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { Realtor } from '../realtor/Realtor.Model';
import { District } from '../location/District.Model';
import { RealtorBuilding } from '../realtorBuilding/RealtorBuilding.Model';

export class Building extends Model<InferAttributes<Building>, InferCreationAttributes<Building>> {
  declare id: CreationOptional<number>;
  declare commercialType: string;
  declare price: number;
  declare numberOfRooms: number;
  declare buildingType: string;
  declare district: NonAttribute<District>;
  declare districtId:ForeignKey<District['id']>;
  declare firstLineAddress: string;
  declare paid: boolean | null;
  declare listingDate: Date;
  declare bestAmmenity: string;
  declare otherAmmenity: string;
  declare poster:NonAttribute<Realtor>;
  declare posterId: ForeignKey<Realtor['id']>;
  declare images:string;
  declare salesPitch:string;
  declare interiorDesignFeatures:string;
}


Building.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    commercialType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstLineAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    listingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    posterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salesPitch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    interiorDesignFeatures: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    numberOfRooms:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buildingType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bestAmmenity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherAmmenity:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Property',
    tableName: 'properties',
  }
);

Building.belongsTo(Realtor, { foreignKey: 'posterId' });
Building.belongsToMany(Realtor, { through: RealtorBuilding, foreignKey: 'propertyId' });

export default Building;
