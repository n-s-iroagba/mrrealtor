import { Realtor } from "../realtor/Realtor.Model";
import { Property } from "./Property.Model";


export async function getPropertiesByRealtor(realtorId: number) {
    const properties = await Property.findAll({
      where: {
        posterId: realtorId,
      },
      include: [{
        model: Realtor,
        where: { id: realtorId },
        attributes: ['id', 'name'], // Adjust the attributes as needed
      }],
    });
    return properties;
  }