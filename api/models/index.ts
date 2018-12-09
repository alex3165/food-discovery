import { initVenues } from "./venue";
import { initReviews } from "./review";

export const initModels = () => Promise.all([initVenues(), initReviews()]);
