const db = require('../../database/db');

const resolvers = {
    Query: {
        // 2.3 - Consultas a tablas
        getPoets: async (_, { first_name }) => {
            const query = db.select().table('Poet');
            if (first_name) {
                query.where('first_name', 'like', `%${first_name}%`);
            }
            return await query;
        },
        getPoems: async () => await db.select().table('Poem'),
        getCustomers: async () => await db.select().table('Customer'),

        // 2.4 - Procedimientos almacenados
        spPoetPoem: async () => {
            const result = await db.raw('CALL sp_poet_poem()');
            return result[0][0];
        },
        spSaleCustomer: async () => {
            const result = await db.raw('CALL sp_sale_customer()');
            return result[0][0];
        },
        spPublicationPoem: async () => {
            const result = await db.raw('CALL sp_publication_poem()');
            return result[0][0];
        },
    },

    Mutation: {
        // 2.5 - Altas
        createPoet: async (_, { first_name, surname, address, postcode, telephone_number }) => {
            await db('Poet').insert({ first_name, surname, address, postcode, telephone_number });
            return { success: true, message: 'Poeta creado correctamente' };
        },
        createPoem: async (_, { poem_title, poem_contents, poet_code }) => {
            await db('Poem').insert({ poem_title, poem_contents, poet_code });
            return { success: true, message: 'Poema creado correctamente' };
        },
        createCustomer: async (_, { first_name, surname, address, postcode, telephone_number }) => {
            await db('Customer').insert({ first_name, surname, address, postcode, telephone_number });
            return { success: true, message: 'Cliente creado correctamente' };
        },

        // 2.6 - Modificaciones
        updateCustomer: async (_, { customer_code, first_name, surname, address, postcode, telephone_number }) => {
            await db('Customer').where({ customer_code }).update({ first_name, surname, address, postcode, telephone_number });
            return { success: true, message: 'Cliente actualizado' };
        },
        updatePublication: async (_, { publication_code, title, price }) => {
            await db('Publication').where({ publication_code }).update({ title, price });
            return { success: true, message: 'Publicación actualizada' };
        },

        // 2.7 - Bajas
        deletePoemPublication: async (_, { poem_code, publication_code }) => {
            await db('Poem_Publication').where({ poem_code, publication_code }).del();
            return { success: true, message: 'Relación eliminada' };
        },
    },
};

module.exports = resolvers;