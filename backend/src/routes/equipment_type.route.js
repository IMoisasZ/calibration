/** @format */

/**
 * @fileoverview Defines the routes for managing Equipment Type records.
 * This module sets up the full CRUD operations (Create, Read, Update, Status Update) for the entity.
 *
 * @module EquipmentTypeRoutes
 * @requires express
 * @requires EquipmentTypeController
 * @requires equipment_type.middleware
 */
import { Router } from 'express'
import EquipmentTypeController from '../controllers/equipment_type.controller.js'
import {
	createEquipmentTypeValidator,
	updateEquipmentTypeValidator,
	getAllEquipmentTypeValidator,
	getEquipmentTypeValidator,
	updateEquipmentTypeStatusValidator,
} from '../middlewares/equipment_type.middleware.js'

/**
 * @const {Router} route - Express router instance for equipment types.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new equipment type record.
 * @access Private
 * @middleware {Array<Function>} createEquipmentTypeValidator - Validates the request body.
 * @controller EquipmentTypeController.createEquipmentType - Handles the creation logic.
 */
route.post(
	'/',
	createEquipmentTypeValidator,
	EquipmentTypeController.createEquipmentType
)

/**
 * @route PUT /:id
 * @description Fully updates an existing equipment type record by ID.
 * @access Private
 * @middleware {Array<Function>} updateEquipmentTypeValidator - Validates the ID parameter and the full request body.
 * @controller EquipmentTypeController.updateEquipmentType - Handles the full update logic.
 */
route.put(
	'/:id',
	updateEquipmentTypeValidator,
	EquipmentTypeController.updateEquipmentType
)

/**
 * @route GET /
 * @description Retrieves a list of all equipment type records, supporting query filters (e.g., status).
 * @access Private
 * @middleware {Array<Function>} getAllEquipmentTypeValidator - Validates query parameters.
 * @controller EquipmentTypeController.getAllEquipmentType - Handles fetching the list.
 */
route.get(
	'/',
	getAllEquipmentTypeValidator,
	EquipmentTypeController.getAllEquipmentType
)

/**
 * @route GET /:id
 * @description Retrieves a single equipment type record by ID.
 * @access Private
 * @middleware {Array<Function>} getEquipmentTypeValidator - Validates the 'id' route parameter.
 * @controller EquipmentTypeController.getEquipmentType - Handles fetching the specific record.
 */
route.get(
	'/:id',
	getEquipmentTypeValidator,
	EquipmentTypeController.getEquipmentType
)

/**
 * @route PATCH /:id
 * @description Updates the active status of an equipment type record (partial update).
 * @access Private
 * @middleware {Array<Function>} updateEquipmentTypeStatusValidator - Validates the ID parameter and the 'active' field in the body.
 * @controller EquipmentTypeController.updateEquipmentTypeStatus - Handles the partial status update logic.
 */
route.patch(
	'/:id',
	updateEquipmentTypeStatusValidator,
	EquipmentTypeController.updateEquipmentTypeStatus
)

export default route
