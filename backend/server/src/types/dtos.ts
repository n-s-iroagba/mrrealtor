
export type BuildingSearchOptions = {
    
    commercialType: string;
    apartmentType: string;
    price: {
      high: number | null;
      low: number | null;
    };
    bestAmmenity: string | null;
    otherAmmenity: string | null;
    localGovernmentArea: LocalGovernmentArea | null;
    district: District | null;
    state: State | null;
  }
