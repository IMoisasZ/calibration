import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import {
	CalibrationPeriodicityModel,
	EquipmentTypeModel,
	OwnerModel,
	UnityModel,
} from './__index.js'

const Equipment = dbConnection.define(
	'equipment',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		equipment_type_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Equipamento não informado!',
				},
			},
		},
		identifier: {
			type: DataTypes.STRING(10),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'Identificação não informada!',
				},
			},
		},
		description: {
			type: DataTypes.STRING(300),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Equipamento não informado!',
				},
			},
		},
		owner_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		division: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Divisão não informada!',
				},
			},
		},
		unity_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Unidade de medida da divisão deve ser informada!',
				},
			},
		},
		min_capacity: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Capacidade minima não informada!',
				},
			},
		},
		max_capacity: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Capacidade maxima não informada!',
				},
			},
		},
		acceptance_criteria: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Critério de aceitação não informado!',
				},
			},
		},
		calibration_periodicity_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Periodicidade de calibração não informada!',
				},
			},
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: 'equipment',
		hooks: {
			beforeValidate: (instance, options) => {
				if (instance.description && typeof instance.description === 'string') {
					instance.description = instance.description.toUpperCase()
				}

				if (instance.identifier && typeof instance.identifier === 'string') {
					instance.identifier = instance.identifier.toUpperCase()
				}
			},
		},
	}
)

Equipment.belongsTo(EquipmentTypeModel, { foreignKey: 'equipment_type_id' })
EquipmentTypeModel.hasMany(Equipment, { foreignKey: 'equipment_type_id' })

Equipment.belongsTo(OwnerModel, { foreignKey: 'owner_id' })
OwnerModel.hasMany(Equipment, { foreignKey: 'owner_id' })

Equipment.belongsTo(UnityModel, {
	foreignKey: 'unity_id',
})
UnityModel.hasMany(Equipment, { foreignKey: 'unity_id' })

Equipment.belongsTo(CalibrationPeriodicityModel, {
	foreignKey: 'calibration_periodicity_id',
})
CalibrationPeriodicityModel.hasMany(Equipment, {
	foreignKey: 'calibration_periodicity_id',
})

export default Equipment
