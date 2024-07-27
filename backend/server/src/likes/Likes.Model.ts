import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute, DataTypes } from 'sequelize';
import sequelize from '../config/orm_setup';
import { Realtor } from '../realtor/Realtor.Model';
import { Property } from '../property/Property.Model';

export class Likes extends Model<InferAttributes<Likes>, InferCreationAttributes<Likes>> {
  declare id: CreationOptional<number>;
  declare message: string;
  declare read: boolean | null;
  declare likedById: ForeignKey<Realtor['id']>;
  declare likedBy: NonAttribute<Realtor>;
  declare postedById: ForeignKey<Realtor['id']>;
  declare postedBy: NonAttribute<Realtor>;
  declare property: NonAttribute<Property>
  declare propertyId: ForeignKey<Property['id']>;
}

Likes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true, 
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likedById: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'realtors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    propertyId: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'realtors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    postedById: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'realtors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  { sequelize, modelName: 'Likes' }
);


Likes.belongsTo(Realtor, { as: 'likedBy', foreignKey: 'likedById' });
Likes.belongsTo(Realtor, { as: 'postedBy', foreignKey: 'postedById' });
Likes.belongsTo(Property, { as: 'property', foreignKey: 'propertyId' });
