'use strict';

/**
 * Controller Class
 *
 * The controller class takes two parameters, Model and logger. The model is
 * the cotroller coresponding model that deals with the database and the logger
 * is an Logger instance which logs the database error. It will throw the error
 * to console under development environment and write to the log in any other
 * environments.
 */
class Controller {
  constructor(Model, logger) {
    this.Model = Model;
    this.logger = logger;
  }

  create() {
    return (req, res) => {
      const newRecord = new this.Model(req.body);
      newRecord.save((error, record) => {
        if (error) {
          this.logger.error(error);
        } else {
          res.status(201).send(record);
        }
      });
    };
  }

  acquire() {
    return (req, res) => {
      this.Model.find((error, records) => {
        if (error) {
          this.logger.error(error);
        } else {
          res.status(200).send(records);
        }
      });
    };
  }

  acquireOne() {
    return (req, res) => {
      this.Model.findOne({ _id: req.params.id }, (error, record) => {
        if (error) {
          this.logger.error(error);
        } else {
          res.status(200).send(record);
        }
      });
    };
  }

  update() {
    return () => {};
  }

  updateOne() {
    return (req, res) => {
      this.Model.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        (error, record) => {
          if (error) {
            this.logger.error(error);
          } else {
            res.status(200).send(record);
          }
        });
    };
  }

  delete() {
    return (req, res) => {
      this.Model.remove({ _id: { $in: req.body.ids } }, (error) => {
        if (error) {
          this.logger.error(error);
        } else {
          res.status(200).send('success');
        }
      });
    };
  }

  deleteOne() {
    return (req, res) => {
      this.Model.remove({ _id: req.params.id }, (error) => {
        if (error) {
          this.logger.error(error);
        } else {
          res.status(200).send('success');
        }
      });
    };
  }
}

module.exports = Controller;
