const d3 = require('d3-dsv');
const puppeteer = require('puppeteer');
const db = require('../models');
const cloudinary = require('../services/cloudinary');
const contentController = require('./contentController');

exports.createInstance = (req, res) => {
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
  cloudinary.deleteImages(req.params.id);

  db.Instance.destroy({
    where: { id: req.params.id }
  })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(422).json(err));
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
