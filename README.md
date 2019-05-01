#Pandabook

##Initial Setup
* Add Landing Page
* Add Pandabooks Page that lists all pandabooks

Each Pandabook has:
   * Name
   * Image

##Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

##Creating New Pandabooks
* Setup new pandabook POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

##Style the pandabooks page
* Add a better header/title
* Make pandabooks display in a grid

##Style the Navbar and Form
* Add a navbar to all templates
* Style the new pandabook form

##Add Mongoose
* Install and configure Mongoose
* Setup pandabook model
* Use pandabook model inside of our routes

##Show Page
* Review the RESTful routes we've seen so far
* Add description to our pandabook model
* Show db.collection.drop()
* Add a show route/template

##Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

##Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

##Add the Comment model!
* Make our errors go away!
* Display comments on pandabook show page

##Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

##Style Show Page
* Add sidebar to show page
* Display comments nicely

##Finish Styling Show Page
* Add public directory
* Add custom stylesheet

##Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model 

##Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth Pt. 3 - Login
* Add login routes
* Add login template

##Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

##Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar 

##Refactor The Routes
* Use Express router to reoragnize all routes

##Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

##Users + Pandabooks
* Prevent an unauthenticated user from creating a pandabook
* Save username+id to newly created pandabook

# Editing Pandabooks
* Add Method-Override
* Add Edit Route for Pandabooks
* Add Link to Edit Page
* Add Update Route

#Deleting Pandabooks
* Add Destroy Route
* Add Delete button

#Authorization Part 1: Pandabooks
* User can only edit his/her pandabooks
* User can only delete his/her pandabooks
* Hide/Show edit and delete buttons

#Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

<!--/pandabooks/:id/edit-->
<!--/pandabooks/:id/comments/:comment_id/edit-->

#Deleting Comments
* Add Destroy route
* Add Delete button

#Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

#Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header


RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dogs
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

INDEX   /pandabooks
NEW     /pandabooks/new
CREATE  /pandabooks
SHOW    /pandabooks/:id

NEW     pandabooks/:id/comments/new    GET
CREATE  pandabooks/:id/comments      POST