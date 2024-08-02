export type State = {
    id:number;
    name:string;
}

export type LocalGovernmentArea={
    id:number;
    name:string;
    stateId: number;
}
export type District={
    id:number;
    name:string;
    localGovernmentAreaId: number;
}

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
