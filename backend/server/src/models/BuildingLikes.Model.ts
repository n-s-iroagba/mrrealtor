import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute, DataTypes } from 'sequelize';
import sequelize from '../config/orm_setup';
import Building from './Building.Model';
import { Realtor } from './Realtor.Model';


export class BuildingLikes extends Model<InferAttributes<BuildingLikes>, InferCreationAttributes<BuildingLikes>> {
  declare id: CreationOptional<number>;
  declare likedById: ForeignKey<Realtor['id']>;
  declare buildingId: ForeignKey<Building['id']>;
  declare likedBy: NonAttribute<Realtor>
}

BuildingLikes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true, 
    },
    likedById: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'Realtor',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    buildingId: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'Building',  // Reference the correct table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  { sequelize, modelName: 'BuildingLikes' }
);

// BuildingLikes.belongsTo(Realtor, { as: 'likedBy', foreignKey: 'likedById' });
// BuildingLikes.belongsTo(Building, { as: 'building', foreignKey: 'buildingId' });

