* Homeworks

1. Create class. And create logger that will be log all actions happens in this class. Shold have ability extend max listeners count via setter and remove listener by name.

1. Attach error event to lesson 1 HW

1. Create your own webpack with following abilities:
    - Minify js, css, html files
    - Create single bundle from js(each file is module) and css file.
    - Create deploing package from folder(bundle and minify css, js then create gzip archive and in the bottom each html file copiright sign 'Jocasino.com');
    
1. Create socket chat that using the room. 
    - Client 1 can push the message to client 2 and vice versa.
    - Client 3 can push the message to client 4 and vice versa.
    - All clients have all message history.
    - Put room message history in file before closing the chat.

1. Based on http server create your own 'express' with:
    - Routing
    - Body parser (body after parcew add to request object as field)
     - Send json

1. Create your own pm2.
 - Run processes from the file (config settings)
 - Create instances of the running file (config settings)

 1. Final task
 - Create web server
 - It contains Connection to MySQL server
 - It contains users permission sets in MySQL DB
 - Users info allows on the REST API
 - In the MongoDB contains info about users pets
 - Server can work in as proxy server when user go to /google rote
 - Via google route server should proxy all trafic on google
 - Statistic for google requests contains on mongo db
 - Server contains statistic about requests in /stat route
 - User can see request count in the server render page