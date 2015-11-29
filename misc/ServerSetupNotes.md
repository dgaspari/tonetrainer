#Notes for setting up a new server:
* Set up a basic Ubuntu VM in AWS:
** get build-essential pkg
** install git if its not already available
** make sure VM can work with a sqlite DB via this command: "sudo apt-get install sqlite3 libsqlite3-dev"
** Also install "libzmq3, libzmq3-dev" - a package related to ZeroRPC which is used for Nodejs communicating to Python

###I. Setting up web server
* Get code - clone from: https://github.com/dgaspari/tonetrainer.git
* Install node v0.12
** Run this command: curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
** Then: sudo apt-get install nodejs
* Install grunt and bower globally (via npm with the -g flag). 
* Install dependencies for tonetrainer:
** Run "npm install" and "bower install" in the tonetrainer directory
* Build application: "grunt build" and see if there are any errors
* Troubleshooting:
** If you see grunt complain about node-sass, you may need to run "npm rebuild node-sass"
** You may also need to manually call npm install on certain packages (zerorpc, sqlite3) to get them rebuilt as well

###II. Setting up Python
* Get code - clone from: https://github.com/dgaspari/pyrapt.git
* Get Python 2.7 setup (if it isnt already)
* Install pip to handle python packages (sudo apt-get python-pip)
* Install dev packages to ensure scipy can be compiled (sudo apt-get python-dev python-all-dev)
* Install other dev packages: 
* Set env variable to deal with encoding issues:
** export LC_ALL=C
** sudo pip install --upgrade setuptools
* Determine whether you want to use native Python or setup a virtual environment:
** Is this a dedicated server? Just use native Python 2.7
** Otherwise get virtualenvwrapper and setup a virtualenv w 2.7 - this lets you install all the necessary packages independnet of everything else
* If on an AWS instance with low mem you migh t want to Install numpy and scipy using apt-get
* Otherwise install all dependencies for pyrapt: sudo pip install -r requirements.txt

