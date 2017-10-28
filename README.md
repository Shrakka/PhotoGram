# PhotoGram
Photosharing application
---

Front: Angular 4
Back: Express (nodeJS)
DB: MongoDB

---

## Installation:
You will need to install mongoDB, angular4 and node.

## Run 
- git clone
- cd Photogram
- npm install
- LAUNCH DB: mongod --dbpath=database
- LAUNCH BACKEND: cd backend && npm run start (port 8200)
- LAUNCH FRONT: cd frontend && ng serve (port 4200)

## NB
For the moment it's a V0, that is to say: 

- UI need to be adjusted a little bit, especially the detail views
- Some unused package in npm will be removed from package.json

I am using exif js in the backend. When a photo is posted: 
- if it contains a creationDate, it will display it in the console but put Date.now() instead (I was lazy to do the conversion for the first demo))
- if it contains gps positions, it will set longitude and latitude to 42 (lazy to do the conversion also...). 

Otherwise it will use for the picture Date.now() and GPS{lat = 0, long = 0} by default if picture does not contains EXIF. 

Enjoy!



