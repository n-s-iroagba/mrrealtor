export type ListBuildingProps = {
  commercialType: 'rental' | 'sale';
  price: number;
  numberOfRooms: number;
  buildingType: string;
  location: {
    district: string;
    localGovernmentArea: string; 
    state: string;
    firstLineAddress: string;
  };
  listingDate: Date;
  bestAmenity: string;
  otherAmenity: string;
  salesPitch: string;
}

export type UpdateBuildingProps = {
  commercialType: 'rental' | 'sale';
  price: number;
  numberOfRooms: number;
  buildingType: string;
  location: {
    district: string;
    localGovernmentArea: string; 
    state: string;
    firstLineAddress: string;
  };
  listingDate: Date;
  bestAmenity: string;
  otherAmenity: string;
  salesPitch: string;
}
