const Bird = require("../../../models/basic_learner/birds.model");
// Add a new Bird
const createBird = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    if (!name || !image) {
      return res.status(403).json({
        error: "All field are required!",
      });
    }
    const findExaistBird = await Bird.findOne({ name });
    if (findExaistBird) {
      return res.status(403).json({
        error: "This Bird already exist!",
      });
    }
    // create path by name of bird
    let path = name.toLowerCase().replace(/[^a-zA-Z]/g, "-");
    // check if path already exist
    const exastingPath = await Bird.findOne({ slug: path });
    if (exastingPath) {
      path = Math.floor(Math.random() * 1000) + "_" + path;
    }
    // Create bird object
    const newBird = new Bird({
      name,
      image,
      slug: path,
      description,
    });
    // Save to database and send response
    const saveBird = await newBird.save();
    if (saveBird) {
      return res.status(200).json({
        message: "Bird added successfully!",
        bird: saveBird,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "Thare was server error!",
      err: error,
    });
  }
};
// Get all birds
const getAllBirds = async (req, res) => {
  try {
    const birds = await Bird.find();
    const count = await Bird.countDocuments();
    res.status(200).json({
      data: birds,
      count,
    });
  } catch (error) {
    res.status(404).json({
      error: "Thare was server error!",
      err: error,
    });
  }
};
// Get all birds by pagination
const getAllBirdsByPagination = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const birds = await Bird.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Bird.countDocuments();
    res.status(200).json({
      birds,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalBirds: count,
    });
  } catch (error) {
    res.status(404).json({
      error: "Thare was server error!",
      err: error,
    });
  }
};
// Get all birds name
const getAllBirdsName = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const birds = await Bird.find({})
      .select("name path")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Bird.countDocuments();
    res.status(200).json({
      data: birds,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalBirds: count,
    });
  } catch (error) {
    res.status(404).json({
      error: "Thare was server error!",
      err: error,
    });
  }
};
// Get a single bird by path
const getSingleBirdByPath = async (req, res) => {
  try {
    const { path } = req.params;
    const bird = await Bird.findOne({ path });
    if (bird) {
      return res.status(200).json({
        data: bird,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "Thare was server error!",
      err: error,
    });
  }
};
// Exprot all functions
module.exports = {
  createBird,
  getAllBirds,
  getAllBirdsByPagination,
  getAllBirdsName,
  getSingleBirdByPath,
};
