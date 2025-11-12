/** @format */

import i18n from 'i18n'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * @fileoverview Configures the 'i18n' internationalization middleware for the application.
 * It sets up supported locales, the directory for translation files, and global helpers.
 *
 * @module i18nConfig
 */

// 1. Setup for ES6 Modules (to get __dirname equivalent)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * @constant {object} i18n.configuration
 * @description Configuration object for the i18n library.
 * @property {string[]} locales - Supported locales ('pt_BR', 'en').
 * @property {string} defaultLocale - The fallback locale ('pt_BR').
 * @property {string} directory - The absolute path to the translation JSON files.
 * @property {boolean} objectNotation - Enables nested translation keys (e.g., 'VALIDATION.STATUS').
 * @property {boolean} autoReload - Automatically reloads translation files during development.
 * @property {global} register - Registers the translation function ('__') globally.
 */
i18n.configure({
	// Supported locales
	locales: ['pt_BR', 'en'],

	// Default locale (used if user language is unknown)
	defaultLocale: 'pt_BR',

	// Path to the folder containing JSON files (e.g., in the "locales" folder at the project root)
	directory: path.join(__dirname, '..', 'locales'),

	// Use object notation, allowing nested keys (e.g., "VALIDATION.STATUS")
	objectNotation: true,

	// Automatically reloads files if changed (great for development)
	autoReload: true,

	// Name of the global variable used for translation. We use '__' (double underscore).
	register: global,
})

/**
 * @exports i18n
 * @description The configured i18n instance.
 * The translation helper function is registered globally as '__'.
 * @type {i18n.i18n}
 */
export default i18n
