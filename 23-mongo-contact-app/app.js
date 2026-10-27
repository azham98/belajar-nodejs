const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

// setup EJS
app.set('view engine', 'ejs'); // Templating engine EJS
app.use(expressLayouts); // Third-party middleware
app.use(express.static('public')); // Built-in middleware
app.use(express.urlencoded({ extended: true }));

// Konfigurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// Halaman home
app.get('/', (req, res) => {
    const pegawai = [
        {
            nama: "Ajun Bagas",
            email: "ajunbagas@gmail.com"
        },
        {
            nama: "Sarah Apriliani",
            email: "sarahapr@gmail.com"
        },
        {
            nama: "Gustav Kennedy",
            email: "gustavken@gmail.com"
        }
    ];

    res.render('index', {
        layout: 'layouts/main-layout',
        title: "Homepage",
        email: "ujangs@yandex.com",
        pegawai: pegawai
    });
});

// Halaman about
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'About page',
    });
});

// Halaman contact
app.get('/contact', async (req, res) => {

    const contacts = await Contact.find();

    res.render('contact', {
        layout: 'layouts/main-layout',
        title: "Contact page",
        contacts: contacts,
        msg: req.flash('msg'),
    });
});

// Halaman detail contact
app.get('/contact/:nama', async (req, res) => {

    const contact = await Contact.findOne({ nama: req.params.nama });

    res.render('detail', {
        layout: 'layouts/main-layout',
        error: "Contact dengan nama tersebut tidak tersedia!",
        title: "Detail contact",
        contact: contact,
    });
});

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});

