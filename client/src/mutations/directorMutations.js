import { gql } from "@apollo/client";

const ADD_DIRECTOR = gql`
  mutation addDirector($name: String!, $mailId: String!, $age: Int!) {
    addDirector(name: $name, mailId: $mailId, age: $age)  {
      name
      age
      mailId
    }
  }
`;

const DELETE_DIRECTOR = gql`
  mutation deleteDirector($id: ID!) {
    deleteDirector(id: $id) {
      name
      id
    }
  }
`;

export { DELETE_DIRECTOR, ADD_DIRECTOR };