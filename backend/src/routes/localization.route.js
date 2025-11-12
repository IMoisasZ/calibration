/** @format */

/**
 * @fileoverview Defines the routes for managing Localization records (e.g., physical locations, departments).
 * This module sets up the full CRUD operations (Create, Read, Update, Status Update) for the entity.
 *
 * @module LocalizationRoutes
 * @requires express
 * @requires LocalizationController
 * @requires localization.middleware
 */
import { Router } from 'express'
import LocalizationController from '../controllers/localization.controller.js'
import {
	createLocalizationValidate,
	updateLocalizationValidate,
	getAllLocalizationValidator,
	getLocalizationValidate,
	updateLocalizationStatusValidate,
} from '../middlewares/localization.middleware.js'

/**
 * @const {Router} route - Express router instance for localization records.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new localization record.
 * @access Private
 * @middleware {Array<Function>} createLocalizationValidate - Validates the request body.
 * @controller LocalizationController.createLocalization - Handles the creation logic.
 */
route.post(
	'/',
	createLocalizationValidate,
	LocalizationController.createLocalization
)

/**
 * @route PUT /:id
 * @description Fully updates an existing localization record by ID.
 * @access Private
 * @middleware {Array<Function>} updateLocalizationValidate - Validates the ID parameter and the full request body.
 * @controller LocalizationController.updateLocalization - Handles the full update logic.
 */
route.put(
	'/:id',
	updateLocalizationValidate,
	LocalizationController.updateLocalization
)

/**
 * @route GET /
 * @description Retrieves a list of all localization records, supporting query filters (e.g., status).
 * @access Private
 * @middleware {Array<Function>} getAllLocalizationValidator - Validates query parameters.
 * @controller LocalizationController.getAllLocalization - Handles fetching the list.
 */
route.get(
	'/',
	getAllLocalizationValidator,
	LocalizationController.getAllLocalization
)

/**
 * @route GET /:id
 * @description Retrieves a single localization record by ID.
 * @access Private
 * @middleware {Array<Function>} getLocalizationValidate - Validates the 'id' route parameter.
 * @controller LocalizationController.getLocalization - Handles fetching the specific record.
 */
route.get(
	'/:id',
	getLocalizationValidate,
	LocalizationController.getLocalization
)

/**
 * @route PATCH /:id
 * @description Updates the active status of a localization record (partial update).
 * @access Private
 * @middleware {Array<Function>} updateLocalizationStatusValidate - Validates the ID parameter and the 'active' field in the body.
 * @controller LocalizationController.updateLocalizationStatus - Handles the partial status update logic.
 */
route.patch(
	'/:id',
	updateLocalizationStatusValidate,
	LocalizationController.updateLocalizationStatus
)

export default route
