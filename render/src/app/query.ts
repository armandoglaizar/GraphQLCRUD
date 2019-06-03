'use strict';

import gpl from 'graphql-tag';

export const Products = gpl`
    query {
        products {
            id,
            name,
            description
        }
    }`;

export const createProduct = gpl`
    mutation createProduct($name: String!, $description: String!) {
        createProduct(name: $name, description: $description) {
            id,
            name,
            description
        }
    }`;

export const updateProduct = gpl`
    mutation updateProduct($id: Int!, $name: String!, $description: String!) {
        updateProduct(id: $id, name: $name, description: $description) {
            id,
            name,
            description
        }
    }`;

export const deleteProduct = gpl`
    mutation deleteProduct($id: Int!) {
        deleteProduct(id: $id) {
            id,
            name,
            description
        }
    }`;