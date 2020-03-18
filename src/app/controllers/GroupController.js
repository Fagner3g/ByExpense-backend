import crypto from 'crypto';
import Group from '../models/Group';
import User from '../models/User';

class GroupController {
  async store(req, res) {
    const user_id = req.userId;
    const { name } = req.body;
    let { code } = req.body;

    let group = null;
    const user = await User.findByPk(user_id);

    // Creates hash to share group
    if (code) {
      group = await Group.findOne({ where: { code } });
    } else {
      code = crypto
        .createHmac('sha256', `${new Date(Date.now())}${name}${user_id}`)
        .update('I love cupcakes')
        .digest('hex');
      group = await Group.create({ name, code });
    }

    await user.addGroup(group);

    return res.json(group);
  }
}

export default new GroupController();
