import sequelize from '../config/orm_setup';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { District } from './District.Model';
import { State } from './State.Model';


export class LocalGovernmentArea extends Model<InferAttributes<LocalGovernmentArea>, InferCreationAttributes<LocalGovernmentArea>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare districts: NonAttribute<District[]>;
    declare stateId: ForeignKey<State['id']>;
    declare state: NonAttribute<State>;
}

// Initialize the model
LocalGovernmentArea.init(
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
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: State, // The model that this foreign key references
        key: 'id',
      },
      onDelete: 'CASCADE', // Adjust based on your needs
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'LocalGovernmentArea', // Model name
    tableName: 'LocalGovernmentAreas', // Custom table name if you don't want the default (pluralized model name)
    timestamps: false, // Disable timestamps if not needed
  }
);


LocalGovernmentArea.hasMany(District, {
  foreignKey: 'localGovernmentAreaId',

});
