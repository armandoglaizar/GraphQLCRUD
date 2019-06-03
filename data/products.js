var mysql = require('mysql');

var connection = mysql.createConnection({host: 'localhost', user: 'root', password: 'admin', database: 'tienda'});

const getProducts = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products', function (error, results) {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};

const createProduct = (name, description) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO products (name, description) VALUES ('${name}', '${description}')`, 
            function (error, results) {
                if(error) {
                    return reject(error);
                }
                return resolve({id: results['insertId'], name: name, description: description});
            }
        );
    });
};

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM products WHERE id=${id}`, function (error, results) {
            if(error) {
                return reject(error);
            }
            return resolve(getProducts());
        });
    });
};

const updateProduct = (id, name, description) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE products SET name='${name}', description='${description}' WHERE id=${id}`, 
            function (error, results) {
                if(error) {
                    return reject(error);
                }
                return resolve({id: id, name: name, description: description});
            }
        );
    });
}

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
};

/*let products = [
    {
        id: 1,
        name: "Coca Cola",
        description: "Bebida"
    },
    {
        id: 2,
        name: "Mantecadas",
        description: "Postre"
    },
    {
        id: 3,
        name: "Doritos",
        description: "Botana"
    },
];

const createProduct = (name, description) => {
    const id = products[products.length - 1].id + 1;
    const newProduct = { id, name, description };
    
    products = { ...newProduct };
    return { ...newProduct };
};

const getProducts = () => {
    return products;
};

const deleteProduct = (id) => {
    const product = products.find(x => x.id === id);
    const index = products.indexOf(product, 0);
    
    products.splice(index, 1);
    return products;
};

const updateProduct = (id, name, description) => {
    const product = products.find(x => x.id === id);
    const index = products.indexOf(product, 0);
    
    products[index].name = name;
    products[index].description = description;
    
    return products;
}*/