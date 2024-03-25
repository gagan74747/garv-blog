import user from "../Model/userSchema.js";
import Post from "../Model/postSchema.js";
import jwt from "jsonwebtoken";
const SECRET_KEY = "testing";

//-----------------------create user------------------------//

export const createUser = async (req, res) => {
  try {

    const data = req.body;
    const oldUser = await user.findOne({ email: { $in: [data.email] } });
    if (!oldUser) {
      const User = new user(data);
      await User.save();

      const token = jwt.sign({ email: User.email, id: User._id }, SECRET_KEY);

      res.cookie("authentication_token", token, {
        httpOnly: true,
        secure: true,
      });
      return res.status(200).send({ User: User });
    }
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      SECRET_KEY
    );

    res.cookie("authentication_token", token, {
      httpOnly: true,
      secure: true,
    });
    res.status(200).send(oldUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

//-----------------------get user------------------------//

export const getUser = async (req, res) => {
  try {
    const data = req.params.id;
    const result = await Post.findById(data);
    const email = result.email;
    const userPosts = await Post.find({ email: { $in: [email] } });
    res.status(200).send(userPosts);
  } catch (err) {
    res.status(500).send(err);
  }
};
