import sequelize from '../config/orm_setup';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { LocalGovernmentArea } from './LocalGovernmentArea.Model';


export class State extends Model<InferAttributes<State>, InferCreationAttributes<State>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare localGovernmentAreas: NonAttribute<LocalGovernmentArea[]>;
    
}

State.init(
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
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'State', // Model name
    tableName: 'States', // Custom table name if you don't want the default (pluralized model name)
    timestamps: false, // Disable timestamps if not needed
  }
);

  

