const router = require('express').Router();
const passport = require('passport');
const productos = require('../models/products.model')
const users = require('../models/user.model')


router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/board',
  failureRedirect: '/register',
  failureFlash: true
}));

router.get('/board', isAuthenticated, async (req, res) => {
  const getUsers = await users.find();
  console.log(getUsers);
  res.render('board', {
    getUsers
  });
});
router.get('/login', (req, res, next) => {
  res.render('login');
});
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/board',
  failureRedirect: '/login',
  passReqToCallback: true

}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login')
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/')
  }

}

router.get('/product', isAuthenticated, (req, res, next) => {
  res.render('product')
});
router.post('/product', async (req, res, next) => {
  var params = req.body;
  const product = new productos();
  product.name = params.name;
  product.value = params.value;
  product.reference = params.reference;
  await product.save();
  console.log(product);
  res.redirect('/product')
})

router.get('/views', isAuthenticated, async (req, res, next) => {
  const getProducts = await productos.find();
  console.log(getProducts);
  res.render('views', {
    getProducts
  });
});

router.get('/gallery', (req, res) => {
  res.render('gallery');
  var file_name = "No subido...";

});




module.exports = router;
