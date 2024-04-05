// pages/api/tables.js

import dbConnect from "../../utils/mydb";
import Table from "../../models/Table";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;

  // API logic
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (id) {
          const table = await Table.findById(id);
          if (!table) {
            return res
              .status(404)
              .json({ success: false, error: "Table not found" });
          }
          res.status(200).json({ success: true, data: table });
        } else {
          const tables = await Table.find({});
          res.status(200).json({ success: true, data: tables });
        }
      } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
      }
      break;
    case "POST":
      try {
        const table = await Table.create(body);
        res.status(201).json({ success: true, data: table });
      } catch (error) {
        res.status(400).json({ success: false, error: "Invalid data" });
      }
      break;
    case "PUT":
      try {
        const updatedTable = await Table.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!updatedTable) {
          return res
            .status(404)
            .json({ success: false, error: "Table not found" });
        }
        res.status(200).json({ success: true, data: updatedTable });
      } catch (error) {
        res.status(400).json({ success: false, error: "Invalid data" });
      }
      break;
    case "DELETE":
      try {
        const deletedTable = await Table.findByIdAndDelete(id);
        if (!deletedTable) {
          return res
            .status(404)
            .json({ success: false, error: "Table not found" });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
      }
      break;
    default:
      res
        .status(405)
        .json({ success: false, error: `Method ${method} not allowed` });
      break;
  }
}
