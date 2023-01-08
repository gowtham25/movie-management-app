import { gql } from "@apollo/client";

const GET_DIRECTORS = gql`
  query getDirectors {
    directors {
      id
      name
      age
    }
  }
`;

export { GET_DIRECTORS }