import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'

async function initServer() {
    const app = express()
    app.use(cors())
    dotenv.config()
    const apolloServer = new ApolloServer({ typeDefs, resolvers })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app })
    app.use((req, res) => {
        // res.status(200)
        res.send("Welcome to ckmobile")
        //  res.end()
    })
    const PORT = process.env.PORT || 5000;
    try {
        await mongoose.connect(process.env.mongodb);
        console.log(`MongoDB connected on PORT ${PORT}`)
    } catch (error) {
        console.log(error)
    }


    app.listen(PORT, () => {
        console.log(`Server started on PORT ${PORT}`)
    }
    )
}
initServer()