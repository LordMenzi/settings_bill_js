const express = require('express');
const exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');
const app = express();
const settingsBill = SettingsBill();
//Configuring express handlebars
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())
app.use(express.json())


app.get('/', function(req, res) {
     res.render('index', { 
       settings: settingsBill.getSettings(),
       totals:settingsBill.totals()
  });
});

app.post('/settings', function(req, res) {
  
  settingsBill.setSettings({
  callCost: req.body.callCost,
  smsCost: req.body.smsCost,
  warningLevel: req.body.warningLevel,
  criticalLevel: req.body.criticalLevel
})
 console.log(settingsBill.getSettings());
res.redirect('/');
});

app.post('/action', function(req, res) {
settingsBill.recordAction(req.body.actionType)
console.log(req.body.actionType);
settingsBill.recordAction(req.body.actionType)
res.redirect('/');
});

app.get('/actions', function(req, res) {
  res.render()
  // res.send('Settings Bill App')
});

app.get('/actions:type', function(req, res) {
  res.send('Settings Bill App')
});

const PORT = process.env.PORT  || 5050;
app.listen(PORT, function() {
  console.log("App started at port:" + PORT)
});