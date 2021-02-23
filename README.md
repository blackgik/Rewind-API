API Documentation for this project can be found at rewind-apidocs.netlify.app

REWIND API -->
SUMMARY: The rewind api is used to create a movie streaming platform. The idea of the movie streaming platform is to enable users to have a feel of their past and ensure that that they get the happiness they got when they were kids. Below is a well documented flow of the folders and the routes they hold.

This API was hosted on heroku:
Web Url: https://rewind-api.herokuapp.com/

folders:

Rewind-API
    |
    |   CHILD BRANCH 
    |           
    |______config
    |       |
    |       |_dev.env
    |
    |_______node_modules -->contains modules imported
    |
    |_______src
            |___controllers
            |        |___userRoleAuth.js(where all functionality for the users lie )
            |___db
            |   |___(this is where connection to the data base was initiated)
            |
            |___helpers (video test were ran here and this folder is of no importance)
            |
            |
            |___middle ware
            |   |___auth.js (auth.js lies the file where we ensure that a user is given autherization before
            |       accessing some features)

            |
            |
            |___model
                |___catogoryModel.js (creates a organized table format of storing data for the movies, which includes title decription;)
                |___MoviesModel.js (contains the tablular form of how the movie characteristics will be stored) 
                |___Usermodel.js (contains the tabular form of how the user characteristics will be stored)
            |
            |___rewind-photo --contains welcome and verify images that will be served when you recieve an email
            |
            |___routers (this contains all the routes for different functionality)
                |
                | 
                |___category.js (for routing the categories to their exact location)
                |
                |___Movies.js (for performing the crud operation on the movie routes)
                |
                |___ThirdParty.js (created for routing the third parties)
                |
                |___Users.js (user route Crud operation for users)
            |
            |
            |___routes (serving the routers routes to be called by the server)
            |
            |
            |___services (authenticating the users with the third party verification)
            |
            |
            |___index.js --serving the routes to the server.
            
.....................................................................................................
App Deployed on the web>
SRC: https://rewind-api.herokuapp.com/

create a new user (POST request)
https://rewind-api.herokuapp.com/users/sign-up

username -> not required 
email - required
password - required
confirmPassword -required


create a new admin (POST REQUEST)
https://rewind-api.herokuapp.com/users/admin-sign-up

username -> not required 
email - required
password - required
confirmPassword -required

Verify Email address (GET REQUEST)
https://rewind-api.herokuapp.com/users/verify-email

forgot password route (POST REQUEST)
https://rewind-api.herokuapp.com/users/forgot-password

Reset Password Route (POST REQUEST)
https://rewind-api.herokuapp.com/users/reset-password

login the users (POST REQUEST)
https://rewind-api.herokuapp.com/users/login

email
password

login the admin (POST REQUEST)
https://rewind-api.herokuapp.com/users/login-admin

email
password

viewing your profile (GET REQUEST)
https://rewind-api.herokuapp.com/users/me

getting total amount of movies (GET REQUEST)
https://rewind-api.herokuapp.com/users/get-all-users

Loggin out from a single account (POST REQUEST)
https://rewind-api.herokuapp.com/users/logout

user logging out from all devices (POST REQUEST)
https://rewind-api.herokuapp.com/users/logoutall

User Fetching his profile picture (POST REQUEST)
https://rewind-api.herokuapp.com/users/me/avatar

user serving his profile picture to the display (GET RTEQUEST)
https://rewind-api.herokuapp.com/users/:id/avatar (where id is the users' id)

user updating his profile (PATCH REQUEST)
https://rewind-api.herokuapp.com/users/me/update

User Deleting his account (DELETE REQUEST)
https://rewind-api.herokuapp.com/users/users/me

randomly fetching a user (DELETE REQUEST)
https://rewind-api.herokuapp.com/users/user

removing the profile picture (DELETE REQUEST)
https://rewind-api.herokuapp.com/users/me/avatar
