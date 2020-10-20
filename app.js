const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type Photo {
    id: ID
    camera: String
    img_src: String
    rover: String
  }

  type Query {
    photos: [Photo]
  }
`;
