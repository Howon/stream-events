npm install 
gulp
echo 'build successful'
mongod --dbpath $DIRNAME/data
node app.js
