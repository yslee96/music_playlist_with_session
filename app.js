const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session); // 1
const path = require('path');
const app = express();


app.set('port', process.env.PORT || 4000);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({  // 2
  secret: 'keyboard cat',  // 암호화
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.get('/', (req, res, next) => {  // 3
    console.log("*******req.sessionID = ", req.sessionID);
    if (!req.session.num ) { 
      req.session.num = 1 ;  
    }
    else { 
      req.session.num = req.session.num +1
    }
    res.sendFile(__dirname + '/index.html');
  });


// PlayList Songs


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
  }); 