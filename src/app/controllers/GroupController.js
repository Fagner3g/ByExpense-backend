import crypto from 'crypto';
import Group from '../models/Group';
import UserGroup from '../models/UserGroup';

class GroupController {
  async store(req, res) {
    const { name } = req.body;
    const code = crypto
      .createHmac('sha256', `${new Date(Date.now())}${name}${req.userId}`)
      .update('I love cupcakes')
      .digest('hex');

    const group = await Group.create({ name, code }).then(g =>
      UserGroup.create({ user_id: req.userId, group_id: g.dataValues.id })
    );

    return res.json(group);
  }
}

export default new GroupController();
