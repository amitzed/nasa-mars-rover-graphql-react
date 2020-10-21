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


  <div className="card photo-wrapper" style={{width: '18rem'}}>
    <a href={img_src} target="_blank" className="image-link"><img src={img_src} alt="Rover Image" className="card-img-top" /></a>
    <div className="card-body">
      <h6 className="card-text">{full_name}</h6>
      <p className="card-text">Rover Name: {name}</p>
    </div>
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
      <div className="row">
        <div className="col">
          {data.photos.map(photo => (
            <Photo key={photo.id} photo={photo} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
