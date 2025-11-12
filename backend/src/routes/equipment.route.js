/** @format */

/**
 * @fileoverview Defines the routes for managing Equipment records.
 * This module sets up the full CRUD operations, including a specific lookup route by a unique identifier.
 *
 * @module EquipmentRoutes
 * @requires express
 * @requires EquipmentController
 * @requires equipment.middleware
 */
import { Router } from 'express'
import EquipmentController from '../controllers/equipment.controller.js'
import {
	createEquipmentValidator,
	updateEquipmentValidator,
	getAllEquipmentValidator,
	getEquipmentValidator,
	getEquipmentByIdentifierValidator,
	updateEquipmentStatus,
} from '../middlewares/equipment.middleware.js'

/**
 * @const {Router} route - Express router instance for equipment records.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new equipment record.
 * @access Private
 * @middleware {Array<Function>} createEquipmentValidator - Validates the request body.
 * @controller EquipmentController.createEquipment - Handles the creation logic.
 */
route.post('/', createEquipmentValidator, EquipmentController.createEquipment)

/**
 * @route PUT /:id
 * @description Fully updates an existing equipment record by ID.
 * @access Private
 * @middleware {Array<Function>} updateEquipmentValidator - Validates the ID parameter and the full request body.
 * @controller EquipmentController.updateEquipment - Handles the full update logic.
 */
route.put('/:id', updateEquipmentValidator, EquipmentController.updateEquipment)

/**
 * @route GET /
 * @description Retrieves a list of all equipment records, supporting query filters (e.g., status).
 * @access Private
 * @middleware {Array<Function>} getAllEquipmentValidator - Validates query parameters.
 * @controller EquipmentController.getAllEquipment - Handles fetching the list.
 */
route.get('/', getAllEquipmentValidator, EquipmentController.getAllEquipment)

/**
 * @route GET /:id
 * @description Retrieves a single equipment record by its primary ID.
 * @access Private
 * @middleware {Array<Function>} getEquipmentValidator - Validates the 'id' route parameter.
 * @controller EquipmentController.getEquipment - Handles fetching the specific record.
 */
route.get('/:id', getEquipmentValidator, EquipmentController.getEquipment)

/**
 * @route GET /by-identifier/:identifier
 * @description Retrieves a single equipment record by its unique identifier (e.g., serial number or tag).
 * @access Private
 * @middleware {Array<Function>} getEquipmentByIdentifierValidator - Validates the 'identifier' route parameter.
 * @controller EquipmentController.getEquipmentByIdentifier - Handles fetching the specific record.
 */
route.get(
	'/by-identifier/:identifier',
	getEquipmentByIdentifierValidator,
	EquipmentController.getEquipmentByIdentifier
)

/**
 * @route PATCH /:id
 * @description Updates the active status of an equipment record (partial update).
 * @access Private
 * @middleware {Array<Function>} updateEquipmentStatus - Validates the ID parameter and the 'active' field in the body.
 * @controller EquipmentController.updateEquipmentStatus - Handles the partial status update logic.
 */
route.patch(
	'/:id',
	updateEquipmentStatus,
	EquipmentController.updateEquipmentStatus
)

export default route
