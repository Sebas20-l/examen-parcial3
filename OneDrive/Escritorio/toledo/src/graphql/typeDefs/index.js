const { gql } = require('apollo-server');

const typeDefs = gql`

    type Poet {
        poet_code: ID
        first_name: String
        surname: String
        address: String
        postcode: String
        telephone_number: String
    }

    type Poem {
        poem_code: ID
        poem_title: String
        poem_contents: String
        poet_code: ID
    }

    type Customer {
        customer_code: ID
        first_name: String
        surname: String
        address: String
        postcode: String
        telephone_number: String
    }

    type PoetPoemView {
        poet_code: ID
        first_name: String
        surname: String
        poem_code: ID
        poem_title: String
        poem_contents: String
    }

    type SaleCustomerView {
        sale_code: ID
        date: String
        amount: Float
        customer_code: ID
        first_name: String
        surname: String
        telephone_number: String
    }

    type PublicationPoemView {
        publication_code: ID
        publication_title: String
        price: Float
        poem_code: ID
        poem_title: String
    }

    type MutationResponse {
        success: Boolean
        message: String
    }

    type Query {
        getPoets(first_name: String): [Poet]
        getPoems: [Poem]
        getCustomers: [Customer]
        spPoetPoem: [PoetPoemView]
        spSaleCustomer: [SaleCustomerView]
        spPublicationPoem: [PublicationPoemView]
    }

    type Mutation {
        createPoet(first_name: String!, surname: String!, address: String, postcode: String, telephone_number: String): MutationResponse
        createPoem(poem_title: String!, poem_contents: String, poet_code: Int!): MutationResponse
        createCustomer(first_name: String!, surname: String!, address: String, postcode: String, telephone_number: String): MutationResponse
        updateCustomer(customer_code: ID!, first_name: String, surname: String, address: String, postcode: String, telephone_number: String): MutationResponse
        updatePublication(publication_code: ID!, title: String, price: Float): MutationResponse
        deletePoemPublication(poem_code: Int!, publication_code: Int!): MutationResponse
    }
`;

module.exports = typeDefs;