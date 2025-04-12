const { projects, clients } = require('../sampleData');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },

    //for client id from client type
    client:{
      type: ClientType,
    resolve(parent,args){
      return clients.find(client=>client.id===parent.clientId)
    }
    }
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    //for multiple clients
    clients:{
        type: GraphQLList(ClientType),
        //no need of args
        resolve(parent,args){
            return clients;
        }
    },

    //single client taking args id
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id);
      },
    },


    //for multiple projects
    projects:{
      type: GraphQLList(ProjectType),
      //no need of args
      resolve(parent,args){
          return projects;
      }
  },


  project: {
    type: ProjectType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return projects.find((project) => project.id === args.id);
    },
  },
  },
});


module.exports = new GraphQLSchema({
  query: RootQuery,
});
