import { Request, Response } from "express";
import { Building } from "./Building.Model";
import { Op } from "sequelize";
import upload from "../multer/upload";
import { District } from "../location/District.Model";
import { LocalGovernmentArea } from "../location/LocalGovernment.Model";
import { State } from "../location/State.Model";
import { BuildingSearchOptions } from "../types/dtos";

const uploadFiles = upload.array("images", 10); // Adjust the maximum number of files

export const createBuilding = async (req: Request, res: Response) => {
  uploadFiles(req, res, async (err: any) => {
    if (err) {
      console.error("Error uploading files:", err);
      return res.status(500).json({ message: "Error uploading files" });
    }

    try {
      const {
        commercialType,
        price,
        buildingType,
        firstLineAddress,
        posterId,
        salesPitch,
        numberOfRooms,
        interiorDesignFeatures,
        bestAmmenity,
        otherAmmenity,
        location
      } = req.body;

      const files = req.files as Express.Multer.File[];
      const tempImages = files?.map((file) => file.path) || [];
      const images = JSON.stringify(tempImages);
      let localGovernmentArea:LocalGovernmentArea|null
      let state:State|null

      
      let district = await District.findOne({where:{name: location.district}})
      if(!district){
        localGovernmentArea = await LocalGovernmentArea.findOne({where:{name: location.localGovernmentArea}})
        if(!localGovernmentArea){
          state = await State.findOne({where:{name: location.state}})
          if(!state){
            state = await State.create({name: location.state})
          }
          localGovernmentArea = await LocalGovernmentArea.create({name: location.localGovernmentArea,stateId: state.id})
        }
         
       district = await District.create({name: location.district,localGovernmentAreaId:localGovernmentArea.id})     
       }
   
   
      


      const building = await Building.create({
        commercialType,
        price,
        buildingType,
        districtId:district.id,
        firstLineAddress,
        listingDate:new Date(),
        posterId,
        images,
        salesPitch,
        numberOfRooms,
        interiorDesignFeatures,
        bestAmmenity,
        otherAmmenity,
      });

      return res.status(201).json(building);
    } catch (err) {
      console.error("Error creating Building:", err);
      return res.status(500).json({ message: "Error creating Building" });
    }
  });
};

export const getAllBuildings = async (req: Request, res: Response) => {
  try {
    const properties = await Building.findAll();
    return res.status(200).json(properties);
  } catch (err) {
    console.error("Error retrieving properties:", err);
    return res.status(500).json({ message: "Error retrieving properties" });
  }
};

export const getAllBuildingsForARealtor = async (
  req: Request,
  res: Response
) => {
  const { realtorId } = req.params;
  try {
    const properties = await Building.findAll({
      where: { posterId: realtorId },
    });
    return res.status(200).json(properties);
  } catch (err) {
    console.error("Error retrieving properties:", err);
    return res.status(500).json({ message: "Error retrieving properties" });
  }
};

export const getBuildingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const building = await Building.findByPk(id);
    if (Building) {
      return res.status(200).json(building);
    } else {
      return res.status(404).json({ message: "Building not found" });
    }
  } catch (err) {
    console.error("Error retrieving Building:", err);
    return res.status(500).json({ message: "Error retrieving Building" });
  }
};

export const updateBuilding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Building.update(req.body, {
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

const DEFAULT_VALUES = {
  priceRange: [0, 1000000], // Example default price range
  state: "DefaultState",
  BuildingType: "DefaultType",
  localGovernment: "DefaultLocalGov",
  district: "DefaultSubLocalGov",
  firstLineAddress: "",
};

export const searchAllBuildings = async (req: Request, res: Response) => {
    const {
      commercialType,
      apartmentType,
      price,
      bestAmmenity,
      otherAmmenity,
      localGovernmentArea,
      district,
      state,
    } = req.query as unknown as BuildingSearchOptions
  
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
          whereClause.price = { [Op.gte]: price.low };
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
  
      // Eager loading associations and filtering based on state, local government area, and district
      const includeClause: any[] = [
        {
          model: District,
          as: 'district',
          where: {},
          include: [
            {
              model: LocalGovernmentArea,
              as: 'localGovernmentArea',
              where: {},
              include: [
                {
                  model: State,
                  as: 'state',
                  where: {},
                },
              ],
            },
          ],
        },
      ];
  
      if (state) {
        includeClause[0].include[0].include[0].where.id = state.id;
      }
  
      if (localGovernmentArea) {
        includeClause[0].include[0].where.id = localGovernmentArea.id;
      }
  
      if (district) {
        includeClause[0].where.id = district.id;
      }
  
      const buildings = await Building.findAll({
        where: whereClause,
        include: includeClause,
      });
  
      res.json(buildings);
    } catch (error:any) {
      console.error(error);
      res.status(error.status||500).send('Error in searchAllBuildings');
    }
  }

