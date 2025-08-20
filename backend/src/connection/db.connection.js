import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const { DATABASE, DB_USER, DB_PASSWORD, HOST, DIALECT } = process.env

const sequelizeNoDB = new Sequelize({
	host: HOST,
	dialect: DIALECT,
	username: DB_USER,
	password: DB_PASSWORD,
})

/**@description -> Verify if exist database */
const checkAndCreateDatabase = async () => {
	const [results, metadata] = await sequelizeNoDB.query(
		`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${DATABASE}';`
	)

	if (results.length === 0) {
		/**@description -> Create the database if doesn't exist */
		await sequelizeNoDB.query(`CREATE DATABASE ${DATABASE};`)
		console.log(`Banco de dados ${DATABASE} criado com sucesso.`)
	}
}

await checkAndCreateDatabase()

const dbConnection = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
	host: HOST,
	dialect: DIALECT,
	define: {
		timestamps: true,
	},
})

export default dbConnection
