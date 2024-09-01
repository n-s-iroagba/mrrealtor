import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getLGAs, getLgaSubAreas, getNigeriaStates, StateCodes } from "geo-ng";

import { UpdateBuildingProps } from "../types/requestDto";
import { getData, patchFormData } from "../../common/utils/apiUtils";
import { getBuildingUrl, patchBuildingUrl } from "../../../constants/urls";
import { Button, Col, Form, Spinner } from "react-bootstrap";
import { required } from "../../common/components/required";
import ErrorMessage from "../../common/components/ErrorMessage";

const mockUpdateBuildingProps: UpdateBuildingProps = {
  commercialType: 'sale',
  price: 250000,
  numberOfRooms: 3,
  buildingType: 'apartment',
  location: {
    district: 'Downtown',
    localGovernmentArea: 'Central',
    state: 'Lagos',
    firstLineAddress: '123 Main St',
  },
  listingDate: new Date('2024-09-01'),
  bestAmenity: 'Swimming Pool',
  otherAmenity: 'Gym',
  salesPitch: 'A modern apartment in the heart of the city with top-notch amenities and easy access to shopping and dining.',
};

const UpdateBuildingForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [estateData, setEstateData] = useState<UpdateBuildingProps>(mockUpdateBuildingProps);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([{ file: null }]);
  const [stateCode, setStateCode] = useState("");
  const [subLgaOptions, setSubLgaOptions] = useState<any>([]);
  const [lgaOptions, setLgaOptions] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildingData = async () => {
        const url = `${getBuildingUrl}/${id}`
      try {
        const response = await getData(url);
        setEstateData(response.data);
        setImages(response.data.images)
        const code = getStateCodeByName(response.data.state);
        if (code) {
          const lgas = getLGAs(code as StateCodes) as string[];
          setStateCode(code);
          setLgaOptions(lgas);
          const subAreas = getLgaSubAreas(code as StateCodes, response.data.localGovernmentArea);
          setSubLgaOptions(subAreas);
        }
      } catch (error) {
        setErrorMessage("Failed to load building data");
      }
    };

    fetchBuildingData();
  }, [id]);



 
  
  const statesOption = getNigeriaStates().map((state) => state.name);
 

  function getStateCodeByName(stateName: string): string | undefined {
    const states = getNigeriaStates().filter((state) => ({
      name: state.name,
      code: state.code,
    }));
    const state = states.find((state) => state.name === stateName);
    return state ? state.code : undefined;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      setErrorMessage("Please fill out all required fields correctly.");
      return;
    }

    setValidated(true);
    setSubmitting(true);

    const formData = new FormData();


    images.forEach((image, index) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });

    try {
     
      const data = await patchFormData(`${patchBuildingUrl}/${id}`, formData);
      console.log("Form submitted successfully:", data);
      setSubmitting(false);
      setValidated(false);
      alert('Building successfully updated');
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
      setErrorMessage(error.message);
      setSubmitting(false);
    }
  };

  const handleChange = (e: any) => {
    setEstateData((prevData: any) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeState = (e: any): void => {
    const state = e.target.value;
    setEstateData((prevData: any) => ({
      ...prevData,
      state: state,
    }));
    const code = getStateCodeByName(state);

    if (code) {
      const lgas = getLGAs(code as StateCodes) as string[];
      setStateCode(code);
      setLgaOptions(lgas);
    }
  };

  const handleChangeLga = (e: any): void => {
    const lga = e.target.value;
    setEstateData((prevData: any) => ({
      ...prevData,
      localGovernmentArea: lga,
    }));
    const subAreas = getLgaSubAreas(stateCode as StateCodes, lga);
    setSubLgaOptions(subAreas);
  };

  const handleChangeSubLga = (e: any) => {
    setEstateData((prevData: any) => ({
      ...prevData,
      subLga: e.target.value,
    }));
  };

  const handleAddImage = () => {
    setImages([...images, { file: null }]);
  };

  const handleImageChange = (index: number, event: any) => {
    const newImages = [...images];
    newImages[index].file = event.target.files[0];
    setImages(newImages);
  };


  const commerceOptions = [
    { value: "Rental", label: "Rental" },
    { value: "Sale", label: "Sale" },
  ];


  return (
    <div className="form-wrapper px-5 pt-5 mx-5">
      <h3 className="text-center">Update Building</h3>
      <Form noValidate validated={validated} onSubmit={(e: any) => handleSubmit(e)}>
     
        <Form.Group>
        <Form.Label>Commercial Type {required}</Form.Label>
          <Form.Select
            onChange={(e: any) => {
              setEstateData((prevData: any) => ({
                ...prevData,
                commerceType: e.label,
              }));
            }}
            className=" bg-transparent text-dark"
          >
            <option className=" primary-background text-dark" value={""}>
              Select a commercial purpose
            </option>
            {commerceOptions.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Property Type {required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="buildingType"
            value={estateData.buildingType}
            onChange={handleChange}
            className="custom-input bg-transparent"
          />
        </Form.Group>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Number Of Rooms {required}</Form.Label>
          <Form.Control
            required
            type="number"
            name="numberOfRooms"
            value={estateData.numberOfRooms || ""}
            onChange={handleChange}
            className="bg-transparent"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Price {required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="price"
            value={estateData.price}
            onChange={handleChange}
            className="custom-input bg-transparent"
          />
        </Form.Group>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Best Amenity {required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="bestAmenity"
            value={estateData.bestAmenity}
            onChange={handleChange}
            className="custom-input bg-transparent"
          />
        </Form.Group>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Other Amenity {required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="otherAmenity"
            value={estateData.otherAmenity}
            onChange={handleChange}
            className="custom-input bg-transparent"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>State {required}</Form.Label>
          <Form.Select
            onChange={handleChangeState}
            value={estateData.location.state}
            className="bg-transparent text-dark"
          >
            <option className="primary-background text-dark" value={""}>
              Select State
            </option>
            {statesOption.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Local Government Area {required}</Form.Label>
          <Form.Select
            onChange={handleChangeLga}
            value={estateData.location.localGovernmentArea}
            className="bg-transparent text-dark"
          >
            <option className="primary-background text-dark" value={""}>
              Select LGA
            </option>
            {lgaOptions.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Town {required}</Form.Label>
          <Form.Select
            onChange={(e: any) => {
              handleChangeSubLga (e);
            }}
            className=" bg-transparent text-dark"
          >
            <option className=" primary-background text-dark" value={""}>
              Select District
            </option>
            {subLgaOptions.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {images.map((image, index) => (
          <Form.Group key={index} className="mb-3">
            <Form.Label>Image {index + 1}</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(index, event)}
              required
            />
          </Form.Group>
        ))}
        <Button type="button" onClick={handleAddImage} className="mb-3">
          {images.length <= 1 ? "Add image" : "Add more Images"}
        </Button>
        <br />
        <Form.Group>

        <Form.Group as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Sales Pitch{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="salesPitch"
            
            value={estateData.buildingType}
            onChange={(e) => handleChange(e)}
            className=" custom-input bg-transparent"
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>

          <div className="d-flex justify-content-evenly w-100 pb-5">
            <button
              className="auth-button w-50 text-light py-3"
              type={submitting ? "button" : "submit"}
            >
              {submitting ? <Spinner animation="border" size="sm" /> : "Submit"}
            </button>
            <button
              className="auth-button text-light w-50 py-3"
              onClick={() => navigate("/dashboard")}
            >
              {" "}
              Dashboard
            </button>
          </div>
        </Form.Group>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default UpdateBuildingForm;

