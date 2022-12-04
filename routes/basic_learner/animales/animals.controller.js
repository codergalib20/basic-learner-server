const Animal = require("../../../models/basic_learner/animals.model");

// Add a new Animal by members
const createAnimal = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    if (!name || !image) {
      return res.status(403).json({
        error: "All fields are required!",
      });
    }
    const findExaistAnimal = await Animal.findOne({ name });
    if (findExaistAnimal) {
      return res.status(403).json({
        error: "This Animal already exist!",
      });
    }
    // create path by name of Animal
    let path = name.toLowerCase().replace(/[^a-zA-Z]/g, "-");
    // check if path already exist
    const exastingPath = await Animal.findOne({ path });
    if (exastingPath) {
      path = path + "-" + Math.floor(Math.random() * 1000);
    }
    // Create Animal object
    const newAnimal = new Animal({
      name,
      image,
      path,
      description,
    });
    // Save to database and send response
    const saveAnimal = await newAnimal.save();
    if (saveAnimal) {
      return res.status(200).json({
        message: "Animal added successfully!",
        data: saveAnimal,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "Thare was server error!",
      err: error,
    });
  }
};

// Get all Animals
const getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    const count = await Animal.countDocuments();
    res.status(200).json({
      data: animals,
      count,
    });
  } catch (error) {
    res.status(404).json({
      error: "Thare was server error!",
      err: error,
    });
  }
};

// Get all Animals by pagination
const getAllAnimalsByPagination = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const animals = await Animal.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Animal.countDocuments();
    res.status(200).json({
      animals,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalAnimals: count,
    });
  } catch (error) {
    res.status(404).json({
      error: "Thare was server error!",
      err: error,
    });
  }
};

// Get all Animals name
const getAllAnimalsName = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const animals = await Animal.find({})
      .select("name path")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Animal.countDocuments();
    res.status(200).json({
      data: animals,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalAnimals: count,
    });
  } catch (error) {
    res.status(404).json({
      error: "Thare was server error!",
      err: error,
    });
  }
};

// Get a single Animal by path
const getSingleAnimalByPath = async (req, res) => {
  try {
    const { path } = req.params;
    const animal = await Animal.findOne({ path });
    if (animal) {
      return res.status(200).json({
        data: animal,
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
  createAnimal,
  getAllAnimals,
  getAllAnimalsByPagination,
  getAllAnimalsName,
  getSingleAnimalByPath,
};
