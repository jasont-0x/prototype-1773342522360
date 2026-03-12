const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference(prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.render('start')
})

router.get('/child-name', function (req, res) {
  res.render('child-name', { errors: null, data: req.session.data })
})

router.post('/child-name', function (req, res) {
  const answer = req.session.data['child-name']
  if (!answer || !answer.toString().trim()) {
    return res.render('child-name', {
      errors: { 'child-name': 'Enter your child\'s full name' },
      data: req.session.data
    })
  }
  res.redirect('/child-school')
})

router.get('/child-school', function (req, res) {
  res.render('child-school', { errors: null, data: req.session.data })
})

router.post('/child-school', function (req, res) {
  const answer = req.session.data['child-school']
  if (!answer || !answer.toString().trim()) {
    return res.render('child-school', {
      errors: { 'child-school': 'Enter the name of your child\'s school' },
      data: req.session.data
    })
  }
  res.redirect('/receive-benefits')
})

router.get('/receive-benefits', function (req, res) {
  res.render('receive-benefits', { errors: null, data: req.session.data })
})

router.post('/receive-benefits', function (req, res) {
  const answer = req.session.data['receive-benefits']
  if (!answer || !answer.toString().trim()) {
    return res.render('receive-benefits', {
      errors: { 'receive-benefits': 'Select yes if you receive any of these benefits' },
      data: req.session.data
    })
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-receive-benefits')
  }
  res.redirect('/national-insurance-number')
})

router.get('/ineligible-receive-benefits', function (req, res) {
  res.render('ineligible-receive-benefits')
})

router.get('/national-insurance-number', function (req, res) {
  res.render('national-insurance-number', { errors: null, data: req.session.data })
})

router.post('/national-insurance-number', function (req, res) {
  const answer = req.session.data['national-insurance-number']
  if (!answer || !answer.toString().trim()) {
    return res.render('national-insurance-number', {
      errors: { 'national-insurance-number': 'Enter your National Insurance number' },
      data: req.session.data
    })
  }
  res.redirect('/contact-email')
})

router.get('/contact-email', function (req, res) {
  res.render('contact-email', { errors: null, data: req.session.data })
})

router.post('/contact-email', function (req, res) {
  const answer = req.session.data['contact-email']
  if (!answer || !answer.toString().trim()) {
    return res.render('contact-email', {
      errors: { 'contact-email': 'Enter your email address' },
      data: req.session.data
    })
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers', { data: req.session.data })
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FSM')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation', { data: req.session.data })
})

module.exports = router
