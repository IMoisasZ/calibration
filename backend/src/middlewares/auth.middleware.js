/**
 * @format
 * @fileoverview Express middleware to verify a JSON Web Token (JWT) provided in the Authorization header.
 * @module middleware/verifyToken
 */

import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { UnauthorizedError } from '../errors/customErrors.error.js' // Assumindo que você tem um erro 401

/**
 * Express middleware function to verify the authenticity and validity of a JWT.
 * It strictly expects the token in the 'Authorization' header in the format: 'Bearer [token]'.
 * * If verification is successful:
 * 1. It decodes the payload.
 * 2. It attaches the user's ID from the token payload to the request object as `req.userId`.
 * 3. Calls `next()` to proceed to the next handler.
 * * If verification fails (missing header, wrong format, invalid signature, or expired token):
 * 1. It creates and passes an `UnauthorizedError` (HTTP 401) to the error handler.
 * * @function verifyToken
 * @param {object} req - The Express request object. It is modified to include `req.userId` on success.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 * @returns {void} Calls `next()` or `next(error)`.
 */
export const verifyToken = (req, res, next) => {
	// 1. Get the Authorization header
	const authHeader = req.headers.authorization

	if (!authHeader) {
		// 401 Unauthorized if the header is missing
		return next(new UnauthorizedError('Token de autenticação não fornecido.'))
	}

	// 2. Extract the Token (expects the format "Bearer [token]")
	const parts = authHeader.split(' ')

	if (parts.length !== 2 || parts[0] !== 'Bearer') {
		return next(
			new UnauthorizedError('Formato de token inválido. Use: Bearer [token].')
		)
	}

	const token = parts[1]

	// 3. Verify and Decode the Token
	try {
		// process.env.JWT_SECRET must be defined in the environment.
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		// 4. Attach the user ID to the request for subsequent handlers
		req.userId = decoded.id

		// 5. Proceed
		next()
	} catch (err) {
		// Handles errors like TokenExpiredError or JsonWebTokenError
		// NOTE: Consider adding logging (e.g., console.error(err)) here for diagnostics.
		return next(new UnauthorizedError('Token inválido ou expirado.'))
	}
}
