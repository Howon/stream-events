sudo apt-get install gcc make build-essential
rm -rf node_modules
npm cache clean
expect "Do you want to continue? [Y/n]"
send "y\r"

npm install 
node app.js