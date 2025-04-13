

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
  GraphQLEnumType,
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


    //add a client 
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
          }},

    //delete a client
    deleteClient:{
      type:ClientType,
      args:{
        id:{type: GraphQLNonNull(GraphQLID)},
      },
      resolve(parent,args){
        return Client.findByIdAndDelete(args.id);
      }
    } ,
    
    
    //add a project
    addProject:{
      type: ProjectType,
      args:{
        name:{type:GraphQLNonNull(GraphQLString)},
        description:{type:GraphQLNonNull(GraphQLString)},
        status:{type:new GraphQLEnumType({
          name:'ProjectStatus',
          values:{
            'new': {value: 'Not Started'},
            'progress': {value: 'In Progress'},
            'completed': {value: 'Completed'}
          }
        }),defaultValue:'Not Started'},
        clientId:{type:GraphQLNonNull(GraphQLID)},
      },
      resolve(parent,args){
        const project=Project({
          name:args.name,
          description:args.description,
          status:args.status,
          clientId:args.clientId
        });

        return project.save();
      },
    },

  
  //delete project mutation
  deleteProject:{
    type:ProjectType,
    args:{
      id:{type:GraphQLNonNull(GraphQLID)}
    },
    resolve(parent,args){
      return Project.findByIdAndDelete(args.id)
    }

  },

  //update the project
  updateProject:{
    type:ProjectType,
    args:{
      id:{type:GraphQLNonNull(GraphQLID)},
      name:{type:GraphQLString},
      description:{type:GraphQLString},
      status:{type:new GraphQLEnumType({
        name:'UpdatedProjectStatus',
        values:{
          'new': {value: 'Not Started'},
          'progress': {value: 'In Progress'},
          'completed': {value: 'Completed'}
        }
      }),defaultValue:'Not Started'}
    },
    resolve(parent,args){
      return Project.findByIdAndUpdate(args.id,
        {
          $set:{
            name:args.name,
            description:args.description,
            status:args.status,
          },
        },
        {
            new:true //if doesnot exist then create a new project data
        }
      );
    }
  }
      }
    })




module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation

});
