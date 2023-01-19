import React from "react";
import { MDBCol } from "mdbreact";

const Movies = () => {
  return (
    <MDBCol md="8">
      <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
    </MDBCol>
  );
}

export default Movies;

