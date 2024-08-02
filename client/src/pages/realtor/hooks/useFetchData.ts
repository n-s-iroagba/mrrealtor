import { useState, useEffect } from 'react';
import { State, LocalGovernmentArea, District, BuildingSearchOptions } from '../../../types/dtos';
import { BuildingDTO } from '../../../features/listing/types/dto';
import { apartmentTypesUrl, bestAmmenitiesUrl, districtsUrl, localGovernmentAreaUrl, otherAmmenitiesUrl, searchBuildingsUrl, statesUrl } from '../../../constants/urls';

// Custom Hook for fetching states
const useFetchStates = () => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(statesUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setStates(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  return { states, loading, error };
};

// Custom Hook for fetching local government areas
const useFetchLocalGovernmentAreas = () => {
  const [localGovernmentAreas, setLocalGovernmentAreas] = useState<LocalGovernmentArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocalGovernmentAreas = async () => {
      try {
        const response = await fetch(localGovernmentAreaUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setLocalGovernmentAreas(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalGovernmentAreas();
  }, []);

  return { localGovernmentAreas, setLocalGovernmentAreas, loading, error };
};

// Custom Hook for fetching districts
const useFetchDistricts = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch(districtsUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setDistricts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  return { districts,setDistricts, loading, error };
};

// Custom Hook for fetching districts
const useFetchApartmentTypes = () => {
  const [apartmentTypes, setApartmentTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartmentTypes = async () => {
      try {
        const response = await fetch(apartmentTypesUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setApartmentTypes(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApartmentTypes();
  }, []);

  return { apartmentTypes, loading, error };
};

const useFetchOtherAmenities = () => {
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOtherAmenities = async () => {
      try {
        const response = await fetch(otherAmmenitiesUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setOtherAmenities(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOtherAmenities();
  }, []);

  return { otherAmenities, loading, error };
};

const useFetchBestAmenities = () => {
  const [bestAmenities, setBestAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestAmenities = async () => {
      try {
        const response = await fetch(bestAmmenitiesUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setBestAmenities(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBestAmenities();
  }, []);

  return { bestAmenities, loading, error };
};

// Custom Hook for fetching buildings based on search options
const useFetchBuildings = (searchOptions: BuildingSearchOptions) => {
  const [assets, setAssets] = useState<BuildingDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch(searchBuildingsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(searchOptions)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAssets(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, [searchOptions]);

  return { assets, loading, error };
};

export { useFetchStates, useFetchLocalGovernmentAreas, useFetchDistricts, useFetchBuildings,useFetchApartmentTypes,useFetchBestAmenities,useFetchOtherAmenities};
