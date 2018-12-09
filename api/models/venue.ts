import { initTable, putItem } from "../db";

export interface VenueModel {
  id: string;
  title: string;
  description: string;
  instagramURL?: string;
  facebookURL?: string;
  websiteURL?: string;
  googleMapURL?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const tableName = "VENUES";

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

export const putVenue = (venue: VenueModel) => {
  return putItem<VenueModel>({
    Item: venue,
    TableName: tableName
  });
};

export const initVenues = () => initTable(tableName, table);
