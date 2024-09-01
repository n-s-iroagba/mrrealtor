import sequelize from '../config/orm_setup';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { District } from './District.Model';
import { Realtor } from './Realtor.Model';
import { BuildingLikes } from './BuildingLikes.Model';



export class Building extends Model<InferAttributes<Building>, InferCreationAttributes<Building>> {
  declare id: CreationOptional<number>;
  declare commercialType: 'rental'|'sale';
  declare price: number;
  declare numberOfRooms: number;
  declare buildingType: string;
  declare districtId:ForeignKey<District['id']>;
  declare firstLineAddress: string;
  declare paid: boolean | null;
  declare listingDate: Date;
  declare bestAmenity: string;
  declare otherAmenity: string;
  declare poster:NonAttribute<Realtor>;
  declare posterId: ForeignKey<Realtor['id']>;
  declare images:string;
  declare salesPitch:string;
  declare likesCount:number|null

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
    numberOfRooms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buildingType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bestAmenity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherAmenity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likesCount:  {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Building',
    tableName:'Building'

  }
);
Building.hasMany(BuildingLikes, { foreignKey: 'likedById' });


export default Building;
