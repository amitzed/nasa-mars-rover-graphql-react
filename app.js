const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type Camera {
    full_name: String
    rover_id: Int
  }

  type Rover {
    name: String
    status: String
  }

  type Photo {
    id: ID
    camera: Camera
    img_src: String
    rover: Rover
  }

  type Query {
    photos: [Photo]
  }
`;

const resolvers = {
  Query: {
    photos: async () => {
      try {
        const photos = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY')
        return photos.data.photos.map(({ id, camera, img_src, rover }) => ({
          id,
          camera,
          img_src,
          rover
        }))
      } catch (error) {
        throw error
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen()
.then(({ url }) => console.log(`The server is ready at ${url}`));
