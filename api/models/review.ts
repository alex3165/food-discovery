import { initTable, putItem } from "../db";

export interface ReviewModel {
  id: string;
  venueId: string;
  userId: string;

  rating: number; // 0 - 5
  date: string;
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
    }
  ],
  KeySchema: [
    {
      AttributeName: "id",
      KeyType: "HASH"
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

export const initReviews = () => initTable(tableName, table);
