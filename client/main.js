import Signup from "./modules/Signup.js"
import Signin from "./modules/Signin.js"
import Verify from "./modules/Verify.js"

if(document.getElementById('signup-form')) new Signup()
if(document.getElementById('signin-form')) new Signin()
if(document.getElementById('verify-form')) new Verify()