module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {//isLoggedIn is middleware to check if our user is logged in usinf the function at the bottom of this file. this function checks to see if user is logged in and if they arent then they get redirected to main login page. 
    db.collection('messages').find().toArray((err, result) => {
      console.log(result)


      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        messages: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });


  app.post('/messages', (req, res) => {
    console.log(req.body)
    db.collection('messages').insertOne({ foodListing: req.body.foodListing, calories: req.body.calories, upArrow: 1, downArrow: 0 }, (err, result) => {//insertOne is inserting the object with the fields that we select from the req.body, which was the info submitted by the user. req.body field names come from ths name attributes of the inputs inside the form element in our index.ejs.
      if (err) return console.log(err)
      console.log('saved to database')
      console.log(result)
      res.redirect('/profile') //redirects back to main page and uses the app.get request
    })
  })


  app.put('/messages', (req, res) => {
    const upOrDown = req.body.hasOwnProperty('upArrow') ? 'upArrow' : 'downArrow'
    console.log("body:", req.body, "upOrDown:", upOrDown)
    db.collection('messages')
      .findOneAndUpdate({ foodListing: req.body.foodListing }, {
        $inc: {
          [upOrDown]: 1,
        },
      }, {
        sort: { _id: -1 },//sorting bottom to top 
        upsert: true
      },
        (err, result) => {
          if (err) return res.send(err)
          console.log(result)
          res.send(result)
        })
  })


  app.put('/moveToSecondList', (req, res) => {

    const foods = req.body.foods; //foods coming from frontend
    const listTwoItems = [];

    items.forEach(item => {
      if (item.quantity > 1) {
        listTwoItems.push(foods);

      }
    });

    // sending list back to front endS
    res.send({ listTwoItems });
  });


  ////////////////////////////////////////////////////////////////////////////////////////////


  app.delete('/messages', (req, res) => {
    db.collection('messages').findOneAndDelete({ foodListing: req.body.foodListing, calories: req.body.calories }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });//show them login page
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the user's secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
