/** @format */

/**
 * @fileoverview Defines the routes for managing Unity (Unit of Measure) records.
 * This module sets up the full CRUD operations (Create, Read, Update, Status Update) for the entity.
 *
 * @module UnityRoutes
 * @requires express
 * @requires UnityController
 * @requires unity.middleware
 */
import { Router } from 'express'
import UnityController from '../controllers/unity.controller.js'
import {
	createUnityValidator,
	updateUnityValidator,
	getAllUnityValidator,
	getUnityValidator,
	updateUnityStatusValidator,
} from '../middlewares/unity.middleware.js'

/**
 * @const {Router} route - Express router instance for unity (unit of measure) records.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new unity (unit of measure) record.
 * @access Private
 * @middleware {Array<Function>} createUnityValidator - Validates the request body.
 * @controller UnityController.createUnity - Handles the creation logic.
 */
route.post('/', createUnityValidator, UnityController.createUnity)

/**
 * @route PUT /:id
 * @description Fully updates an existing unity record by ID.
 * @access Private
 * @middleware {Array<Function>} updateUnityValidator - Validates the ID parameter and the full request body.
 * @controller UnityController.updateUnity - Handles the full update logic.
 */
route.put('/:id', updateUnityValidator, UnityController.updateUnity)

/**
 * @route GET /
 * @description Retrieves a list of all unity records, supporting query filters (e.g., status).
 * @access Private
 * @middleware {Array<Function>} getAllUnityValidator - Validates query parameters.
 * @controller UnityController.getAllUnity - Handles fetching the list.
 */
route.get('/', getAllUnityValidator, UnityController.getAllUnity)

/**
 * @route GET /:id
 * @description Retrieves a single unity record by ID.
 * @access Private
 * @middleware {Array<Function>} getUnityValidator - Validates the 'id' route parameter.
 * @controller UnityController.getUnity - Handles fetching the specific record.
 */
route.get('/:id', getUnityValidator, UnityController.getUnity)

/**
 * @route PATCH /:id
 * @description Updates the active status of a unity record (partial update).
 * @access Private
 * @middleware {Array<Function>} updateUnityStatusValidator - Validates the ID parameter and the 'active' field in the body.
 * @controller UnityController.updateUnityStatus - Handles the partial status update logic.
 */
route.patch(
	'/:id',
	updateUnityStatusValidator,
	UnityController.updateUnityStatus
)

export default route
