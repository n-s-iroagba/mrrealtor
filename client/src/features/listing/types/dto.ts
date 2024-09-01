

export interface BuildingDTO {
  id: number;
  commercialType: string;
  price: number;
  numberOfRooms: number;
  propertyType: string;
  state: string;
  buildingType: string;
  localGovernmentArea: string;
  district: string;
  firstLineAddress: string;
  paid: boolean | null;
  listingDate: Date;
  bestAmenity: string;
  otherAmenity: string;
  images: string[];
  salesPitch: string;
  interiorDesignFeatures: string[];
  posterId:number
}
