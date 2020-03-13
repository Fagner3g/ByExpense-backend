import Avatar from '../models/Avatar';
import User from '../models/User';

class AvatarController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const user = await User.findByPk(req.userId);

    await Avatar.create({ name, path }).then(a => {
      user.update({ avatar_id: a.dataValues.id });
    });

    return res.status(200).json({ message: 'Success' });
  }
}

export default new AvatarController();
