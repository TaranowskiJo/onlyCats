const mongoose = require('mongoose');

const db_name = "onlyCatsDB";

mongoose.connect(`mongodb://localhost/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log(`Established a connection to the database, ${db_name}`))
    .catch(err => console.log(`Something went wrong when connecting to the database, ${db_name}`, err));
