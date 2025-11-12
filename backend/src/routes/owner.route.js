/** @format */

/**
 * @fileoverview Defines the routes for managing Owner records (the responsible party for an asset).
 * This module sets up the full CRUD operations (Create, Read, Update, Status Update) for the entity.
 *
 * @module OwnerRoutes
 * @requires express
 * @requires OwnerController
 * @requires owner.middleware
 */
import { Router } from 'express'
import OwnerController from '../controllers/owner.controller.js'
import {
	createOwnerValidator,
	updateOwnerValidator,
	getAllOwnerValidator,
	getOwnerValidator,
	updateOwnerStatusValidator,
} from '../middlewares/owner.middleware.js'

/**
 * @const {Router} route - Express router instance for owner records.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new owner record.
 * @access Private
 * @middleware {Array<Function>} createOwnerValidator - Validates the request body.
 * @controller OwnerController.createOwner - Handles the creation logic.
 */
route.post('/', createOwnerValidator, OwnerController.createOwner)

/**
 * @route PUT /:id
 * @description Fully updates an existing owner record by ID.
 * @access Private
 * @middleware {Array<Function>} updateOwnerValidator - Validates the ID parameter and the full request body.
 * @controller OwnerController.updateOwner - Handles the full update logic.
 */
route.put('/:id', updateOwnerValidator, OwnerController.updateOwner)

/**
 * @route GET /
 * @description Retrieves a list of all owner records, supporting query filters (e.g., status).
 * @access Private
 * @middleware {Array<Function>} getAllOwnerValidator - Validates query parameters.
 * @controller OwnerController.getAllOwner - Handles fetching the list.
 */
route.get('/', getAllOwnerValidator, OwnerController.getAllOwner)

/**
 * @route GET /:id
 * @description Retrieves a single owner record by ID.
 * @access Private
 * @middleware {Array<Function>} getOwnerValidator - Validates the 'id' route parameter.
 * @controller OwnerController.getOwner - Handles fetching the specific record.
 */
route.get('/:id', getOwnerValidator, OwnerController.getOwner)

/**
 * @route PATCH /:id
 * @description Updates the active status of an owner record (partial update).
 * @access Private
 * @middleware {Array<Function>} updateOwnerStatusValidator - Validates the ID parameter and the 'active' field in the body.
 * @controller OwnerController.updateOwnerStatus - Handles the partial status update logic.
 */
route.patch(
	'/:id',
	updateOwnerStatusValidator,
	OwnerController.updateOwnerStatus
)

export default route
