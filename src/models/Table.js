// models/Table.js

import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  group: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Table || mongoose.model("Table", TableSchema);
