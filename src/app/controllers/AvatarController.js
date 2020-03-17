import Avatar from '../models/Avatar';

class AvatarController {
  async store(req, res) {
    const user_id = req.userId;
    const { originalname: name, filename: path } = req.file;

    await Avatar.create({ name, path, user_id });

    return res.status(200).json({ message: 'Success' });
  }
}

export default new AvatarController();
