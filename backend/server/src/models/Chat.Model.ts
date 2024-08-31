import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  DataTypes
} from 'sequelize';
import sequelize from '../config/orm_setup'; // Adjust import based on your project structure
import { Land } from './Land.Model';
import { Message } from './Message.Model';
import { Realtor } from './Realtor.Model';
import Building from './Building.Model';


export class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare id: CreationOptional<number>;
  declare clientId: ForeignKey<Realtor['id']>;
  declare realtorId: ForeignKey<Realtor['id']>;
  declare propertyInQuestionId: ForeignKey<Land['id'] | Building['id']>;
  declare propertyType: 'land' | 'building';

  declare client: NonAttribute<Realtor>;
  declare realtor: NonAttribute<Realtor>;
  declare messages: NonAttribute<Message[]>;
  declare propertyInQuestion: NonAttribute<Land | Building>;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    realtorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    propertyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'chat',
    tableName: 'chat', 
  }
);

Chat.hasMany(Message, {
  foreignKey: 'chatId'
});
Chat.belongsTo(Realtor, { as: 'client', foreignKey: 'clientId' });
Chat.belongsTo(Realtor, { as: 'realtor', foreignKey: 'realtorId' });
Chat.belongsTo(Land, {
  foreignKey: 'propertyInQuestionId',
});
Chat.belongsTo(Building, {
  foreignKey: 'propertyInQuestionId',
});
