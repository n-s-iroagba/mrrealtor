import { Request, Response } from 'express';
import { Land } from './Land.Model';
import { Op } from 'sequelize';
import upload from '../multer/upload';


const uploadFiles = upload.array('images', 10); // Adjust the maximum number of files

export const createLand = async (req: Request, res: Response) => {
  uploadFiles(req, res, async (err:any) => {
    if (err) {
      console.error('Error uploading files:', err);
      return res.status(500).json({ message: 'Error uploading files' });
    }

    try {
      const { commercialType, price, state, LandType, localGovernment, district, firstLineAddress, listingDate, posterId } = req.body;

   
      const files = req.files as Express.Multer.File[];
      const tempImages = files?.map(file => file.path) || [];
      const images =  JSON.stringify(tempImages)

      const land = await Land.create({
        commercialType,
        price,
        state,
        LandType,
        localGovernment,
        district,
        firstLineAddress,
        listingDate,
        posterId,
       images
      });

      return res.status(201).json(land);
    } catch (err) {
      console.error('Error creating Land:', err);
      return res.status(500).json({ message: 'Error creating Land' });
    }
  });
};


export const getAllLands = async (req: Request, res: Response) => {
  try {
    const lands = await Land.findAll();
    return res.status(200).json(lands);
  } catch (err) {
    console.error('Error retrieving lands:', err);
    return res.status(500).json({ message: 'Error retrieving lands' });
  }
};


export const getAllLandsForARealtor = async (req: Request, res: Response) => {
    const {posterId} = req.params
    try {
      const lands = await Land.findAll({where: {posterId:posterId}});
      return res.status(200).json(lands);
    } catch (err) {
      console.error('Error retrieving lands:', err);
      return res.status(500).json({ message: 'Error retrieving lands' });
    }
  };

export const getLandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const land = await Land.findByPk(id);
    if (Land) {
      return res.status(200).json(Land);
    } else {
      return res.status(404).json({ message: 'Land not found' });
    }
  } catch (err) {
    console.error('Error retrieving Land:', err);
    return res.status(500).json({ message: 'Error retrieving Land' });
  }
};


export const updateLand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Land.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedLand = await Land.findByPk(id);
      return res.status(200).json(updatedLand);
    } else {
      return res.status(404).json({ message: 'Land not found' });
    }
  } catch (err) {
    console.error('Error updating Land:', err);
    return res.status(500).json({ message: 'Error updating Land' });
  }
};


export const deleteLand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Land.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Land not found' });
    }
  } catch (err) {
    console.error('Error deleting Land:', err);
    return res.status(500).json({ message: 'Error deleting Land' });
  }
};

const DEFAULT_VALUES = {
  priceRange: [0, 1000000],  // Example default price range
  state: 'DefaultState',
  LandType: 'DefaultType',
  localGovernment: 'DefaultLocalGov',
  district: 'DefaultSubLocalGov',
  firstLineAddress: '',
};

export const searchAllLands = async (req: Request, res: Response) => {
  try {
    // Extract query parameters with defaults
    const {
      minPrice,
      maxPrice,
      state,
      LandType,
      localGovernment,
      district,
      firstLineAddress,
    } = req.query;

    // Build the query object
    const query: any = {
      where: {
        price: {
          [Op.between]: [
            minPrice ? Number(minPrice) : DEFAULT_VALUES.priceRange[0],
            maxPrice ? Number(maxPrice) : DEFAULT_VALUES.priceRange[1],
          ],
        },
        state: state || DEFAULT_VALUES.state,
        LandType: LandType || DEFAULT_VALUES.LandType,
        localGovernment: localGovernment || DEFAULT_VALUES.localGovernment,
        district: district || DEFAULT_VALUES.district,
        firstLineAddress: {
          [Op.iLike]: `%${firstLineAddress || DEFAULT_VALUES.firstLineAddress}%`,
        },
      },
      order: [['listingDate', 'DESC']],  // Optional: Sort by listing date
    };

    // Fetch lands based on query
    const lands = await Land.findAll(query);

    return res.status(200).json(lands);
  } catch (err) {
    console.error('Error retrieving lands:', err);
    return res.status(500).json({ message: 'Error retrieving lands' });
  }
};
