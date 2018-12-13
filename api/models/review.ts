import { initTable, putItem, scanItems } from "../db";
import moment = require("moment");

export interface ReviewModel {
  id: string;
  venueId: string;
  userId: string;

  rating: number; // 0 - 5
  createdAt: number;
  title: string;
  description: string;
  instagramURL?: string;
}

const tableName = "REVIEWS";

const table = {
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S"
    },
    {
      AttributeName: "createdAt",
      AttributeType: "N"
    }
  ],
  KeySchema: [
    {
      AttributeName: "id",
      KeyType: "HASH"
    },
    {
      AttributeName: "createdAt",
      KeyType: "RANGE"
    }
  ],
  TableName: tableName,
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  StreamSpecification: {
    StreamEnabled: false
  }
};

export const putReview = (review: ReviewModel) => {
  return putItem({
    Item: review,
    TableName: tableName
  });
};

const scanParams = {
  TableName: "REVIEWS",
  ProjectionExpression: "#ca",
  FilterExpression: "#ca between :start_yr and :end_yr",
  ExpressionAttributeNames: {
    "#ca": "createdAt"
  },
  ExpressionAttributeValues: {
    ":start_yr": moment()
      .subtract(1, "year")
      .unix(),
    ":end_yr": moment()
      .add(1, "year")
      .unix()
  }
};

export const getHotReview = () => scanItems(scanParams);
export const initReviews = () => initTable(tableName, table);
