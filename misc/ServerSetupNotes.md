#Notes for setting up a new server:
* Set up a basic Ubuntu VM in AWS:
** get build-essential pkg
** install git if its not already available
** Also install "libzmq-dev" - a package related to ZeroRPC which is used for Nodejs communicating to Python

###I. Setting up web server
* Get code - clone from: https://github.com/dgaspari/tonetrainer.git
* Install node, npm:
** Follow instructions here for getting a nodejs pkg for the appropriate linux environment:
** https://nodejs.org/en/download/package-manager/
* Install grunt and bower globally (via npm with the -g flag). 
* Install dependencies for tonetrainer:
** Run "npm install" and "bower install" in the tonetrainer directory

###II. Setting up Python
* Get code - clone from: https://github.com/dgaspari/pyrapt.git
* Get Python 2.7 setup (if it isnt already)
** Is this a dedicated server? Just get Python 2.7 installed
** Otherwise get virtualenvwrapper and setup a virtualenv w 2.7 - this lets you install all the necessary packages independnet of everything else

