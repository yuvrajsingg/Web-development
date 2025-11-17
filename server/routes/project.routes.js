// server/routes/project.routes.js
import express from "express";
import * as projectController from "../controllers/project.controller.js";
import { requireSignin, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Public routes - anyone can view
router.get("/", projectController.findAll);
router.get("/:id", projectController.findOne);

// ✅ Protected routes - anyone logged in can create, only admin can update/delete
router.post("/", requireSignin, projectController.create);
router.put("/:id", requireSignin, isAdmin, projectController.update);
router.delete("/:id", requireSignin, isAdmin, projectController.deleteOne);
router.delete("/", requireSignin, isAdmin, projectController.deleteAllProjects);

// 👇 THIS IS THE CRUCIAL LINE
export default router;

