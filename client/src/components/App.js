import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './App.css';

const GET_PHOTOS = gql`
  {
    photos {
      id
      camera {
        full_name
        rover_id
      }
      img_src
      rover {
        name
        status
      }
    }
  }
`;

const Photo = ({ photo: { camera: {full_name, rover_id}, img_src, rover: {name, status} } }) => (
  <div>
    <h2><em>Camera:&nbsp;</em>{full_name}</h2>
    <h5>Rover Name: {name}</h5>
    <img src={img_src} alt="Pic" />
  </div>
)

const App = () => {
  const { data, loading, error } = useQuery(GET_PHOTOS);

  if (loading) return (
    <div className="container app-wrapper">
      <div className="jumbotron">
        <h1 className="display-4">Loading...</h1>
      </div>
    </div>
  )

  if (error) return (
    <div className="container app-wrapper">
      <div className="jumbotron">
        <h1 className="display-4">Something Went Wrong...</h1>
      </div>
    </div>
  )

  return (
    <div className="container app-wrapper">
      <div className="jumbotron">
        <h1 className="display-4">NASA Curiosity Mars Rover Images</h1>
      </div>
      {data.photos.map(photo => (
        <Photo key={photo.id} photo={photo} />
      ))}
    </div>
  );
}

export default App;
