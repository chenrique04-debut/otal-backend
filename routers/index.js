const passport = require("passport");
module.exports = app => { 
app.get('/', (req, res)=>{
		console.log(req.body);
		res.send('hello world!')
})	
app.post('/hello', (req, res)=>{
		console.log(req.body);
		res.send('hello world by post!')
})	

app.get('/profile', 
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });
}
