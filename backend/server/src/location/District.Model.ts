import sequelize from '../config/orm_setup';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { LocalGovernmentArea } from './LocalGovernment.Model';

export class District extends Model<InferAttributes<District>, InferCreationAttributes<District>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare localGovernmentAreaId: ForeignKey<LocalGovernmentArea['id']>;
    declare localGovernmentArea: NonAttribute<LocalGovernmentArea>;
}



District.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      localGovernmentAreaId:  {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'District',
      tableName: 'districts',
    }
  );
  