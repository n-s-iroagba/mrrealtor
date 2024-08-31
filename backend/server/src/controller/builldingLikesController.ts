import { Request, Response } from 'express';
import { BuildingLikes } from '../models/BuildingLikes.Model';
import { Realtor } from '../models/Realtor.Model';



export const likeBuilding = async (req: Request, res: Response)=>{
  try {
    const { buildingId } = req.params;
   const buildingLikes =  await BuildingLikes.create({
      buildingId:Number(buildingId),
      likedById: req.body.likedById,
   })
    res.status(200).json(buildingLikes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to like building' });
  }
}


export const getRealtorLikes = async (req:Request, res:Response) => {
 try{
   const { realtorId } = req.params;
   const buildingLikes = await BuildingLikes.findAll({where: {likedById: realtorId}});
   res.status(200).json(buildingLikes);
 
} catch (error) {
  res.status(500).json({ error: 'Failed to like building' });
}

}


export const getRealtorsWhoLikedBuilding = async (req: Request, res: Response) => {
  const { buildingId } = req.params;

  try {
    const likes = await BuildingLikes.findAll({
      where: { buildingId },
      include: [{ model: Realtor, as: 'likedBy' }],
    });

    const realtors = likes.map((like) => like.likedBy);

    return res.status(200).json(realtors);
  } catch (error) {
    console.error('Error fetching realtors who liked building:', error);
    return res.status(500).json({ message: 'Error fetching realtors' });
  }
};