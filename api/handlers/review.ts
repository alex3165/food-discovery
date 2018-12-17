import { Request, Response } from "express";

import { putReview, getHotReview } from "../models/review";
import * as uuidv1 from "uuid/v1";
import * as moment from "moment";
import { getBatchVenues } from "../models/venue";

export const createReviewHandler = (req: Request, res: Response) => {
  return putReview({
    id: uuidv1(),
    createdAt: moment().unix(),
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
  return getHotReview()
    .then(reviews => {
      const ids = Array.from(new Set(reviews.map(review => review.venueId)));
      return Promise.all([getBatchVenues(ids), Promise.resolve(reviews)]);
    })
    .then(([venues, reviews]) => {
      res.status(200).send({ data: { reviews, venues } });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Couldn't retrieve hot reviews" });
    });
};
