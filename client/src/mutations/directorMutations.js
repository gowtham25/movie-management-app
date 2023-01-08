import { gql } from "@apollo/client";

const DELETE_DIRECTOR = gql`
  mutation deleteDirector($id: ID!) {
    deleteDirector(id: $id) {
      name
      id
    }
  }
`;

export { DELETE_DIRECTOR };