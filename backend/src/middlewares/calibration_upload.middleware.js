/** @format */

import multer, { diskStorage } from 'multer'
import { extname, resolve } from 'path'
import { existsSync, mkdirSync } from 'fs' // Importe o módulo 'fs'
import { cwd } from 'process'

/**
 * @fileoverview Configures the Multer middleware for handling file uploads,
 * specifically targeting calibration certificates (PDF files). It ensures a
 * unique filename and restricts file types.
 *
 * @module MulterUploadConfig
 * @requires multer
 * @requires path
 * @requires fs
 */

/**
 * @const {string} uploadDir
 * @description Absolute path to the directory where certificate files will be stored.
 * The path is resolved relative to the current working directory: /src/uploads/certificates.
 */
const uploadDir = resolve(cwd(), 'src', 'uploads', 'certificates')

// Ensure the upload directory exists before any operation
if (!existsSync(uploadDir)) {
	mkdirSync(uploadDir, { recursive: true })
}

/**
 * @const {import('multer').StorageEngine} storage
 * @description Disk storage configuration for Multer. Defines the destination path
 * and a unique file naming convention.
 */
const storage = diskStorage({
	/**
	 * @param {import('express').Request} req - The Express request object.
	 * @param {Express.Multer.File} file - The file object.
	 * @param {function(Error|null, string)} cb - The callback function.
	 */
	destination: (req, file, cb) => {
		cb(null, uploadDir)
	},
	/**
	 * @param {import('express').Request} req - The Express request object.
	 * @param {Express.Multer.File} file - The file object.
	 * @param {function(Error|null, string)} cb - The callback function.
	 */
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname))
	},
})

/**
 * @const {import('multer').Multer} upload
 * @description The configured Multer instance.
 * @property {import('multer').StorageEngine} storage - The disk storage engine.
 * @property {function} fileFilter - Restricts uploads to only 'application/pdf' files.
 */
const upload = multer({
	storage: storage,
	/**
	 * @param {import('express').Request} req - The Express request object.
	 * @param {Express.Multer.File} file - The file object being uploaded.
	 * @param {function(Error|null, boolean)} cb - The callback function.
	 */
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'application/pdf') {
			cb(null, true)
		} else {
			cb(
				new Error(
					'Formato de arquivo não suportado. Apenas PDFs são permitidos.'
				),
				false
			)
		}
	},
})

/**
 * @exports upload
 * @description Exports the configured Multer instance ready to be used as middleware.
 * @type {import('multer').Multer}
 */
export default upload
