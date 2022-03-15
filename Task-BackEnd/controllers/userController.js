const Model = require('../models/userModel')

exports.getAll= async(req, res, next) =>{
  const doc = await Model.find();
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
  })

}
exports.createOne = async(req, res, next) =>
{  
  const doc = await Model.update(req.body);
  console.log(doc)
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
}

exports.getOne = Model =>async (req, res, next) => {
  const doc = await Model.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
};