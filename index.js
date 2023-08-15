if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express=require('express');
const app=express();
const path = require('path');
const mongoose=require('mongoose');
const User=require('./models/User');
const methodOverride=require('method-override');
const session=require('express-session');
const flash = require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const MongoStore = require('connect-mongo');
const { isLoggedIn } = require('./middleware');

const cloudinary=require('cloudinary');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })

const redis = require("redis");
const responseTime = require("response-time")


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/user-app';
const port = process.env.PORT || 3000;
const redis_port=process.env.PORT || 6379;

mongoose.connect(dbUrl)
    .then(console.log('Database Conneted!!'))
    .catch((err)=>{console.log(err)})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

const cloud_name= process.env.CLOUD_NAME;
const api_key= process.env.API_KEY;
const api_secret=process.env.API_SECRET;

cloudinary.v2.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
    secure: true,
  });

const secret= process.env.SECRET || 'weneedsomebettersecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 60 * 60 * 24 * 1
  })

const sessionConfig={
    store,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        // secure:true;
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
    }
}

app.use(session(sessionConfig));
app.use(passport.authenticate('session'));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.info=req.flash('info');
    res.locals.warning=req.flash('warning');
    res.locals.currentUser=req.user;
    next();
})


// ------------------------------------------------cacheing code here----------------------------

const client = redis.createClient({
    // host:'https://profilehub.onrender.com/',
    host: 'redis-server',
    port: redis_port,
});

// Handle errors
client.on("error", function (err) {
    console.log("Error: " + err);
  });
  
//   app.use(responseTime())


  

// --------------------------------------------------------------------------------------------------------------


app.get('/profile',isLoggedIn,(req,res)=>{
    const currentUser=req.user;
    // console.log(currentUser);
    // req.flash('success','Welcome Back');
    res.render('profile',{currentUser});
})
app.get('/edit/skills',isLoggedIn,async(req,res)=>{
    try{
        // const {id}=req.params;
        const {index}=req.query;
        const user=await User.findById(req.user._id);
        
        if(index){
            user.skills.splice(index,1);
        }
        
        await user.save();
        req.flash('success','skill deleted successfully');
        res.redirect('/profile');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/profile');
    }
})
app.get('/edit/certifications',isLoggedIn,async(req,res)=>{
    try{
        // const {id}=req.params;
        const {index}=req.query;
        const user=await User.findById(req.user._id);
        
        if(index){
            user.certifications.splice(index,1);
        }
        // console.log(index);
        
        await user.save();
        req.flash('success','certificate deleted successfully');
        res.redirect('/profile');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/profile');
    }
})
app.get('/edit/experiences',isLoggedIn,async(req,res)=>{
    try{
        // const {id}=req.params;
        const {index}=req.query;
        const user=await User.findById(req.user._id);
        
        if(index){
            user.experiences.splice(index,1);
        }
        // console.log(index);
        // console.log('hi');
        
        await user.save();
        req.flash('success','experiences deleted successfully');
        res.redirect('/profile');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/profile');
    }
})
app.get('/edit/education',isLoggedIn,async(req,res)=>{
    try{
        // const {id}=req.params;
        const {index}=req.query;
        const user=await User.findById(req.user._id);
        
        if(index){
            user.education.splice(index,1);
        }
        // console.log(index);
        // console.log('hi');
        
        await user.save();
        req.flash('success','education deleted successfully');
        res.redirect('/profile');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/profile');
    }
})
app.patch('/edit',isLoggedIn,upload.single('image'),async(req,res)=>{
    try{
        const {email,firstname,lastname,telephone,about,company,job,skill,nameOfCertification,issuingAuthority,
            organization,startdate,enddate,timings,role,
            schoolName,yearofenrollment,yearofpassingout,course,desc}=req.body;
        // const {id}=req.params;
        const user=await User.findById(req.user._id);
        user.username=email||user.username;
        user.email=email||user.email;
        user.firstname=firstname||user.firstname;
        user.lastname=lastname||user.lastname;
        user.telephone=telephone||user.telephone;
        user.about=about||user.about;
        user.company=company||user.company;
        user.job=job||user.job;
        
        let certificate={
            nameOfCertification:nameOfCertification,
            issuingAuthority:issuingAuthority,
        }

        let experience={
            organization:organization,
            starting:startdate,
            ending:enddate,
            timings:timings,
            role:role,
        }

        let education={
            schoolName:schoolName,
            yearofenrollment:yearofenrollment,
            yearofpassingout:yearofpassingout,
            course:course,
            desc:desc,
        }



        // console.log(education);
        let b=false;
        let img;
        if(req.file){
            // console.log(req.file);
            await cloudinary.v2.uploader.upload(
                req.file.path,
                { public_id: req.file.originalname },
                (error, result)=>{
                    if(error){
                        throw new Error(error);
                    }
                    req.flash('success','photo updated successfully');b=true;
                    img=result.url;
                }
            ); 
        }
        // console.log(req.file);
        // console.log(req.body);
        user.image = img|| user.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png';
        // console.log(user);
        //adding skills

        

        if(skill && !user.skills.includes(skill)){
            user.skills.unshift(skill);
            b=true;
            req.flash('success','skill added successfully');
        }

        if(nameOfCertification && issuingAuthority && !user.certifications.some(v=>{return v.nameOfCertification===nameOfCertification && v.issuingAuthority===issuingAuthority})){
            user.certifications.unshift({...certificate});b=true;
            req.flash('success','certificate added successfully');
        }

        if(organization && role && startdate && enddate && timings && !user.experiences.some(v=>{return (v.organization===organization && v.role===role && v.starting===startdate && v.ending===enddate) })){
            user.experiences.unshift({...experience});b=true;
            req.flash('success','experience added successfully');
        }

        if(schoolName && course && yearofenrollment && yearofpassingout && !user.education.some(v=>{return v.schoolName===schoolName && v.course===course})){
            user.education.unshift({...education});b=true;
            req.flash('success','education added successfully');
        }

        if(!b){
            req.flash('success','Profile Updated successfully');
        }
        
        await user.save();
        
        res.redirect('/profile');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/profile');
    }
})
app.get('/connection',isLoggedIn,async(req,res)=>{
    const currentUser=await User.findById(req.user._id).populate('connections');
    const cachedata=await client.get(currentUser.username);
    let users;
    if(cachedata){
        users=JSON.parse(cachedata);
        // console.log('hi');
        // return  res.render("connection",{users,currentUser});
    }else{
        users=await User.find();
        
        client.set(currentUser.username,JSON.stringify(users));
    }
    // console.log();
    
    // console.log('hi');
    // console.log(users);
    res.render('conections',{users,currentUser});
})

