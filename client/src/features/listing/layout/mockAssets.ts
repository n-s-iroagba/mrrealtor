import image from '../../home/assets/images/firstListing.jpeg'
import { BuildingDTO } from '../types/responseDto';


export const assets: BuildingDTO[] = [
    
    {
      id: 1,
      commercialType: 'Commercial',
      price: 500000,
      numberOfRooms: 3,
      propertyType: 'Apartment',
      state: 'Springfield',
      buildingType: 'High-rise',
      localGovernmentArea: 'Downtown',
      district: 'Central Business District',
      firstLineAddress: '1234 Main St',
      paid: true,
      listingDate: new Date('2024-01-01'),
      bestAmenity: 'Swimming Pool',
      otherAmenity: 'Gym',
      posterId: 1,
      images: [image, image, image],
      salesPitch: 'A beautiful high-rise apartment in the heart of the city.',
      interiorDesignFeatures: ['Modern kitchen', 'spacious living room', 'hardwood floors']
    },
    {
      id: 2,
      commercialType: 'Residential',
      price: 750000,
      numberOfRooms: 4,
      propertyType: 'House',
      state: 'Shelbyville',
      buildingType: 'Detached',
      localGovernmentArea: 'Suburbia',
      district: 'Westside',
      firstLineAddress: '5678 Elm St',
      paid: false,
      listingDate: new Date('2024-02-15'),
      bestAmenity: 'Garden',
      otherAmenity: 'Garage',
      posterId: 2,
      images:  [image, image, image],
      salesPitch: 'A spacious house with a beautiful garden and a private garage.',
      interiorDesignFeatures: ['Modern kitchen', 'spacious living room', 'hardwood floors']
    },
    {
      id: 3,
      commercialType: 'Industrial',
      price: 1000000,
      numberOfRooms: 2,
      propertyType: 'Warehouse',
      state: 'Capital City',
      buildingType: 'Industrial',
      localGovernmentArea: 'Industrial Zone',
      district: 'Northside',
      firstLineAddress: '9101 Warehouse Way',
      paid: null,
      listingDate: new Date('2024-03-10'),
      bestAmenity: 'Loading Dock',
      otherAmenity: 'Office Space',
      posterId: 3,
      images: [image, image, image],
      salesPitch: 'A large warehouse with ample office space and a loading dock.',
      interiorDesignFeatures:['Modern kitchen', 'spacious living room', 'hardwood floors']
    },
  ];