import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../config/orm_setup';
import { NonAttribute } from 'sequelize';
import { ForeignKey } from 'sequelize';
import { Chat } from './Chat.Model';


export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  declare id: CreationOptional<number>;
  declare senderId: number;
  declare reciepientId: number;
  declare message: string;
  declare timeStamp: Date;
  declare chatId : ForeignKey<Chat['id']>
  declare seen:boolean|null;
}
// Message.belongsTo(Chat,
//   {
//     foreignKey: 'chatId'
//   })
Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reciepientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,  // Assuming message is a string, change if different
      allowNull: false,
    },
    timeStamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    seen: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'message',
    tableName: 'messages',  // Ensure the table name is lowercase
  }
);
