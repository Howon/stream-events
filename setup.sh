if ! type "mongo" > /dev/null
	then
		if ! type "brew" > /dev/null;
			then
				ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
			else
				echo "brew downloaded"
		fi
		brew install mongodb
		echo "mongodb downloaded"
fi

if ! type "node" > /dev/null
	then
		brew install node
		echo "node downloaded"
fi

if [ ! -d data ]
	then
    	mkdir data
		echo "db directory created"
fi

npm install 
echo 'node modules downloaded'
