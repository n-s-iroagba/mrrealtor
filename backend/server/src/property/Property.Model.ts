import sequelize from '../config/orm_setup';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { Realtor } from '../realtor/Realtor.Model';

export class Property extends Model<InferAttributes<Property>, InferCreationAttributes<Property>> {
  declare id: CreationOptional<number>;
  declare commercialType: string;
  declare price: number;
  declare state: string;
  declare propertyType: string;
  declare localGovernment: string;
  declare subLocalGovernment: string;
  declare firstLineAddress: string;
  declare paid: boolean | null;
  declare listingDate: Date;
  declare realtorId: ForeignKey<Realtor['id']>;
  declare images: string[]; // Array of image file paths
}

Property.init(
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
    propertyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    localGovernment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subLocalGovernment: {
      type: DataTypes.STRING,
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
    realtorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  { sequelize, modelName: 'properties' }
);
