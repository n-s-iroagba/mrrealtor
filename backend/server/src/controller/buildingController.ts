import { Request, Response } from "express";

import { BuildingSearchOptions } from "../types/dtos";
import { Op } from "sequelize";
import Building from "../models/Building.Model";
import { District } from "../models/District.Model";
import { LocalGovernmentArea } from "../models/LocalGovernmentArea.Model";
import { State } from "../models/State.Model";
import upload from "../multer/upload";
import { BuildingLikes } from "../models/BuildingLikes.Model";
import sharp from 'sharp';
import path from 'path';

// Utility function to apply watermark
const applyWatermark = async (inputPath: string, outputPath: string, watermarkText: string) => {
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  const svgText = `
    <svg width="${width}" height="${height}">
      <text x="50%" y="50%" font-size="48" fill="white" opacity="0.5" text-anchor="middle">${watermarkText}</text>
    </svg>
  `;

  await image
    .composite([{ input: Buffer.from(svgText), gravity: 'center' }])
    .toFile(outputPath);
};





const uploadFiles = upload.array('images', 10);

export const createBuilding = async (req: Request, res: Response) => {

uploadFiles(req, res, async (err: any) => {
  if (err) {
    console.error("Error uploading files:", err);
    return res.status(500).json({ message: "Error uploading files", error: err });
  }

  try {
    const files = req.files as Express.Multer.File[];
    const watermarkedImages = [];

    for (const file of files) {
      const outputPath = `watermarked_${path.basename(file.path)}`;
      await applyWatermark(file.path, outputPath, 'Your Watermark');
      watermarkedImages.push(outputPath);
    }


  } catch (err) {
    console.error("Error applying watermark:", err);
    return res.status(500).json({ message: "Error applying watermark", error: err });
  }
});
    
    try {
      const { posterId } = req.params;
      const {
        commercialType,
        price,
        buildingType,
        firstLineAddress,
        salesPitch,
        numberOfRooms,
        bestAmenity,
        otherAmenity,
        location
      } = req.body;

      if (!location?.district || !location?.localGovernmentArea || !location?.state) {
       
        return res.status(400).json({ message: "Location information is incomplete." });
      }
      console.log(req.body)
      const files = req.files as Express.Multer.File[];
      const images = JSON.stringify(files?.map((file) => file.path) || []);
      console.log('Uploaded files:', files);
      console.log('File paths:', images);

      let district = await District.findOne({ where: { name: location.district } });
      if (!district) {
        let localGovernmentArea = await LocalGovernmentArea.findOne({ where: { name: location.localGovernmentArea } });
        if (!localGovernmentArea) {
          let state = await State.findOne({ where: { name: location.state } });
          if (!state) {
            state = await State.create({ name: location.state });
          }
          localGovernmentArea = await LocalGovernmentArea.create({ name: location.localGovernmentArea, stateId: state.id });
        }
        district = await District.create({ name: location.district, localGovernmentAreaId: localGovernmentArea.id });
      }

      const building = await Building.create({
        commercialType,
        price,
        buildingType,
        districtId: district.id,
        firstLineAddress:location.firstLineAddress,
        listingDate: new Date(),
        posterId: Number(posterId),
        images,
        salesPitch,
        numberOfRooms,
        bestAmenity,
        otherAmenity,
      });

      return res.status(201).json(building);
    } catch (err) {
      console.error("Error creating Building:", err);
      return res.status(500).json({ message: "Error creating Building", error: err });
    }
  }


const countBuildingLikes = async (buildingId: number) => {
  return await BuildingLikes.count({ where: { buildingId } });
};

export const getAllBuildings = async (req: Request, res: Response) => {
  try {
    const properties = await Building.findAll();
    const propertiesWithLikes = await Promise.all(
      properties.map(async (property) => ({
        ...property.get(),
        likes: await countBuildingLikes(property.id),
      }))
    );
    return res.status(200).json(propertiesWithLikes);
  } catch (err) {
    console.error("Error retrieving properties:", err);
    return res.status(500).json({ message: "Error retrieving properties" });
  }
};

export const getBuildingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const building = await Building.findByPk(id);
    if (building) {
      const likes = await countBuildingLikes(building.id);
      return res.status(200).json({ ...building.get(), likes });
    } else {
      return res.status(404).json({ message: "Building not found" });
    }
  } catch (err) {
    console.error("Error retrieving Building:", err);
    return res.status(500).json({ message: "Error retrieving Building" });
  }
};

export const getAllBuildingsForARealtor = async (req: Request, res: Response) => {
  const { realtorId } = req.params;
  try {
    const properties = await Building.findAll({ where: { posterId: realtorId } });
    const propertiesWithLikes = await Promise.all(
      properties.map(async (property) => ({
        ...property.get(),
        likes: await countBuildingLikes(property.id),
      }))
    );
    return res.status(200).json(propertiesWithLikes);
  } catch (err) {
    console.error("Error retrieving properties:", err);
    return res.status(500).json({ message: "Error retrieving properties" });
  }
};

export const getAllBuildingsRentedByRealtor = async (req: Request, res: Response) => {
  const { realtorId } = req.params;
  try {
    const properties = await Building.findAll({
      where: {
        posterId: realtorId,
        commercialType: 'rental',
        paid: true,
      },
    });
    const propertiesWithLikes = await Promise.all(
      properties.map(async (property) => ({
        ...property.get(),
        likes: await countBuildingLikes(property.id),
      }))
    );
    return res.status(200).json(propertiesWithLikes);
  } catch (err) {
    console.error("Error retrieving properties:", err);
    return res.status(500).json({ message: "Error retrieving properties" });
  }
};

