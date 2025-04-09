const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const schema =require('./schema/schema')


require('dotenv').config();
const PORT= process.env.PORT || 5000;



const app=express();


//graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV==="development"

}))

app.listen(PORT,console.log(`server is running on port ${PORT}`));