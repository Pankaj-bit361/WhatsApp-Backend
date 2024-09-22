const express = require(`express`);
const { UserModel } = require("../Models/user.model");
const { getLogin } = require("../functions/UserFunction");

const UserRouter = express.Router();

UserRouter.get(`/`, async (req, res) => {
  try {
    let user = await UserModel.find();
    console.log(user);
    res.send(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

UserRouter.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let user = await UserModel.findOne({ _id: id });
    res.send(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

UserRouter.post("/", async (req, res) => {
  let { email } = req.body;
  const exist = await UserModel.findOne({ email });
  try {
    if (exist) {
      res.send(`user already exist`);
    } else {
      let newuser = new UserModel(req.body);
      await newuser.save();
      res.status(200).send({ msg: `user registered successfully` });
    }
  } catch (error) {
    res.send({ err: error.message });
  }
});


UserRouter.post("/google/login", async (req, res) => {
    const { code, redirectUri } = req.body;
  
    try {
      const response = await getLogin({ code, redirectUri });
      const { email, accessToken } = response.data;
  
      let user = await UserModel.findOne({ email });
  
      if (!user) {
        user = new UserModel(response.data);
        await user.save();
      }
  
      res.send(200).json({
        success: true,
        message: "Login successful",
        accessToken,
        user,
      });
    } catch (error) {
      console.error("Error during login: ", error.message);
      res.send({
        success: false,
        error: error.message,
      });
    }
  });

module.exports = {
  UserRouter,
};
