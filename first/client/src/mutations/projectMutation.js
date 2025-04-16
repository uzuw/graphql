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



const ADD_PROJECTS=gql`
mutation AddProject($name:String!, $description:String, $status:String!){
    deleteProject(id:$id){
    id
    name
    description
    status
    }
}
`;


