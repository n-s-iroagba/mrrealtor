import { customError } from "../utils/utils";
import { Message } from "./Message.Model";


export const saveMessage = async (senderId: number, recipientId: number, message: string)=> {
    try{
   await Message.create({ senderId, recipientId, message,timeStamp:new Date() });
   }catch(err){
       console.error(err);
       throw err
   }
}

export const getOneOnOneMessages = async (userId1: string, userId2: string): Promise<Message[]> => {
  try{
  return await Message.findAll({
    where: [
      { senderId: userId1, recipientId: userId2 },
      { senderId: userId2, recipientId: userId1 }
    ],
    order: [['timestamp', 'ASC']] 
  })
  }catch(err){
      console.error(err);
      throw customError('Error retrieving messages', 500)
  }

};

export const getMessages = async (userId: string): Promise<Message[]> => {
    try{
    return await Message.findAll({
      where: [
        { senderId: userId},
        { recipientId: userId}
      ],
      order: [['timestamp', 'ASC']] 
    })
    }catch(err){
        console.error(err);
        throw customError('Error retrieving messages', 500)
    }
 };