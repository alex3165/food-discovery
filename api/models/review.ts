import { initTable, putItem, scanItems } from "../db";

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

const scanParams = {
  TableName: "REVIEWS"
};

export const getHotReview = (offset: number = 1, length: number = 20) =>
  scanItems(scanParams).then(res => {
    if (res.Items) {
      return res.Items.filter((_, index) => {
        return index >= (offset - 1) * length && index <= offset * length;
      }) as ReviewModel[];
    }

    return [];
  });

export const initReviews = () => initTable(tableName, table);
