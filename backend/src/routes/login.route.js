/** @format */

/**
 * @fileoverview Defines the route for user login/authentication.
 * This module handles the POST request to authenticate a user and typically issue a session token.
 *
 * @module LoginRoutes
 * @requires express
 * @requires LoginController
 * @requires login.middleware
 */
import { Router } from 'express'
import LoginController from '../controllers/login.controller.js'
import { loginValidator } from '../middlewares/login.middleware.js'

/**
 * @const {Router} route - Express router instance for login operations.
 */
const route = Router()

/**
 * @route POST /
 * @description Authenticates a user using email and password, and returns a session token upon success.
 * @access Public (This is the entry point for authentication)
 * @middleware {Array<Function>} loginValidator - Validates the presence and format of email and password in the request body.
 * @controller LoginController.login - Handles the authentication logic (credential check and token generation).
 */
route.post('/', loginValidator, LoginController.login)

export default route
