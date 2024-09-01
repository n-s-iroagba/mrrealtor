export interface IBuildingCreation {
  commercialType: 'rental' | 'sale';
  price: number;
  numberOfRooms: number;
  buildingType: string;
  location: {
    district: string;
    localGovernmentArea: string; // Ensure ordering matches
    state: string; // Ensure ordering matches
    firstLineAddress: string;
  };
  listingDate: Date;
  bestAmenity: string;
  otherAmenity: string;
  salesPitch: string;
}

  