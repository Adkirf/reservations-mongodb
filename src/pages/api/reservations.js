// pages/api/reservations.js

import dbConnect from "../../utils/mydb";
import Reservation from "../../models/Reservation";
import User from "../../models/User";
import Table from "../../models/Table";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const {
    method,
    body: { email, name, peopleCount, reservationDate },
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        res.setHeader("Cache-Control", "no-store, max-age=0");
        if (id) {
          const reservation = await Reservation.findById(id);
          if (!reservation) {
            return res
              .status(404)
              .json({ success: false, error: "Reservation not found" });
          }
          res.status(200).json({ success: true, data: reservation });
        } else {
          const reservations = await Reservation.find({});
          res.status(200).json({ success: true, data: reservations });
        }
      } catch (error) {
        res
          .status(500)
          .json({ success: false, error: "Error in reservation GET" });
      }
      break;
    case "POST":
      try {
        // Find or create user
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({ email, name });
        }

        const startDate = new Date(reservationDate);
        const endDate = new Date(startDate.getTime() + 90 * 60000);

        const capableTables = await Table.find({
          capacity: { $gte: peopleCount },
        });

        const intersectingReservations = await Reservation.find({
          $or: [
            {
              start: {
                $gte: startDate,
                $lte: endDate,
              },
            },
            { end: { $gte: startDate, $lte: endDate } },
          ],
        });

        const capableTableIds = capableTables.map((table) => table._id);

        const intersectingTableIds = intersectingReservations.map(
          (reservation) => reservation.tableId
        );

        const availableTables = capableTableIds
          .filter((tableId) => !intersectingTableIds.includes(tableId))
          .sort(
            (a, b) =>
              Math.abs(a.capacity - peopleCount) -
              Math.abs(b.capacity - peopleCount)
          );

        if (availableTables.length === 0) {
          return res.status(400).json({
            success: false,
            error: "No available table for the given time",
          });
        }

        const reservation = await Reservation.create({
          userId: user._id,
          tableId: availableTables[0]._id,
          peopleCount: peopleCount,
          start: startDate,
          end: endDate,
        });

        res.status(201).json({ success: true, data: reservation });
      } catch (error) {
        console.log("Sdkaskdaskdn");
        console.error(error);
        res
          .status(400)
          .json({ success: false, error: "Error in reservation POST" });
      }
      break;
    case "PUT":
      // Your PUT logic
      break;
    case "DELETE":
      // Your DELETE logic
      break;
    default:
      res
        .status(405)
        .json({ success: false, error: `Method ${method} not allowed` });
      break;
  }
}
