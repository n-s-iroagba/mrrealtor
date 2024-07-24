import { customError } from "../utils/utils";
import { Likes } from "./Likes.Model";


export const saveLikes = async (postedById: number, likedById: number,propertyId:number)=> {
  const message = ''
    try{
   await Likes.create({ postedById:postedById, likedById:likedById, message,propertyId:propertyId });
   }catch(err){
       console.error(err);
       throw err
   }
}




