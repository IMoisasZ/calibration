/** @format */

/**@description -> Imports */
import Sequelize from 'sequelize'

/**@description - > Destruction variabels to process.env */
const { DATABASE, DB_USER, DB_PASSWORD, HOST, DIALECT } = process.env

/** @description -> Define the options of SSL. */
const dialectOptionsConfig =
	process.env.NODE_ENV === 'production'
		? {
				ssl: {
					/**@description -> production: Should have SSL and config analusis of certificate. */
					require: true,
					/**@description -> Use 'true' if have the correctly certificate or false ONLY if the enviriomental require (it's less security) */
					rejectUnauthorized: false,
				},
		  }
		: {}

/**@description -> Temporary Instance for creation of DB (without database on connection) */
const sequelizeNoDB = new Sequelize({
	host: HOST,
	dialect: DIALECT,
	username: DB_USER,
	password: DB_PASSWORD,
	dialectOptions: dialectOptionsConfig,
})

/**@description -> Verify if exist database (using replacements for security) */
const checkAndCreateDatabase = async () => {
	try {
		/**@description -> Try athenticate on server */
		await sequelizeNoDB.authenticate()

		const queryResult = await sequelizeNoDB.query(
			`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :dbName;`,
			{
				replacements: { dbName: DATABASE },
				type: Sequelize.QueryTypes.SELECT,
			}
		)

		const results = queryResult[0] || []

		if (results.length === 0) {
			/**@description -> Create the database if doesn't exist. */
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

/**@description -> Execute the virification and creation of database */
await checkAndCreateDatabase()

/**@description -> Main connection of application, that alredy the DB guarantie */
const dbConnection = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
	host: HOST,
	dialect: DIALECT,
	/**@description -> logging conditional */
	logging: process.env.NODE_ENV === 'development' ? console.log : false,
	define: {
		timestamps: true,
	},
	/**@description -> dialectOptions for security (if using SSL) Especialy important for services like AWS RDS or Azure DBs. */
	dialectOptions: dialectOptionsConfig,
})

export default dbConnection
