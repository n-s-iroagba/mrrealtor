import { Request, Response } from 'express';
import { BuildingLikes } from '../models/BuildingLikes.Model';
import { Realtor } from '../models/Realtor.Model';
import Building from '../models/Building.Model';
import { emitBuildingLiked } from '../sockets/socket';

export const likeBuilding = async (req: Request, res: Response) => {
  const { likedById, buildingId } = req.body;

  try {
    const likedBuilding = await Building.findByPk(buildingId);
    if (!likedBuilding) {
      return res.status(404).json({ message: 'Building not found' });
    }


    
    const existingLike = await BuildingLikes.findOne({ where: { likedById, buildingId } });
    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this building' });
    }

    await BuildingLikes.create({ likedById, buildingId });

    likedBuilding.likesCount = (likedBuilding.likesCount || 0) + 1;
    await likedBuilding.save();

    const io = req.app.get('io'); // Assuming you set the io instance on the app object
    emitBuildingLiked(io, likedBuilding.posterId, likedById);
    return res.status(201).json({message:'building liked'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while liking the building' });
  }
};

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