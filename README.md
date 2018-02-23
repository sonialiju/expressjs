# Express Js Person Management

The project contains basic codes for creating, viewing, updating and deleting persons.

## Steps to Run the project

 Install nodejs and npm
 
 Install mongodb [ref:https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04]
    a)echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    b)sudo apt-get update
    c)sudo apt-get install -y mongodb-org
    d)sudo systemctl start mongod
    d)mongo
    e)use customerapp
    f)db.createCollection('people')
    
 
 Download the project and copy the folder 'customerapp-master' to your working directory
 
 cd customerapp-master
 
 npm install
 
 node app or directly paste  http://localhost:3000/ in your browser