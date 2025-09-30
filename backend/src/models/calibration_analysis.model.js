import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import { CalibrationModel, UserModel } from './__index.js'

const CalibrationAnalysis = dbConnection.define(
	'calibration_analysis',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		calibration_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		original_status: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Status original não informado!',
				},
				isIn: {
					args: [['APROVADO CONDICIONAL', 'REPROVADO']],
					msg: 'São aceitos apenas os status "APROVADO CONDICIONAL" e "REPROVADO"!',
				},
			},
		},
		decision_status: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Status de decisão final não informado!',
				},
				isIn: {
					args: [['APROVADO', 'APROVADO CONDICIONAL', 'REPROVADO']],
					msg: 'São aceitos apenas os status "APROVADO", "APROVADO CONDICIONAL" e "REPROVADO"!',
				},
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		notes: {
			type: DataTypes.STRING(500),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Informação sobre a analise efetuada não informada!',
				},
				len: {
					args: [15, 500],
					msg: 'A quantidade de caracteres deve ser entre 15 e 500',
				},
			},
		},
	},
	{
		tableName: 'calibration_analysis',
		hooks: {
			beforeSave: (instance, option) => {
				if (instance.notes && typeof instance.notes === 'string') {
					instance.notes = instance.notes.toUpperCase()
				}
			},
		},
	}
)
CalibrationAnalysis.belongsTo(CalibrationModel, {
	foreignKey: 'calibration_id',
})
CalibrationModel.hasMany(CalibrationAnalysis, { foreignKey: 'calibration_id' })

CalibrationAnalysis.belongsTo(UserModel, { foreignKey: 'user_id' })
UserModel.hasMany(CalibrationAnalysis, { foreignKey: 'user_id' })

export default CalibrationAnalysis
