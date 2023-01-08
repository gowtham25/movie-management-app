const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
const mongoose = require("mongoose");
const Movie = require("../models/movie");
const Director = require("../models/director");

CONNECTION_URL =
  "mongodb+srv://db1:2t7JJeS9jFIAmNVi@cluster0.md4o7us.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_URL);
mongoose.connection.once("open", () => {
  console.log("Connection to database has been established successfully");
});

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: new GraphQLList(DirectorType),
      resolve: (parent, args) => {
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    mailId: { type: GraphQLString },
    movie: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => {
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        mailId: { type: GraphQLString },
      },
      resolve(parent, args) {
        let director = new Director({
          name: args.name,
          age: args.age,
          mailId: args.mailId
        });
        return director.save();
      },
    },
    deleteDirector: {
        type: DirectorType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          return Director.findByIdAndDelete(args.id);
        },
      },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });
        return movie.save();
      },
    },
    editMovie: {
        type: MovieType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
          name: {type: GraphQLString},
          genre: {type: GraphQLString},
          directorId: {type: GraphQLString},
        },
        resolve(parent, args) {
          return Movie.findByIdAndUpdate(args.id, {name: args.name, genre: args.genre, directorId: args.directorId});
        },
      },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Movie.findByIdAndDelete(args.id);
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        return Director.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
