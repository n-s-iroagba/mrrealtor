import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey
  } from 'sequelize';
  import sequelize from '../config/orm_setup';
  import { Realtor } from '../realtor/Realtor.Model';
  import { Property } from '../property/Property.Model';
  import { Land } from '../land/Land.Model';
  
  export class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>> {
    declare id: CreationOptional<number>;
    declare message: string;
    declare type: 'appointment' | 'like';
    declare isRead: boolean;
    declare recipientId: ForeignKey<Realtor['id']>;
    declare relatedPropertyId: ForeignKey<Property['id']> | null;
    declare relatedLandId: ForeignKey<Land['id']> | null;
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
        relatedPropertyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        relatedLandId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt:{
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
  Notification.belongsTo(Property, { foreignKey: 'relatedPropertyId' });
  Notification.belongsTo(Land, { foreignKey: 'relatedLandId' });
  
  export default Notification;
  