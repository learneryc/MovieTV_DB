# MovieTV_DB

Here is [video demo](https://www.youtube.com/watch?v=szn_U-yucVY)

## Install Angular CLI
Run `npm install -g @angular/cli`


## Install virtualenv
Run `pip3 install virtualenv`


## Run in Node.js
Run `npm install` under `MovieTV_DB/server/node/`
Run `npm run start` to start the server

Open `http://localhost:8080`

The frontend is prebuilt as `dist` and served by the backend


## Run in Flask
### Backend
Install virtualenv
Run `source venv/bin/activate` under `MovieTV_DB/server/flask/`
Run `export FLASK_APP=server.py`

Run `flask run` to start the server, it should listen at `http://127.0.0.1:5000`

### Frontend
Run `npm install` under `MovieTV_DB/app/`
		  
Run `ng serve`, open `http://localhost:4200`