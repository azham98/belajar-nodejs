// Core Module
// File System

const fs = require('fs');

//menuliskan string ke file (synchronus)

// console.log(fs);

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });


rl.question('Inputkan nama Anda : ', (nama) => {
    rl.question('Inputkan nomor telepon Anda : ', (telp) => {
        const contact = { nama, telp };
        const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(fileBuffer);
        
        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

        console.log(`Terima kasih sudah menginputkan data! silakan coba lagi jika berkenan`);

        rl.close();
    });
})