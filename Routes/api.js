// import PatientController
const PatientController = require('../Controllers/PatientController');

// import jwt(autentikasi)
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

// import express
const express = require('express');
const {body, validationResult} = require('express-validator');

// membuat object router
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello Covid API Express');
});

// Middleware untuk verifikasi token JWT
const secretKey = require('../config/keys').secretKey;
const authenticate = expressJwt({secret: secretKey, algorithms: ['HS256']});

// Informasi pengguna atau user
const users = [
  {id: 1, username: 'Fatih', password: '12345'},
  {id: 2, username: 'Tsabit', password: '112233'},
];

// Rute pendaftaran (signup)
router.post('/signup', [
  body('username').isLength({min: 5}).withMessage('Username must be at least 5 characters'),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
  (req, res) => {
    const {username, password} = req.body;
    users.push({id: users.length + 1, username, password});
    res.json({message: 'User registered successfully'});
  },
]);

router.post('/login', [
  body('username').isLength({min: 5}).withMessage('Username must be at least 5 characters'),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
  (req, res) => {
    const {username, password} = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      const token = jwt.sign({userId: user.id, username: user.username}, 'your-secret-key', {expiresIn: '1h'});
      res.json({token});
    } else {
      res.status(401).json({message: 'Invalid credentials'});
    }
  },
]);

// Membuat routing patient
// Route untuk menampilkan seluruh data patient
router.get('/patients', PatientController.index);

// Route untuk menambahkan data patient
router.post('/patients', authenticate, [
  // Validasi menggunakan Express Validator
  body('name').isLength({min: 5}).withMessage('Nama harus memiliki panjang minimal 5 karakter'),
  body('phone').isMobilePhone().withMessage('Nomor telepon tidak valid'),
  body('address').isLength({min: 5}).withMessage('Alamat harus memiliki panjang minimal 5 karakter'),
  body('status').isIn(['positive', 'recovered', 'dead']).withMessage('Status harus positive, recovered, atau dead'),
  body('in_date_at').isISO8601().toDate().withMessage('Format tanggal tidak valid'),

  // Handle error validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    // Jika data valid, lanjut ke fungsi controller
    PatientController.store(req, res); // Fungsi store dari PatientController
  },
]);

// Route untuk mengubah data patient
router.put('/patients/:id', authenticate, [
  // Validasi menggunakan Express Validator
  body('name').isLength({min: 5}).withMessage('Nama harus memiliki panjang minimal 5 karakter'),
  body('phone').isMobilePhone().withMessage('Nomor telepon tidak valid'),
  body('address').isLength({min: 5}).withMessage('Alamat harus memiliki panjang minimal 5 karakter'),
  body('status').isIn(['positive', 'recovered', 'dead']).withMessage('Status harus positive, recovered, atau dead'),
  body('in_date_at').isISO8601().toDate().withMessage('Format tanggal tidak valid'),

  // Handle error validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    // Jika data valid, lanjut ke fungsi controller
    PatientController.update(req, res); // Fungsi update dari PatientController
  },
]);

// Route untuk menghapus data patient
router.delete('/patients/:id', authenticate, PatientController.destroy);

// Route untuk menemukan satu data patient
router.get('/patients/:id', PatientController.show);

// Route untuk menemukan data patient dari namanya
router.get('/patients/search/:name', PatientController.search);

// Route untuk menampilkan data patient dengan status positive
router.get('/patients/status/positive', PatientController.positive);

// Route untuk menampilkan data patient dengan status recovered
router.get('/patients/status/recovered', PatientController.recovered);

// Route untuk menampilkan data patient dengan status dead
router.get('/patients/status/dead', PatientController.dead);

// export router
module.exports = router;
