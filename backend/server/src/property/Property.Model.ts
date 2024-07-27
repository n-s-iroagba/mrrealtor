import sequelize from '../config/orm_setup';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { Realtor } from '../realtor/Realtor.Model';
import { RealtorProperty } from '../realtorProperty/RealtorProperty.Model';

export class Property extends Model<InferAttributes<Property>, InferCreationAttributes<Property>> {
  declare id: CreationOptional<number>;
  declare commercialType: string;
  declare price: number;
  declare state: string;
  declare propertyType: string;
  declare localGovernment: string;
  declare district: string;
  declare firstLineAddress: string;
  declare paid: boolean | null;
  declare listingDate: Date;
  declare posterId: ForeignKey<Realtor['id']>;
  declare images:string;
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
    district: {
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
    posterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  
  },
  {
    sequelize,
    modelName: 'Property',
    tableName: 'properties',
  }
);

Property.belongsTo(Realtor, { foreignKey: 'posterId' });
Property.belongsToMany(Realtor, { through: RealtorProperty, foreignKey: 'propertyId' });

export default Property;
