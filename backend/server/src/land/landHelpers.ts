import { Realtor } from "../realtor/Realtor.Model";
import { Land } from "./Land.Model";


export async function getLandByRealtor(realtorId: number) {
    const properties = await Land.findAll({
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