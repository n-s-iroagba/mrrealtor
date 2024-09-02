import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import GroupedDropdown from "../../features/listing/components/GroupedDropdown";
import './styles/pages.realtor.css';
import { stateKey } from "../../constants/tokenKeys";
import { useParams } from "react-router-dom";
import SearchListingCard from "../../features/listing/components/SearchListingCard";
import { useFetchStates, useFetchLocalGovernmentAreas, useFetchDistricts, useFetchBuildings, useFetchApartmentTypes, useFetchBestAmenities, useFetchOtherAmenities } from "./hooks/useFetchData";
import LoadingSpinner from "../../features/common/components/LoadingSpinner";
import Logo from "../../features/common/components/Logo";
import MiniFooter from "../../features/common/components/MiniFooter";
import { State, BuildingSearchOptions, District, LocalGovernmentArea } from "../../features/types/dtos";
import { commercialType } from "../../features/types/enums";
;

const BuildingSearchListing: React.FC<{id:number}> = ({id}) => {
  const { commercialPurpose } = useParams<{ commercialPurpose: string }>();
  const initialCommercialType: commercialType = commercialPurpose as commercialType;

  const unparsedState = localStorage.getItem(stateKey);
  let state: State | null = null;
  if (unparsedState) {
    state = JSON.parse(unparsedState);
  }

  const [selectedOptions, setSelectedOptions] = useState<BuildingSearchOptions>({
    commercialType: initialCommercialType,
    apartmentType: "Apartment",
    price: {
      high: null,
      low: null,
    },
    bestAmmenity: null,
    otherAmmenity: null,
    localGovernmentArea: null,
    district: null,
    state: state,
  })

  const { states, loading: statesLoading, error: statesError } = useFetchStates();
  const { localGovernmentAreas, setLocalGovernmentAreas, loading: lgasLoading, error: lgasError } = useFetchLocalGovernmentAreas();
  const { districts, setDistricts, loading: districtsLoading, error: districtsError } = useFetchDistricts();
  const { assets, loading: assetsLoading, error: assetsError } = useFetchBuildings(selectedOptions);
  const { otherAmenities, loading: otherAmenitiesLoading, error: otherAmenitiesError } = useFetchOtherAmenities();
  const { bestAmenities, loading: bestAmenitiesLoading, error: bestAmenitiesError } = useFetchBestAmenities();
  const { apartmentTypes, loading: apartmentTypesLoading, error: apartmentTypesError } = useFetchApartmentTypes();


  const handleSelect = (key: string, value: string | District) => {
    if (key in selectedOptions) {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [key]: value,
      }));
    } else if (key in selectedOptions.price) {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        price: {
          ...prevOptions.price,
          [key]: value
        }
      }));
    }
  };

  const handlePriceChange = (key: string, value: number) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      price: {
        ...prevOptions.price,
        [key]: value
      }
    }));
  };

  const handleStateChange = (value: State) => {
    setSelectedOptions({ ...selectedOptions, state: value });
    const filteredLocalGovernmentAreas = localGovernmentAreas.filter(lga => lga.stateId === value.id);
    setLocalGovernmentAreas(filteredLocalGovernmentAreas);
  };

  const handleLocalGovernmentChange = (value: LocalGovernmentArea) => {
    setSelectedOptions({ ...selectedOptions, localGovernmentArea: value });
    const filteredDistricts = districts.filter(district => district.localGovernmentAreaId === value.id);
    setDistricts(filteredDistricts);
  };

  if (statesLoading || lgasLoading || districtsLoading || assetsLoading ||bestAmenitiesLoading || apartmentTypesLoading||otherAmenitiesLoading) {
    return <LoadingSpinner />;
  }

  if (statesError || lgasError || districtsError || assetsError) {
    return <div>Error: {statesError || lgasError || districtsError || assetsError||otherAmenitiesError||bestAmenitiesError||apartmentTypesError}</div>;
  }

  return (
    <>
      <div className="full-height px-3">
        <div className="d-flex justify-content-center ">
          <Logo/>
        </div>
        <div className="line"></div>
        <h4 className="my-2">
          Showing Houses  {selectedOptions.commercialType} in {state?.name || 'Nigeria'}
        </h4>
        <div>
          <Row className="gy-3 mb-3">
            <Col>
              <GroupedDropdown
                apartmentTypes={apartmentTypes}
                handleSelect={handleSelect}
                states={states}
                localGovernmentAreas={localGovernmentAreas}
                districts={districts}
                selectedOptions={selectedOptions}
                otherAmmenities={otherAmenities}
                bestAmmenities={bestAmenities}
                handlePriceChange={handlePriceChange}
                handleChangeState={handleStateChange}
                handleChangeLocalGovernmentArea={handleLocalGovernmentChange}
              />
            </Col>
          </Row>
        </div>
        <Row className='h-100 gy-3'>
          {assets?.map((asset, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <SearchListingCard data={asset} clientId={id} />
            </Col>
          ))}
        </Row>
        <div className="d-flex spinner">
          <LoadingSpinner />
        </div>
      </div>
      <MiniFooter />
    </>
)
}
export default BuildingSearchListing;
