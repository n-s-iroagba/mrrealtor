import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import { required } from "../../../common/components/required";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import "../styles/listing.styles.css";
import { Button, Spinner } from "react-bootstrap";
import { getLGAs, getLgaSubAreas, getNigeriaStates, StateCodes } from "geo-ng";
import { IBuildingCreation } from "../types/types";
import { registerBuildingUrl } from "../../../constants/urls";
import { postFormData } from "../../../common/utils/apiUtils";

const NewBuildingListingForm: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [estateData, setEstateData] = useState<IBuildingCreation>({
    commercialType: 'rental',
    price: 0,
    numberOfRooms: 0,
    buildingType: '',
    location:{
    district: '',
    localGovernmentArea:"",
    state: '',
    firstLineAddress: '',
    },
   
    listingDate: new Date(),
    bestAmenity: '',
    otherAmenity: '',
    salesPitch: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([{ file: null }]);
  const [stateCode, setStateCode] = useState("");
  const [subLgaOptions, setSubLgaOptions] = useState<any>([]);
  const [lgaOptions, setLgaOptions] = useState<any>([]);


  const navigate = useNavigate();

 
  
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
  
    // Create a new FormData object
    const formData = new FormData();
  
    // Append images
    images.forEach((image, index) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });
  
    // Append estateData fields to FormData
    formData.append("commercialType", estateData.commercialType);
    formData.append("price", estateData.price.toString());
    formData.append("numberOfRooms", estateData.numberOfRooms.toString());
    formData.append("buildingType", estateData.buildingType);
    formData.append("listingDate", estateData.listingDate.toISOString()); // Convert Date to string
    formData.append("bestAmenity", estateData.bestAmenity);
    formData.append("otherAmenity", estateData.otherAmenity);
    formData.append("salesPitch", estateData.salesPitch);
  
    // Append location fields
    formData.append("location[district]", estateData.location.district);
    formData.append("location[localGovernmentArea]", estateData.location.localGovernmentArea);
    formData.append("location[state]", estateData.location.state);
    formData.append("location[firstLineAddress]", estateData.location.firstLineAddress);
  
    try {
      const data = await postFormData(`${registerBuildingUrl}/${1}`, formData);
      console.log("Form submitted successfully:", data);
      setSubmitting(false);
      setValidated(false);
      alert('Building successfully listed');
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
      setErrorMessage(error.message);
      setSubmitting(false);
    }
  };
  
  
  

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    
    setEstateData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const handleChangeState = (e: any): void => {
    setEstateData(prevData => ({
      ...prevData,
      location: {
        ...prevData.location,
        state: e.target.value,
      }
    }));
    const code = getStateCodeByName(e.target.value);

    if (code) {
      const lgas = getLGAs(code as StateCodes) as string[];
      setStateCode(code);

      setLgaOptions(lgas);
    }
  };

  const handleChangeLga = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newLocalGovernmentArea = e.target.value;
    
    // Update the state with the new localGovernmentArea and fetch sub-areas
    setEstateData(prevData => ({
      ...prevData,
      location: {
        ...prevData.location,
        localGovernmentArea: newLocalGovernmentArea,
      }
    }));
  
    // Assuming getLgaSubAreas returns a list of sub-areas based on stateCode and localGovernmentArea
    const subAreas = getLgaSubAreas(stateCode as StateCodes, newLocalGovernmentArea);
    setSubLgaOptions(subAreas);
  };
  

  const handleChangeSubLga = (e: any) => {
    setEstateData((prevData: any) => ({
      ...prevData,
      location: {
       ...prevData.location,
        district: e.target.value,
      },
    }));
  };

  const handleAddressChange = (e: any) => {
    setEstateData((prevData: any) => ({
      ...prevData,
      location: {
       ...prevData.location,
        firstLineAddress: e.target.value,
      },
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
      <h3 className="text-center">List a Building</h3>
      <Form
        noValidate
        validated={validated}
        onSubmit={(e: any) => handleSubmit(e)}
      >
        <Form.Group>
          <Form.Label>Commercial Type {required}</Form.Label>
          <Select
            options={commerceOptions}
            onChange={(e: any) => {
              setEstateData((prevData: any) => ({
                ...prevData,
                commerceType: e.label,
              }));
            }}
            className=""
          />
        </Form.Group>

        <Form.Group as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Property Type{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="buildingType"
            
            value={estateData.buildingType}
            onChange={(e) => handleChange(e)}
            className=" custom-input bg-transparent"
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>

        
          <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
            <Form.Label className="mb-0">Number Of Rooms{required}</Form.Label>
            <Form.Control
              required
              type="number"
              name="numberOfRooms"
              value={estateData.numberOfRooms}
              onChange={(e) => handleChange(e)}
              className=" bg-transparent"
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        
          <Form.Group as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Price in Naira {required}</Form.Label>
          <Form.Control
            required
            type="number"
            name="price"
            value={estateData.price}
            onChange={(e) => handleChange(e)}
            className=" custom-input bg-transparent"
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">
            Best Perk or Social Ammenity{required}
          </Form.Label>
          <Form.Control
            required
            type="string"
            name="bestAmenity"
            value={estateData.bestAmenity}
            onChange={(e) => handleChange(e)}
            className=" custom-input bg-transparent"
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">
            Other Perk or Social Ammenity{required}
          </Form.Label>
          <Form.Control
            required
            type="string"
            name="otherAmenity"
            value={estateData.otherAmenity}
            onChange={(e) => handleChange(e)}
            className=" custom-input bg-transparent"
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            State <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Select
            onChange={(e: any) => {
              handleChangeState(e);
            }}
            className=" bg-transparent text-dark"
          >
            <option className=" primary-background text-dark" value={""}>
              Select State
            </option>
            {statesOption.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
          .
        </Form.Group>

        <Form.Group>
          <Form.Label>Local Government Area {required}</Form.Label>
          <Form.Select
            onChange={(e: any) => {
              handleChangeLga(e);
            }}
            className=" bg-transparent text-dark"
          >
            <option className=" primary-background text-dark" value={""}>
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


        <Form.Group as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">First line address{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="salesPitch"
            
            value={estateData.location.firstLineAddress}
            onChange={(e) => handleAddressChange(e)}
            className=" custom-input bg-transparent"
          />
          <Form.Control.Feedback></Form.Control.Feedback>
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
            
            value={estateData.salesPitch}
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

export default NewBuildingListingForm;
