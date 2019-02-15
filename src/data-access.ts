import i18n = require('i18n')
import sqlite3 from 'sqlite3';

// initialize database
let dataSource = new sqlite3.Database(`${__dirname}/../db/probot.db`, (err) => {
    if(err) throw i18n.__('Failed to connect to the database.');
    console.log(i18n.__('Successfully connected to the database.'))
});

