sudo apt-get install gcc make build-essential
rm -rf node_modules
npm cache clean

npm install -d
node app.js