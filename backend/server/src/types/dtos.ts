

export type BuildingSearchOptions = {
    
    commercialType: string;
    apartmentType: string;
    price: {
      high: number | null;
      low: number | null;
    };
    bestAmmenity: string | null;
    otherAmmenity: string | null;
    localGovernmentAreaId: number | null;
    districtId: number | null;
    stateId: | null;
  }