app.get('/connection/:id',isLoggedIn,async(req,res)=>{
    const currentUser=await User.findById(req.user._id);
    
    const {id}=req.params;
    const {add}=req.query;
    const user=await User.findById(id);
    if(!currentUser.connections.includes(id) && add==1){
        currentUser.connections.push(id);
        user.connections.push(req.user._id);
        req.flash('success','connection added successfully');
        // console.log('hi');
    }else if(add==0){
        currentUser.connections.pull({_id:id});
        user.connections.pull({_id:req.user._id});
        req.flash('error','connection removed successfully');
    }
    // console.log(currentUser);
    await currentUser.save();
    await user.save();
    res.redirect('/connection');
})

app.get('/signin',(req,res)=>{
    req.logout((err)=> {
        if (err) { return next(err); }
      });
    res.render('signin');
})

app.post('/signin',
    passport.authenticate('local', 
    { 
        failureRedirect: '/signin', 
        failureMessage: true, 
        failureFlash:true,
    }),
    function(req, res) {
        // console.log(req.body);
        req.flash('success',`Welcome back again ${req.user.username}`)
        // res.send('hi');
        res.redirect(`/profile`);
});


app.get('/signup',(req,res)=>{
    res.render('signup');
})
app.post('/signup',async(req,res)=>{
    try{
        const {email,password,firstname,lastname,telephone,about,company,job}=req.body;
        // let{telephone,phone,mobile}=req.body;
        // mobile=`+${phone} ${mobile}`;
        // console.log(`${email} ${password} ${firstname} ${lastname} ${telephone} ${about} ${company} ${job}`);
        const user=new User({username:email,email,firstname,lastname,telephone,about,company,job});
        // console.log(user);
        await User.register(user,password);
        req.flash('success','Registered Successfully');
        res.redirect('/signin');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }
    
})

app.get('/signout',isLoggedIn, (req, res) => {
    req.logout((err)=> {
        if (err) { return next(err); }
        req.flash('success', 'GoodBye!');
        res.redirect('/signin');
      });
})



app.listen(port,()=>{
console.log('started listening at 3000');

client.connect().then(()=> {
    console.log('redis is connected')
  })
});