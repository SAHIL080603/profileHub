const editpersonals=document.querySelectorAll("#edit-personal");
const editabout=document.getElementById("edit-about");
const editformheading=document.getElementById("editform-heading");
const innerform=document.getElementById("inner-form");
const profile=document.getElementById("profile");
const save=document.getElementById("save");
const user=profile.getAttribute('user');
const editimage=document.getElementById('edit-image');
const editskills=document.getElementById('edit-skills');
let uploadcheck=document.getElementById('upload-check');
const cur= JSON.parse(`${user}`);


for(let editpersonal of editpersonals){
    editpersonal.addEventListener('click',()=>{
      // console.log('hi');
      editformheading.innerText='Edit Your Personal Info';
      const str=`
      <div class="relative z-0 w-full mb-6 group">
        <label for="error" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Email Address</label>
        <input type="email" value="${cur.username}" name="email" id="error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input">
        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Be Careful! You will be Logged out as soon as you change and submit it</span> This Email will be used as your username when you sign in</p>
      </div>
      
      <div class="grid md:grid-cols-3 md:gap-6">
        <div class="mt-3 relative z-0 w-full group">
            <input value="${cur.firstname}" type="text" name="firstname" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
        </div>
        <div class="mt-3 relative z-0 w-full group">
            <input value="${cur.lastname}" type="text" name="lastname" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
        </div>
        <div class="mt-3 relative z-0 w-full group">
            <input value="${cur.telephone}" type="tel" pattern="[0-9]{10}" name="telephone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (1234567890)</label>
        </div>
      </div>
      
  `;
  innerform.innerHTML=str;
    })
}

editabout.addEventListener('click',()=>{
  editformheading.innerText='Edit About Yourself';
  const str=`
  <div>
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About Yourself</label>
      <input value="${cur.about}" type="text" name="about" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </div>
  `

  innerform.innerHTML=str;
})

editimage.addEventListener('click',()=>{
  editformheading.innerText='Change Profile Picture';
  const str=`<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
  <input accept="image/png, image/jpeg, image/jpg" name="image" id="image-input" class="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
  <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
  <a href="${cur.image}" target="_blank" class="mt-1 text-sm text-blue-500 hover:underline dark:text-gray-300">Old Image link</a>
  <p>After visiting old image link right click on image</p>
  <p>Click on save image as to save it on your local computer</p>
  <p class="text-red-500">If the link is not opening then may be you haven't uploded your profile photo yet</p>
  
  `;
  // console.log(cur.image);
  innerform.innerHTML=str;
})

let c=0;
let add=document.getElementById('add');

editskills.addEventListener('click',()=>{
  editformheading.innerText='Add Skills';
  const str=`
  <div>
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Input Skill</label>
      <input value="" type="text" name="skill" id="large-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </div>
  `;

  
  innerform.innerHTML=str;
  
  // console.log(cur.image);
  // innerform.innerHTML=str;
})

const editcertificates=document.getElementById('edit-certificates');

editcertificates.addEventListener('click',()=>{
  editformheading.innerText='Add Your Certificates';
  const str=`
  <div class="relative z-0 w-full mb-6 group">
    <input type="text" name="nameOfCertification" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type Of Certification</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
    <input type="text" name="issuingAuthority" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Issuing Institute</label>
  </div>
  `;

  
  innerform.innerHTML=str;
  
  // console.log(cur.image);
  // innerform.innerHTML=str;
})
const editexperiences=document.getElementById('edit-experiences');

editexperiences.addEventListener('click',()=>{
  editformheading.innerText='Add Your Experience';
  const str=`
  <div class="relative z-0 w-full mb-6 group">
    <input type="text" name="organization" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company</label>
  </div>

  <div class="grid md:grid-cols-2 md:gap-6">
        <div class="mt-3 relative z-0 w-full group">
            <input type="date" name="startdate" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Starting Date</label>
        </div>
        <div class="mt-3 relative z-0 w-full group">
            <input type="date" name="enddate" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ending Date</label>
        </div>
  </div>

  <div class="mt-5 relative z-0 w-full mb-5 group">
    <label >Timings</label>
    <div class="flex items-center mt-3 mb-4">
      <input id="default-radio-1" type="radio" value="Part-Time" name="timings" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
      <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Part Time</label>
    </div>
    <div class="flex items-center">
      <input checked id="default-radio-2" type="radio" value="Full-Time" name="timings" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
      <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Time</label>
    </div>
  </div>

  <div class="mt-5 relative z-0 w-full mb-5 group">
    <input type="text" name="role" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Role</label>
  </div>
  `;

  
  innerform.innerHTML=str;
})
const editeducation=document.getElementById('edit-education');

editeducation.addEventListener('click',()=>{
  editformheading.innerText='Add Your Education';
  const str=`
  <div class="relative z-0 w-full mb-6 group">
    <input type="text" name="schoolName" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">School/University/Institute</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
    <input type="text" name="course" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Course</label>
  </div>

  <div class="grid md:grid-cols-2 md:gap-6">
        <div class="mt-3 relative z-0 w-full group">
            <input type="Number" min='1500' max=9999 name="yearofenrollment" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enrollment Year</label>
        </div>
        <div class="mt-3 relative z-0 w-full group">
            <input type="Number" min='1500' max=9999 name="yearofpassingout" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passingout Year</label>
        </div>
  </div>

  <div class="mt-5 relative z-0 w-full mb-5 group">
    <input type="text" name="desc" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
  </div>
  `;

  
  innerform.innerHTML=str;
})







save.addEventListener('click',()=>{
  innerform.submit();
  save.innerHTML=`<div class="loadingio-spinner-rolling-s64mgscm44"><div class="ldio-9ytghyu6bbm">
  <div></div>
  </div></div>`;
  // console.log();
})



