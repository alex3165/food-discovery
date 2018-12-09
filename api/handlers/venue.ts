import { Request, Response } from "express";
import { putVenue } from "../models/venue";
import * as uuidv1 from "uuid/v1";

export const createVenueHandler = (req: Request, res: Response) => {
  putVenue({
    id: uuidv1(),
    ...req.body
  })
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: "Couldn't create venue" });
    });
};

export const getVenueHandler = (req: Request, res: Response) => {
  res.status(200).send({});
};
