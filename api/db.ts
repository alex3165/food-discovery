import * as AWS from "aws-sdk";
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

AWS.config.update({
  region: "eu-west-2"
});

const endpoint = "http://localhost:8000";

const dynamodb = new AWS.DynamoDB({
  endpoint
});

const docClient = new AWS.DynamoDB.DocumentClient({ endpoint });

export const getItemById = (
  id: string,
  tableName: string
): Promise<DynamoDB.DocumentClient.GetItemOutput> => {
  return new Promise((res, rej) => {
    return docClient.get({ Key: { id }, TableName: tableName }, (err, data) => {
      if (err) {
        return rej(err);
      }

      return res(data);
    });
  });
};

export const scanItems = (params: DocumentClient.ScanInput) => {
  return docClient.scan(params).promise();
};

export const putItem = <T = any>(
  params: DocumentClient.PutItemInput
): Promise<T> => {
  return new Promise((res, rej) => {
    docClient.put(params, (err, data) => {
      if (err) {
        return rej(err);
      }

      if (Object.keys(data).length) {
        console.log("Put item metrics: ", data);
      }

      return getItemById(params.Item.id, params.TableName)
        .then(data => {
          return res(data.Item as T);
        })
        .catch(err => {
          return rej(err);
        });
    });
  });
};

export const initTable = (
  tableName: string,
  tableConfig: DynamoDB.Types.CreateTableInput
) => {
  return new Promise((res, rej) => {
    dynamodb.listTables((err, { TableNames }) => {
      if (err) {
        rej(err);
      }

      if (!TableNames || !TableNames.includes(tableName)) {
        dynamodb.createTable(tableConfig, (err, data) => {
          if (err || !data) {
            return rej(err || { error: "Failed creating table" });
          }

          console.log(`Table ${tableName} created`, data);
          res(data);
        });
      } else {
        res({ tableName });
      }
    });
  });
};
