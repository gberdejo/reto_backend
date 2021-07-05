import type { AWS } from '@serverless/typescript';
import config from 'src/config';

const serverlessConfiguration: AWS = {
  service: 'aws-ts-api',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    buscarPeliculas: {
      handler: "src/app/handler.buscarPeliculas",
      events: [
        {
          http: {
            path: "peliculas",
            method: "get"
          }
        }
      ]
    },
    crearPelicula: {
      handler: "src/app/handler.crearPelicula",
      events: [
        {
          http: {
            path: "peliculas",
            method: "post"
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      PeliculasDynamoDbTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: "Retain",
        Properties: {
          TableName: config.tabla_peliculas,
          AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
            { AttributeName: 'titulo', AttributeType: 'S' }
          ],
          KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' },
            { AttributeName: 'titulo', KeyType: 'RANGE' },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
