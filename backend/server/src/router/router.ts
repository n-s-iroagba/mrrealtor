import { Router } from "express";
import { getAllBuildingForRealtorRoute, getAllBuildingRoute, getBuildingByIdRoute, registerBuildingRoute } from "../config/apiRoutes";
import { createBuilding, getAllBuildings, getAllBuildingsForARealtor, getBuildingById, searchAllBuildings } from "../controller/buildingController";
import { getStates, getLocalgovernmentAreas, getDistricts } from "../controller/locationController";
const router: Router = Router();
router.get('/', async (req, res) => {
    res.status(200).send(`server is running`);
  });
router.post('/create/building/:posterId',createBuilding)
router.get(getBuildingByIdRoute,getBuildingById)
router.get(getAllBuildingForRealtorRoute,getAllBuildingsForARealtor)
router.get(getAllBuildingRoute,getAllBuildings)
router.get('/states',getStates)
router.get('/local-government-areas',getLocalgovernmentAreas)
router.get('/districts',getDistricts)
router.post ('/building/sale',searchAllBuildings) //
export default router;



