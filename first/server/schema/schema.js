

//mongoose models
const Project=require('../models/Project')
const Client=require('../models/Client')


const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  graphql,
  GraphQLNonNull,
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
      return Client.findById(parent.clientId)
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
            return Client.find();
        }
    },

    //single client taking args id
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return LClient.findById(args.id)
      },
    },


    //for multiple projects
    projects:{
      type: GraphQLList(ProjectType),
      //no need of args
      resolve(parent,args){
          return Project.find();
      }
  },


  project: {
    type: ProjectType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Project.findById(args.id)
    },
  },
  },
});

//Mutations
const mutation= new GraphQLObjectType({

  name:'Mutation',
  fields:{
    addClient:{
      type:ClientType,
      args:{
            name:{type: GraphQLNonNull(GraphQLString)},
            email:{type: GraphQLNonNull(GraphQLString)},
            phone:{type: GraphQLNonNull(GraphQLString)}
          },
          resolve(parent,args){
            const client=new Client({
              name: args.name,
              email:args.email,
              phone: args.phone,
            });
            return client.save();
          }
        }
      }
    })




module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation

});
