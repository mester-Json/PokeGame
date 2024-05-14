const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: 'localhost',
    user: '',
    database: 'My-bot',
    password: '',
});

connection.connect(function (err) {
    if (err) {
        console.error('Erreur de connexion à la base de données : ' + err.stack);
        return;
    }
    console.log('Connecté à la base de données.');
}

)

module.exports = connection;