// pages/api/reservations.js

import dbConnect from "../../utils/mydb";
import corsMiddleware from "../../utils/cors";
import Reservation from "../../models/Reservation";

export default async function handler(req, res) {
  /*   await corsMiddleware(req, res); */
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
        res.status(500).json({ success: false, error: "Server Error" });
      }
      break;
    case "POST":
      try {
        const reservation = await Reservation.create(body);
        res.status(201).json({ success: true, data: reservation });
      } catch (error) {
        res.status(400).json({ success: false, error: "Invalid data" });
      }
      break;
    case "PUT":
      try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
          id,
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updatedReservation) {
          return res
            .status(404)
            .json({ success: false, error: "Reservation not found" });
        }
        res.status(200).json({ success: true, data: updatedReservation });
      } catch (error) {
        res.status(400).json({ success: false, error: "Invalid data" });
      }
      break;
    case "DELETE":
      try {
        const deletedReservation = await Reservation.findByIdAndDelete(id);
        if (!deletedReservation) {
          return res
            .status(404)
            .json({ success: false, error: "Reservation not found" });
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
