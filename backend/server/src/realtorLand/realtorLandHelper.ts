
import { RealtorLand } from './RealtorLand.Model';
import { Land } from '../land/Land.Model';

export async function getLandByRealtor(interestedPartyId: number) {
  const properties = await Land.findAll({
    include: {
      model: RealtorLand,
      where: { id: interestedPartyId },
      through: { attributes: [] }
    }
  });
  return properties;
}


