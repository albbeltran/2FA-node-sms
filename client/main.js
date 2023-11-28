import Signup from "./modules/Signup.js"
import Signin from "./modules/Signin.js"
import Verify from "./modules/Verify.js"
import makeFetch from "./modules/request.js"

if(document.getElementById('signup-form')) new Signup(makeFetch)
if(document.getElementById('signin-form')) new Signin(makeFetch)
if(document.getElementById('verify-form')) new Verify(makeFetch)