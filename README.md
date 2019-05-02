# Pandabook

## Live Demo

To see the app in action, go to [https://pandabooks.herokuapp.com/](https://pandabooks.herokuapp.com/)

## Description

Pandabook is a RESTful webde application signed for panda fans to explore the pandas around the world. 

## Features

* Authentication:
  
  * User login with username and password

  * Administer sign-up with admin code

* Authorization:

  * User cannot manage posts and view user profile without being authenticated

  * User cannot edit or delete posts and comments created by other users

  * Administer can manage all posts and comments

* Manage pandabook posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload pandabook photos
  
  * Search existing pandabooks

* Manage user account with basic functionalities:

  * Profile page setup with sign-up

* Flash messages responding to users' interaction with the app

* Fuzzy search with key word

* Responsive web design

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [async](http://caolan.github.io/async/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [nodemailer](https://nodemailer.com/about/)
* [moment](https://momentjs.com/)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [Heroku](https://www.heroku.com/)
* [MongoDB Atlas](https://cloud.mongodb.com)
* [Cloud9](https://aws.amazon.com/cloud9/?origin=c9io)