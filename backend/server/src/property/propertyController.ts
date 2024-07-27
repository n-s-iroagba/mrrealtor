import { Request, Response } from 'express';
import { Property } from './Property.Model';
import { Op } from 'sequelize';
import upload from '../multer/upload';


const uploadFiles = upload.array('images', 10); // Adjust the maximum number of files

export const createProperty = async (req: Request, res: Response) => {
  uploadFiles(req, res, async (err:any) => {
    if (err) {
      console.error('Error uploading files:', err);
      return res.status(500).json({ message: 'Error uploading files' });
    }

    try {
      const { commercialType, price, state, propertyType, localGovernment, district, firstLineAddress, listingDate, posterId } = req.body;

   
      const files = req.files as Express.Multer.File[];
      const tempImages = files?.map(file => file.path) || [];
      const images =  JSON.stringify(tempImages)

      const property = await Property.create({
        commercialType,
        price,
        state,
        propertyType,
        localGovernment,
        district,
        firstLineAddress,
        listingDate,
        posterId,
        images
  
      });

      return res.status(201).json(property);
    } catch (err) {
      console.error('Error creating property:', err);
      return res.status(500).json({ message: 'Error creating property' });
    }
  });
};


export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.findAll();
    return res.status(200).json(properties);
  } catch (err) {
    console.error('Error retrieving properties:', err);
    return res.status(500).json({ message: 'Error retrieving properties' });
  }
};


export const getAllPropertiesForARealtor = async (req: Request, res: Response) => {
    const {realtorId} = req.params
    try {
      const properties = await Property.findAll({where: {posterId:realtorId}});
      return res.status(200).json(properties);
    } catch (err) {
      console.error('Error retrieving properties:', err);
      return res.status(500).json({ message: 'Error retrieving properties' });
    }
  };

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);
    if (property) {
      return res.status(200).json(property);
    } else {
      return res.status(404).json({ message: 'Property not found' });
    }
  } catch (err) {
    console.error('Error retrieving property:', err);
    return res.status(500).json({ message: 'Error retrieving property' });
  }
};


export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Property.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedProperty = await Property.findByPk(id);
      return res.status(200).json(updatedProperty);
    } else {
      return res.status(404).json({ message: 'Property not found' });
    }
  } catch (err) {
    console.error('Error updating property:', err);
    return res.status(500).json({ message: 'Error updating property' });
  }
};


export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Property.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Property not found' });
    }
  } catch (err) {
    console.error('Error deleting property:', err);
    return res.status(500).json({ message: 'Error deleting property' });
  }
};

const DEFAULT_VALUES = {
  priceRange: [0, 1000000],  // Example default price range
  state: 'DefaultState',
  propertyType: 'DefaultType',
  localGovernment: 'DefaultLocalGov',
  district: 'DefaultSubLocalGov',
  firstLineAddress: '',
};

export const searchAllProperties = async (req: Request, res: Response) => {
  try {
    // Extract query parameters with defaults
    const {
      minPrice,
      maxPrice,
      state,
      propertyType,
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
        propertyType: propertyType || DEFAULT_VALUES.propertyType,
        localGovernment: localGovernment || DEFAULT_VALUES.localGovernment,
        district: district || DEFAULT_VALUES.district,
        firstLineAddress: {
          [Op.iLike]: `%${firstLineAddress || DEFAULT_VALUES.firstLineAddress}%`,
        },
      },
      order: [['listingDate', 'DESC']],  // Optional: Sort by listing date
    };

    // Fetch properties based on query
    const properties = await Property.findAll(query);

    return res.status(200).json(properties);
  } catch (err) {
    console.error('Error retrieving properties:', err);
    return res.status(500).json({ message: 'Error retrieving properties' });
  }
};
