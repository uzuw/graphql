import {gql} from "@apollo/client";

const DELETE_PROJECTS=gql`
mutation deleteProject($id:ID){
    deleteProject(id:$id){
    id
    name
    description
    status
    }
}
`;



const ADD_PROJECT = gql`
  mutation AddProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!) {
    addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
      id
      name
      description
      status
      client {
        id
        name
      }
    }
  }
`;

export {DELETE_PROJECTS, ADD_PROJECT}

