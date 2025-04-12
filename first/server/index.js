const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const schema =require('./schema/schema')
const colors=require('colors')
const connectDB=require('./config/db');
const { connect } = require('mongoose');

require('dotenv').config();
const PORT= process.env.PORT || 5000;

const app=express();


//connnect to database
connectDB();


//graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV==="development"

}))

app.listen(PORT,console.log(`server is running on port ${PORT}`));