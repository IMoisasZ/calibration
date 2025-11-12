/** @format */

/**
 * @fileoverview Configures and establishes the Sequelize database connection.
 * It includes a critical routine to check for and create the database schema
 * if it does not already exist, ensuring the application can bootstrap successfully.
 *
 * @module dbConnection
 * @requires sequelize
 */
import Sequelize from 'sequelize'

/**
 * @description Destructures database connection variables from environment settings.
 * @type {string} DATABASE - The name of the database.
 * @type {string} DB_USER - The database username.
 * @type {string} DB_PASSWORD - The database password.
 * @type {string} HOST - The database host address.
 * @type {string} DIALECT - The SQL dialect (e.g., 'postgres', 'mysql').
 */
const { DATABASE, DB_USER, DB_PASSWORD, HOST, DIALECT } = process.env

/**
 * @description Configuration object for dialect-specific options, primarily SSL.
 * It mandates SSL in production but currently disables certificate validation
 * for flexibility, which is a potential security risk in unsecure environments.
 * @type {object}
 */
const dialectOptionsConfig =
	process.env.NODE_ENV === 'production'
		? {
				ssl: {
					/** @description production: Requires SSL connection. */
					require: true,
					/** @description Disables certificate authority verification. NOTE: Using 'false' is less secure and should be avoided unless strictly necessary (e.g., with specific cloud services). */
					rejectUnauthorized: false,
				},
		  }
		: {}

/**
 * @description Temporary Sequelize instance used only to connect to the database server
 * (without specifying a schema) in order to perform database creation checks.
 * @type {Sequelize.Sequelize}
 */
const sequelizeNoDB = new Sequelize({
	host: HOST,
	dialect: DIALECT,
	username: DB_USER,
	password: DB_PASSWORD,
	dialectOptions: dialectOptionsConfig,
})

/**
 * Checks if the database schema exists on the server and creates it if it does not.
 * This is crucial for initial deployment and development environment setup.
 *
 * @async
 * @function checkAndCreateDatabase
 * @throws {Error} Throws an error if authentication or database creation fails.
 * @returns {Promise<void>}
 */
const checkAndCreateDatabase = async () => {
	try {
		/** @description Try authenticating to the server */
		await sequelizeNoDB.authenticate()

		/** @description Query the information schema to check for the database name. */
		const queryResult = await sequelizeNoDB.query(
			`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :dbName;`,
			{
				replacements: { dbName: DATABASE },
				type: Sequelize.QueryTypes.SELECT,
			}
		)

		const results = queryResult[0] || []

		if (results.length === 0) {
			/** @description Create the database if it doesn't exist. */
			await sequelizeNoDB.query(`CREATE DATABASE ${DATABASE};`)

			console.log(`Database ${DATABASE} created with success.`)
		}
	} catch (error) {
		console.error(
			'Critical error during initial DB check (sequelizeNoDB):',
			error
		)
		throw error
	}
}

/** @description Executes the database verification and creation routine before establishing the main connection. */
await checkAndCreateDatabase()

/**
 * @description The main Sequelize connection instance for the application.
 * This connection uses the specific database schema guaranteed to exist by the preceding function.
 * @type {Sequelize.Sequelize}
 */
const dbConnection = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
	host: HOST,
	dialect: DIALECT,
	/** @description Enables SQL query logging only in development environment. */
	logging: process.env.NODE_ENV === 'development' ? console.log : false,
	define: {
		timestamps: true,
	},
	/** @description Dialect options for security (SSL) and environment specifics. */
	dialectOptions: dialectOptionsConfig,
})

/**
 * @exports dbConnection
 * @description Exports the established Sequelize connection instance.
 * @type {Sequelize.Sequelize}
 */
export default dbConnection
