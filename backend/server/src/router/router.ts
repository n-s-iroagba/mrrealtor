import { Router } from "express";
import multer from "multer";
import { fetchMessages } from "../message/messageController";
import { createAdmin, updateAdmin } from "../admin/adminController";

import { getAllRealtors, getRealtorById, updateRealtor, deleteRealtor, createRealtor } from "../realtor/realtorController";
import { getLikes, getLikesForProperty } from "../likes/likesController";
import { createProperty, deleteProperty, getAllProperties, getAllPropertiesForARealtor, getPropertyById, updateProperty } from "../property/propertyController";

const router: Router = Router();
const upload = multer();


router.get('/messages/:id', fetchMessages)


router.post('/admins', createAdmin)


router.put('/admins/:id', updateAdmin);


router.post('/realtors', createRealtor);

router.get('/realtors', getAllRealtors);

router.get('/realtors/:id', getRealtorById);

router.put('/realtors/:id', updateRealtor);

router.delete('/realtors/:id', deleteRealtor);

router.get('/likes', getLikesForProperty)

router.get('/all-likes', getLikes)


router.post('/properties', createProperty);

// Get all properties with optional query parameters
router.get('/properties', getAllProperties);

// Get a single property by ID
router.get('/properties/:id', getPropertyById);

router.get('/properties/:realtorId',getAllPropertiesForARealtor);

// Update a property by ID
router.put('/properties/:id', updateProperty);


// Delete a property by ID
router.delete('/properties/:id', deleteProperty)

export default router;



