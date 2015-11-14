# tonetrainer
A simple web app that lets you practice speaking mandarin tones into a microphone

### Getting Started
To use this web app you will need: node.js, npm, grunt, bower

Steps to get started (from the repo's root directory):
* npm install
* bower install
* grunt build (you can run grunt serve to build and automatically start the node server)

### Setting up server to use ZeroRPC
This web app uses ZeroRPC to invoke python methods - this can be done locally or on a separate server thanks to the ZeroRPC framework. By default we will assume the python logic will be running locally (IP will be 127.0.0.1). To use ZeroRPC you will need:
* libevent - an event notification library: http://libevent.org/
** To install v2.0.5 for Ubuntu: sudo apt-get install libevent-dev
* zeromq - the message queue system that zerorpc is built off of: http://zeromq.org/
** To install for Ubuntu: sudo apt-get install libzmq-dev

Once these libraries are established on your web server (as well as whatever server is running your python code), then you can use the appropriate library for each language to establish communication via ZeroRPC:
* Python: use pip to install the "zerorpc" pkg
* Nodejs: use npm to install the "zerorpc" pkg

### Setting up SQLite DB
This app uses a SQLite DB to store info for each of the mandarin words that can be trained. You'll need to set one up in order
for it to run successfully.
* Install sqlite (on ubuntu you can just apt-get sqlite3 and its accompanying dev pkg, libsqlite3-dev)
* Populate DB (coming soon - DB setup scripts will be added to this repo in the database/ directory)
 
### Referenced projects
Client-side wav recording logic comes from [RecorderJS](https://github.com/mattdiamond/Recorderjs) by Matt Diamond (MIT License).

### [License (MIT)](LICENSE.md)
