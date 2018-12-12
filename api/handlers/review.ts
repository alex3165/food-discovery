import { Request, Response } from "express";

import { putReview } from "../models/review";
import * as uuidv1 from "uuid/v1";
import * as moment from "moment";

export const createReviewHandler = (req: Request, res: Response) => {
  return putReview({
    id: uuidv1(),
    date: req.body.date || moment().format(),
    ...req.body,
    userId: res.locals.profile.sub
  })
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: "Couldn't create review" });
    });
};

export const getHotReviewsHandler = (req: Request, res: Response) => {
  return;
};
