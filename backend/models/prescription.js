// models/Prescription.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Prescription = db.define('Prescription', {
  pres_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  u_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'u_id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'prescription',
  timestamps: false,
});

export default Prescription;
