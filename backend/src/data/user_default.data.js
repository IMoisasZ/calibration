/** @format */

/**
 * @fileoverview Defines the default master user credentials for database seeding purposes.
 * This constant is typically used during application initialization to ensure a working
 * administrative user exists upon first boot.
 *
 * @module userDefaultConstants
 */

/**
 * @typedef {object} MasterUserCredentials
 * @property {string} user_name - The display name for the default master user.
 * @property {'MASTER'} role - The access role, set to 'MASTER'.
 * @property {string} email - The unique email address for the master user.
 * @property {string} password - The initial, default password. NOTE: This password is weak and must be securely hashed (e.g., using bcrypt) before being saved to the database.
 * @property {boolean} active - The user's active status (enabled).
 */

/**
 * @constant {MasterUserCredentials} userDefault
 * @description Default credentials for the system's initial 'MASTER' user.
 * Used for populating the database on the first run (seeding).
 */
export const userDefault = {
	user_name: 'MASTER',
	role: 'MASTER',
	email: 'master@email.com.br',
	password: '123456',
	active: true,
}
