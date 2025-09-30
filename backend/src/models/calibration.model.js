import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import { EquipmentModel } from './__index.js'

const Calibration = dbConnection.define(
	'calibration',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		equipment_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Equipamento não informado!',
				},
			},
		},
		calibration_date: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Data da calibração não informada!',
				},
				isDate: {
					msg: 'O tipo informado deve ser uma data válida!',
				},
			},
		},
		next_calibration: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Data da calibração não informada!',
				},
				isDate: {
					msg: 'O tipo informado deve ser uma data válida!',
				},
			},
		},
		certificate_number: {
			type: DataTypes.STRING(15),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Certificado não informado!',
				},
			},
		},
		certificate_file: {
			type: DataTypes.STRING(500),
			allowNull: true,
		},
		calibration_status: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: 'PENDENTE',
			validate: {
				isIn: {
					args: [['EM ANALISE', 'APROVADO CONDICIONAL', 'REPROVADO']],
					msg: 'Informe apenas EM ANALISE, APROVADO CONDICIONAL ou REPROVADO!',
				},
			},
		},
		is_analysis: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		tableName: 'calibration',
		hooks: {
			beforeSave: (instance, options) => {
				if (
					instance.certificate_number &&
					typeof instance.certificate_number === 'string'
				) {
					instance.certificate_number =
						instance.certificate_number.toUpperCase()
				}
				if (
					instance.calibration_status &&
					typeof instance.calibration_status === 'string'
				) {
					instance.calibration_status =
						instance.calibration_status.toUpperCase()
				}
			},
		},
	}
)

Calibration.belongsTo(EquipmentModel, { foreignKey: 'equipment_id' })
EquipmentModel.hasMany(Calibration, { foreignKey: 'equipment_id' })

export default Calibration
