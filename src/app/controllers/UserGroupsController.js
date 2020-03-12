import crypto from 'crypto';
import UserGroups from '../models/UserGroups';

class UserGroupsController {
  async store(req, res) {
    const { name } = req.body;
    const code = crypto
      .createHmac('sha256', `${new Date(Date.now())}${name}${req.userId}`)
      .update('I love cupcakes')
      .digest('hex');

    const group = await UserGroups.create({ user_id: req.userId, name, code });

    return res.json(group);
  }
}

export default new UserGroupsController();
