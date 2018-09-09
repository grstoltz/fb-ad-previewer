const db = require('../models');
const cloudinary = require('../services/cloudinary');
const contentController = require('./contentController');

exports.createInstance = (req, res) => {
  if (
    req.files[0].mimetype === 'text/csv' ||
    'text/txt' ||
    'application/vnd.ms-excel' ||
    'text/x-csv' ||
    'text/plain'
  ) {
    db.Instance.create({
      userId: req.user,
      processing: true
    })
      .then(result => {
        console.log(result);
        contentController.createContent(result.id, req.files[0]);
        res.status(202).send(result);
      })
      .catch(err => console.log(err));
  } else {
    res.status(500).send('Invalid file type');
  }
};

exports.getInstanceByUser = (req, res) => {
  db.Instance.findAll({
    where: {
      userId: req.user
    }
  })
    .then(result => {
      const mappedArray = result.map(element => element.id);
      const filteredArray = [...new Set(mappedArray)];
      res.status(200).send(filteredArray);
    })
    .catch(err => {
      console.log(err);
      return res.status(422).json(err);
    });
};

exports.deleteInstance = async (req, res) => {
  cloudinary.deleteImages(req.params.id).then(() =>
    db.Content.destroy({ where: { instanceId: req.params.id } }).then(() =>
      db.Instance.destroy({
        where: { id: req.params.id }
      })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(422).json(err))
    )
  );
};

exports.getInstance = (req, res) => {
  db.Instance.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(422).json(err));
};
