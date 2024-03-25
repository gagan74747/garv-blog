import post from "../Model/postSchema.js";
import cloudinary from "../Utils/cloudinary.js";

export const createPost = async (req, res) => {
  const { name, email, title, desc, img, image } = req.body;
  try {
    let result;
    if (image !== "") {
      const fileStr = image;
      result = await cloudinary.v2.uploader.upload(fileStr);
    }
    const Post = new post({
      name,
      email,
      title,
      desc,
      img,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    await Post.save();
    res.status(200).send(Post);
  } catch (err) {
    res.send(err);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const { page = 1, limit = 7 } = req.query;
    const skip = (page - 1) * limit;
    const posts = await post.find().sort({ updatedAt: -1 }).skip(skip).limit(parseInt(limit));
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching posts', error: err });
  }
};


export const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const Post = await post.findById(id);
    res.status(200).send(Post);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { name, email, title, desc, img, image } = req.body;

  try {
    if (typeof image != "object") {
      let result;
      if (image !== "") {
        const fileStr = image;
        result = await cloudinary.v2.uploader.upload(fileStr);
      }

      const data = {
        name,
        email,
        title,
        desc,
        img,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      };

      const Post = await post.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      res.status(200).send(Post);
    }
    if (typeof image == "object") {
      const data = {
        name,
        email,
        title,
        desc,
        img,
        image,
      };
      const Post = await post.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      res.status(200).send(Post);
    }
  } catch (err) {
    res.send(err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const Post = await post.findById(id);
    await Post.delete();
    res.status(200).send(Post);
  } catch (err) {
    res.status(500).send(err);
  }
};
