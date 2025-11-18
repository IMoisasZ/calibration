/** @format */

/**
 * @fileoverview Defines the routes for managing User records.
 * This module sets up the full CRUD operations, including specialized routes for lookup by email and status modification.
 *
 * @module UserRoutes
 * @requires express
 * @requires UserController
 * @requires user.middleware
 */
import { Router } from 'express'
import UserController from '../controllers/user.controller.js'
import {
	createUserValidator,
	updateUserValidator,
	updatePasswordUserValidator,
	getAllUsersValidator,
	getUserValidator,
	getUserByEmailValidator,
	patchUserDisableEnableValidator,
} from '../middlewares/user.middleware.js'

/**
 * @const {Router} route - Express router instance for user records.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new user record.
 * @access Private
 * @middleware {Array<Function>} createUserValidator - Validates the request body.
 * @controller UserController.createUser - Handles the creation logic.
 */
route.post('/', createUserValidator, UserController.createUser)

/**
 * @route PUT /:id
 * @description Fully updates an existing user record by ID.
 * @access Private
 * @middleware {Array<Function>} updateUserValidator - Validates the ID parameter and the full request body.
 * @controller UserController.updateUser - Handles the full update logic.
 */
route.put('/:id', updateUserValidator, UserController.updateUser)

/**
 * @route PATCH /change_password/:id
 * @description Updates only the password for an existing user record by ID.
 * @access Private
 * @middleware {Array<Function>} updatePasswordUserValidator - Validates the ID parameter and the 'password' field in the body.
 * @controller UserController.updatePasswordUser - Handles the password hashing and update logic.
 */
route.patch(
	'/change_password/:id',
	updatePasswordUserValidator,
	UserController.updatePasswordUser
)

/**
 * @route GET /
 * @description Retrieves a list of all user records, supporting query filters (e.g., active status).
 * @access Private
 * @middleware {Array<Function>} getAllUsersValidator - Validates query parameters.
 * @controller UserController.getAllUsers - Handles fetching the list.
 */
route.get('/', getAllUsersValidator, UserController.getAllUsers)

/**
 * @route GET /:id
 * @description Retrieves a single user record by its primary ID.
 * @access Private
 * @middleware {Array<Function>} getUserValidator - Validates the 'id' route parameter.
 * @controller UserController.getUser - Handles fetching the specific record.
 */
route.get('/:id', getUserValidator, UserController.getUser)

/**
 * @route GET /user
 * @description Retrieves a single user record by email, typically passed as a query parameter (e.g., /user?email=...).
 * @access Private
 * @middleware {Array<Function>} getUserByEmailValidator - Validates the 'email' query parameter.
 * @controller UserController.getUserByEmail - Handles fetching the specific record by email.
 */
route.get('/user', getUserByEmailValidator, UserController.getUserByEmail)

/**
 * @route PATCH /:id
 * @description Updates the active status of a user record (disabling or enabling the account).
 * @access Private
 * @middleware {Array<Function>} patchUserDisableEnableValidator - Validates the ID parameter and the 'active' field in the body.
 * @controller UserController.patchUserDisableEnable - Handles the status update logic.
 */
route.patch(
	'/:id',
	patchUserDisableEnableValidator,
	UserController.patchUserDisableEnable
)

export default route
