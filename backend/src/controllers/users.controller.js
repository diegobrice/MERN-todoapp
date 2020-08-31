const User = require("../models/User");
const usersCtrl = {};

usersCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
usersCtrl.createUser = async (req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });
  await newUser.save();
  res.json({ message: "Usuario añadido" });
};
usersCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};
usersCtrl.updateUser = async (req, res) => {
  const { username } = req.body;
  await User.findByIdAndUpdate(req.params.id, { username });
  res.json({ message: "Usuario actualizado" });
};
usersCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Usuario eliminado" });
};

module.exports = usersCtrl;
