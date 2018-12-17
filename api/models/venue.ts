import { initTable, putItem, getBatchItems } from "../db";

export interface VenueModel {
  id: string;
  title: string;
  description: string;
  instagramURL?: string;
  facebookURL?: string;
  websiteURL?: string;
  googleMapURL?: string;
  createdAt: number;
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

export const getBatchVenues = (venueIds: string[]) => {
  return getBatchItems(venueIds, tableName).then(res =>
    res && res.Responses ? (res.Responses[tableName] as VenueModel[]) : []
  );
};

export const initVenues = () => initTable(tableName, table);
