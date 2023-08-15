const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
    // username:{
    //     type:String,
    //     unique:true,
    // },
    // password:String,

    //the above two fileds are automatically added by passport local no need to add yourself
    firstname:String,
    lastname: String,
    email:String,
    telephone:String,
    about:String,
    company:String,
    job:String,
    connections: [
        {
            type:mongoose.Schema.ObjectId,
            ref:'User',
        }
    ],
    image:String,
    skills:[
        {
            type : String,
        }
    ],
    certifications:[
        {
            nameOfCertification:String,
            issuingAuthority:String,

        }
    ],
    experiences:[
        {
            organization:String,
            starting:Date,
            ending:Date,
            timings:{
                type:String,
                enum:['Part-Time','Full-Time']
            },
            role:String,
        }
    ],
    education:[
        {
            schoolName:String,
            yearofenrollment:String,
            yearofpassingout:String,
            course:String,
            desc:String,

        }
    ]
    
    
})

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model('User',userSchema);

module.exports=User;