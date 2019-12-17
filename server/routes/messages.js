const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

router.get('/', (req, res, next) => {
  Message.find()
      .then(messages => {
        res.status(200).json({
          message: 'Message fetched successfully',
          messages: messages
        });
      })
      .catch(error => {
        returnError(res, error);
        });
      });

router.post('/', (req, res, next) => {
const maxMessageId = sequenceGenerator.nextId("messages");

const message = new Message({
  id: maxMessageId,
  subject: req.body.subject,
  msgText: req.body.msgText,
  sender: req.body.sender
});

message.save()
.then(createdMessage => {
res.status(201).json({
  message: 'Messsage added successfully',
  message: createdMessage
});
})
.catch(error => {
returnError(res, error);
});
});

  module.exports = router;