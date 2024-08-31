import Building from "./Building.Model";
import { RealtorBuilding } from "./RealtorBuilding.Model";

export async function getBuildingsOfInterest(interestedPartyId: number) {
  const properties = await Building.findAll({
    include: {
      model: RealtorBuilding,
      where: { id: interestedPartyId },
      through: { attributes: [] } 
    }
  });
  return properties;
}

