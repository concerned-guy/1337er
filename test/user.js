// // During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// var mongoose = require('mongoose');
// var User = require('../models/user');
// var Post = require('../models/post');

// // Test dependencies
// var chai = require('chai');
// let chaiHttp = require('chai-http');
// var server = require('../bin/www');
// var should = chai.should();

// chai.use(chaiHttp);



// //
// // Example database documents
// //
// var users = [new User({
//   fullName: 'Demo',
//   username: 'demo',
//   password: 'demo',
//   description: 'A special first user.',
// }), new User({
//   fullName: 'Mordred Phain',
//   username: 'morph',
//   password: 'morph',
//   description: 'Doctor.',
//   location: 'NY',
//   link: 'http://9v.lt/blog/category/general/dr-noire-by-recon/',
//   quote: 'Sit down, Mr. Naissance. I’ve got a job for you.',
// })];

// var posts = [new Post({
//   body: 'Demo post.\nNot much text here.',
//   type: 'text',
//   author: users[0]._id,
// }), new Post({
//   body: 'Check out the link below for more info.',
//   type: 'text',
//   link: 'http://lmgtfy.com/?q=Evilzone',
//   author: users[1]._id,
// }), new Post({
//   body: 'Second post by the second user.\n\nIts font is monospaced.',
//   type: 'code',
//   author: users[1]._id,
// })];
