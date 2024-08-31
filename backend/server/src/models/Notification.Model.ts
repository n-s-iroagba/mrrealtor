import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute
  } from 'sequelize';
  import sequelize from '../config/orm_setup';
import Building from './Building.Model';
import { Land } from './Land.Model';
import { Realtor } from './Realtor.Model';

  
  export class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>> {
    declare id: CreationOptional<number>;
    declare message: string;
    declare type: 'appointment' | 'like';
    declare isRead: boolean;
    declare recipientId: ForeignKey<Realtor['id']>;
    declare relatedBuildingId: ForeignKey<Building['id']> | null;
    declare relatedLandId: ForeignKey<Land['id']> | null;
    declare relatedBuilding: NonAttribute<Building | null>;
    declare relatedLand: NonAttribute <Land | null>;
    declare createdAt: CreationOptional<Date>;
  

  }
  
  Notification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('appointment', 'like'),
            allowNull: false,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        recipientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        relatedBuildingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        relatedLandId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
      sequelize,
      modelName: 'Notification',
      tableName: 'notifications',
      timestamps: true,
    }
  );
  
  Notification.belongsTo(Realtor, { foreignKey: 'recipientId' });
  Notification.belongsTo(Building, { foreignKey: 'relatedBuildingId' });
  Notification.belongsTo(Land, { foreignKey: 'relatedLandId' });
  
  export default Notification;
  