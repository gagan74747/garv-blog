import Post from "../Model/postSchema.js";
import user from "../Model/userSchema.js"
import jwt from "jsonwebtoken"

export const authentication = async (req, res, next) => {
 try {
  const token = req.cookies['authentication_token'];
  if (!token) {
   return res.status(401).json({ message: 'Unauthorized' });
  }
  const SECRET_KEY = 'testing'
  const decodedData = jwt.verify(token, SECRET_KEY);
  const existingUser = await user.findOne({ _id: decodedData.id });

  if (!existingUser) {
   return res.status(401).json({ message: 'Unauthorized' });
  }

  // if user exists, you can attach the user object to the request for further processing
  req.user = existingUser;

  next();
 } catch (error) {
  console.log(error)
  return res.status(500).json({ message: 'Server Error' });
 }
};

export const authorization = async (req, res, next) => {
 try {
 const userEmail = req.user.email;
 const postId = req.params.id;
 const post = await Post.findById(postId);
 if(!post)
 return res.status(400).json({message: 'Post not exist'})
 if(userEmail !== post.email)
   return res.status(404).json({ message: 'Access Denied' });
  next();
 } catch (error) {
  return res.status(500).json({ message: 'Server Error' });
 }
};
