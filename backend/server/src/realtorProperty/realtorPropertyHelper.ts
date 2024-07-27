import { Property } from "../property/Property.Model";
import { RealtorProperty } from "./RealtorProperty.Model";

async function getPropertiesByRealtor(interestedPartyId: number) {
  const properties = await Property.findAll({
    include: {
      model: RealtorProperty,
      where: { id: interestedPartyId },
      through: { attributes: [] } 
    }
  });
  return properties;
}

