// pages/api/users.js

import dbConnect from "../../utils/mydb";
import User from "../../models/User";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (id) {
          res.setHeader("Cache-Control", "no-store, max-age=0");
          const user = await User.findById(id);
          if (!user) {
            return res
              .status(404)
              .json({ success: false, error: "User not found" });
          }
          res.status(200).json({ success: true, data: user });
        } else {
          const users = await User.find({});
          res.status(200).json({ success: true, data: users });
        }
      } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
      }
      break;
    case "POST":
      try {
        const user = await User.create(body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: "Invalid data" });
      }
      break;
    case "PUT":
      try {
        const updatedUser = await User.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!updatedUser) {
          return res
            .status(404)
            .json({ success: false, error: "User not found" });
        }
        res.status(200).json({ success: true, data: updatedUser });
      } catch (error) {
        res.status(400).json({ success: false, error: "Invalid data" });
      }
      break;
    case "DELETE":
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res
            .status(404)
            .json({ success: false, error: "User not found" });
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
