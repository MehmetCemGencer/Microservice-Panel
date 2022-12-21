import { sequelize } from "../db.js"
import Sequelize from "sequelize"
const DataTypes = Sequelize

export const ProductModel = sequelize.define(
	"Product",
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
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		pictures: {
			type: DataTypes.ARRAY(DataTypes.STRING),
		},
		store_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "product",
	}
)
