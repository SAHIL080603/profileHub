if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose=require('mongoose');
const User=require('./models/User');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/user-app';

mongoose.connect(dbUrl)
    .then(console.log('Database Conneted!!'))
    .catch((err)=>{console.log(err)})


const users=[
    {
        username:'max@gmail.com',
        firstname:'Max',
        lastname:'Kumar',
        email:"max@gmail.com",
        telephone:'1234567890',
        about:'Lorem ipsum dolor',
        company:'OruPhones',
        job:'Full Stack Developer',
        connections: [],
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png',
        
    },
    {
        username:'bob@gmail.com',
        firstname:'Bob',
        lastname:'Singh',
        email:"bob@gmail.com",
        telephone:'9876543210',
        about:'Lorem ipsum dolor',
        company:'OruPhones',
        job:'Full Stack Developer',
        connections: [],
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png',
        
    },
    {
        username:'max2@gmail.com',
        firstname:'Max2',
        lastname:'Kumar',
        email:"max@gmail.com",
        telephone:'1234567890',
        about:'Lorem ipsum dolor',
        company:'OruPhones',
        job:'Full Stack Developer',
        connections: [],
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png',
        
    },
    {
        username:'bob2@gmail.com',
        firstname:'Bob2',
        lastname:'Singh',
        email:"bob@gmail.com",
        telephone:'9876543210',
        about:'Lorem ipsum dolor',
        company:'OruPhones',
        job:'Full Stack Developer',
        connections: [],
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png',
        
    },
    {
        username:'max3@gmail.com',
        firstname:'Max3',
        lastname:'Kumar',
        email:"max@gmail.com",
        telephone:'1234567890',
        about:'Lorem ipsum dolor',
        company:'OruPhones',
        job:'Full Stack Developer',
        connections: [],
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png',
        
    },
    {
        username:'bob3@gmail.com',
        firstname:'Bob3',
        lastname:'Singh',
        email:"bob@gmail.com",
        telephone:'9876543210',
        about:'Lorem ipsum dolor',
        company:'OruPhones',
        job:'Full Stack Developer',
        connections: [],
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png',
        
    },
    {
        username:'max4@gmail.com',
        firstname:'Max4',
        lastname:'Kumar',
        email:"max@gmail.com",
        telephone:'1234567890',
        about:'Lorem ipsum dolor',
        company:'OruPhones',
        job:'Full Stack Developer',
        connections: [],
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png',
        
    },
    {
        username:'bob4@gmail.com',
        firstname:'Bob4',
        lastname:'Singh',
        email:"bob@gmail.com",
        telephone:'9876543210',
        about:'Lorem ipsum dolor',
        company:'OruPhones',
        job:'Full Stack Developer',
        connections: [],
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png',
        
    },
    {
        username:'max5@gmail.com',
        firstname:'Max5',
        lastname:'Kumar',
        email:"max@gmail.com",
        telephone:'1234567890',
        about:'Lorem ipsum dolor',
        company:'OruPhones',
        job:'Full Stack Developer',
        connections: [],
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png',
        
    },
    {
        username:'bob5@gmail.com',
        firstname:'Bob5',
        lastname:'Singh',
        email:"bob@gmail.com",
        telephone:'9876543210',
        about:'Lorem ipsum dolor',
        company:'OruPhones',
        job:'Full Stack Developer',
        connections: [],
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png',
        
    },
]


async function seedDB(){
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Users seeded');
}

seedDB();