export const getAllBuildingsSoldByRealtor = async (req: Request, res: Response) => {
  const { realtorId } = req.params;
  try {
    const properties = await Building.findAll({
      where: {
        posterId: realtorId,
        commercialType: 'sale',
        paid: true,
      },
    });
    const propertiesWithLikes = await Promise.all(
      properties.map(async (property) => ({
        ...property.get(),
        likes: await countBuildingLikes(property.id),
      }))
    );
    return res.status(200).json(propertiesWithLikes);
  } catch (err) {
    console.error("Error retrieving properties:", err);
    return res.status(500).json({ message: "Error retrieving properties" });
  }
};

export const getAllBuildingsToBeRentedByRealtor = async (req: Request, res: Response) => {
  const { realtorId } = req.params;
  try {
    const properties = await Building.findAll({
      where: {
        posterId: realtorId,
        commercialType: 'rental',
        paid: false,
      },
    });
    const propertiesWithLikes = await Promise.all(
      properties.map(async (property) => ({
        ...property.get(),
        likes: await countBuildingLikes(property.id),
      }))
    );
    return res.status(200).json(propertiesWithLikes);
  } catch (err) {
    console.error("Error retrieving properties:", err);
    return res.status(500).json({ message: "Error retrieving properties" });
  }
};

export const getAllBuildingsToBeSoldByRealtor = async (req: Request, res: Response) => {
  const { realtorId } = req.params;
  try {
    const properties = await Building.findAll({
      where: {
        posterId: realtorId,
        commercialType: 'sale',
        paid: false,
      },
    });
    const propertiesWithLikes = await Promise.all(
      properties.map(async (property) => ({
        ...property.get(),
        likes: await countBuildingLikes(property.id),
      }))
    );
    return res.status(200).json(propertiesWithLikes);
  } catch (err) {
    console.error("Error retrieving properties:", err);
    return res.status(500).json({ message: "Error retrieving properties" });
  }
};



export const searchAllBuildings = async (req: Request, res: Response) => {
  const {
    commercialType,
    apartmentType,
    price,
    bestAmmenity,
    otherAmmenity,
    localGovernmentAreaId,
    districtId,
    stateId,
  } = req.body as BuildingSearchOptions;

  try {
    const whereClause: any = {};

    if (commercialType) {
      whereClause.commercialType = commercialType;
    }

    if (apartmentType) {
      whereClause.buildingType = apartmentType;
    }

    if (price) {
      if (price.low !== null) {
        whereClause.price = { ...whereClause.price, [Op.gte]: price.low };
      }
      if (price.high !== null) {
        whereClause.price = { ...whereClause.price, [Op.lte]: price.high };
      }
    }

    if (bestAmmenity) {
      whereClause.bestAmmenity = bestAmmenity;
    }

    if (otherAmmenity) {
      whereClause.otherAmmenity = otherAmmenity;
    }

    if (districtId) {
      whereClause.districtId = districtId;
    }

    if (localGovernmentAreaId) {
      whereClause.localGovernmentAreaId = localGovernmentAreaId;
    }

    if (stateId) {
      whereClause.stateId = stateId;
    }

    const buildings = await Building.findAll({
      where: whereClause,
    });

    const buildingsWithLikes = await Promise.all(
      buildings.map(async (building) => ({
        ...building.get(),
        likes: await BuildingLikes.count({ where: { buildingId: building.id } }),
      }))
    );

    res.json(buildingsWithLikes);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).send('Error in searchAllBuildings');
  }
};


  export const rentBuilding = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

        const property = await Building.findOne({where:{
          id,
          commercialType:'rental',
          paid: false
        }});
        if (!property) {
          return res.status(404).json({ message: "Building not found" });
        }
        property.paid = true;
        await property.save();
        return res.status(200).json(property);
      } catch (err) {
        console.error("Error retrieving property:", err);
        return res.status(500).json({ message: "Error retrieving property" });
      }
    };
     

    export const sellBuilding = async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
  
          const property = await Building.findOne({where:{
            id,
            commercialType:'sale',
            paid: false
          }});
          if (!property) {
            return res.status(404).json({ message: "Building not found" });
          }
          property.paid = true;
          await property.save();
          return res.status(200).json(property);
        } catch (err) {
          console.error("Error retrieving property:", err);
          return res.status(500).json({ message: "Error retrieving property" });
        }
      };

export const updateBuilding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];
    const tempImages = files?.map((file) => file.path) || [];
    const images = JSON.stringify(tempImages);
    const updateData = {...req.body,images: images}
    const [updated] = await Building.update(updateData, {
      where: { id },
    });
    if (updated) {
      const updatedBuilding = await Building.findByPk(id);
      return res.status(200).json(updatedBuilding);
    } else {
      return res.status(404).json({ message: "Building not found" });
    }
  } catch (err) {
    console.error("Error updating Building:", err);
    return res.status(500).json({ message: "Error updating Building" });
  }
};

export const deleteBuilding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Building.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Building not found" });
    }
  } catch (err) {
    console.error("Error deleting Building:", err);
    return res.status(500).json({ message: "Error deleting Building" });
  }
};


