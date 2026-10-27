const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// validation
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride('_method'));

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

// Halaman form add data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: "Form tambah data contact",
    });
});

/// Proses tambah data contact
app.post(
    '/contact',
    [
        body('nama').custom(async (value) => {
            const duplicate = await Contact.findOne({ nama: value });

            if (duplicate) {
                throw new Error(
                    'Nama contact sudah tersedia, harap gunakan nama lain!'
                );
            }

            return true;
        }),

        check('email', 'Alamat email tidak valid!').isEmail(),

        check('nohp', 'Nomor telepon tidak valid!').isMobilePhone('ms-MY'),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('add-contact', {
                layout: 'layouts/main-layout',
                title: 'Form tambah data contact',
                errors: errors.array(),
            });
        }

        try {
            await Contact.insertMany(req.body);

            // Kirimkan flash message
            req.flash('msg', 'Data contact berhasil ditambahkan');

            res.redirect('/contact');
        } catch (error) {
            console.error(error);

            res.status(500).send('Gagal menambahkan data contact');
        }
    }
);

// Proses delete contact
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({nama: req.params.nama});

//   if (!contact) {
//     res.status(404);
//     res.send('<h1 align="center" style="margin: 8em auto;">404 Not Found</h1>');
//   } else {
//     Contact.deleteOne({ _id : contact._id }).then((result) => {
//         req.flash("msg", "Data contact tersebut berhasil dihapus");
//         res.redirect("/contact");
//     });
//   }
// });

app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama : req.body.nama }).then((result) => {
        req.flash("msg", "Data contact tersebut berhasil dihapus");
        res.redirect("/contact");
    });
});

// Halaman form ubah data contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    layout: "layouts/main-layout",
    title: "Form ubah data contact",
    contact: contact,
  });
});

// Proses ubah data contact
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplicate = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplicate) {
        throw new Error("Nama contact sudah tersedia!");
      }

      return true;
    }),
    check("email", "Alamat email tidak valid").isEmail(),
    check("nohp", "Nomor telepon tidak valid").isMobilePhone("ms-MY"),
  ], 
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        layout: "layouts/main-layout",
        title: "Form ubah data contact",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { 
          _id: req.body._id 
        },
        {
          $set: {
            nama: req.body.nama,
            nohp: req.body.nohp,
            email: req.body.email,
          },
        }
      ).then((result) => {
        req.flash("msg", "Data contact berhasil diubah");
        res.redirect("/contact");
      });
    }
  }
);

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

