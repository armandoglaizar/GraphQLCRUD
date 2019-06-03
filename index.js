const express = require('express');
const app = express();

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var { getProducts, createProduct, deleteProduct, updateProduct } = require('./data/products');

var cors = require('cors');

var schema = buildSchema(`
    type Product {
        description: String, 
        name: String,
        id: Int
    },

    type Query {
        hello: String,
        products: [Product],
        product(id: Int!): Product
    },

    type Mutation {
        createProduct(name: String!, description: String!): Product,
        deleteProduct(id: Int!): [Product],
        updateProduct(id: Int!, name: String!, description: String!): Product
    }
`);

var root = {
    hello: () => {
        return "Hello World!";
    },

    products: () => {
        return getProducts();
    },

    product: ({ id }) => {
        const products = getProducts();
        return products.find(p => p.id === id);
    },

    createProduct: args => {
        const { name, description } = args;
        return createProduct(name, description);
    },

    deleteProduct: ({ id }) => {
        return deleteProduct(id);
    },

    updateProduct: args => {
        const { id, name, description } = args;
        return updateProduct(id, name, description);
    }
};

app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");