import { getNigeriaStates } from "geo-ng";

export function getStateCodeByName(stateName: string): string | undefined {
    const states = getNigeriaStates().filter((state) => ({
      name: state.name,
      code: state.code,
    }));
    const state = states.find((state) => state.name === stateName);
    return state ? state.code : undefined;
  }