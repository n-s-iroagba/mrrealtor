import { Router } from "express";
import { getAllBuildingForRealtorRoute, getAllBuildingRoute, getBuildingByIdRoute, registerBuildingRoute } from "../config/apiRoutes";
import { createBuilding, getAllBuildings, getAllBuildingsForARealtor, getBuildingById } from "../controller/buildingController";
const router: Router = Router();

router.post(registerBuildingRoute,createBuilding)
router.get(getBuildingByIdRoute,getBuildingById)
router.get(getAllBuildingForRealtorRoute,getAllBuildingsForARealtor)
router.get(getAllBuildingRoute,getAllBuildings)

export default router;



