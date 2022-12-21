import { sequelize } from "../db.js"
import Sequelize from "sequelize"
const DataTypes = Sequelize

export const StoreModel = sequelize.define(
	"Store",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		logo: {
			type: DataTypes.STRING,
			defaultValue: null,
		},
		user_id: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		tableName: "store",
	}
)
