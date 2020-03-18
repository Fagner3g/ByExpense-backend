import * as Yup from 'yup';
import crypto from 'crypto';
import Group from '../models/Group';
import User from '../models/User';

class GroupController {
  async index(req, res) {
    const user_id = req.userId;

    const user = await User.findByPk(user_id, {
      include: [
        {
          association: 'groups',
          attributes: ['id', 'name', 'code'],
          through: { attributes: [] },
        },
      ],
    });

    return res.json(user.groups);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { code } = req.params;

    const group = await Group.findOne({ where: { code } });

    if (!group) {
      return res.status(400).json({ error: 'Group code not found' });
    }

    const userGroups = await Group.findAll({
      where: { id: group.id },
      attributes: ['id', 'name'],
      include: {
        association: 'users',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    });

    return res.json(userGroups);
  }

  async store(req, res) {
    const user_id = req.userId;
    const { name } = req.body;
    let { code } = req.params;

    let group = null;
    const user = await User.findByPk(user_id);

    if (code) {
      group = await Group.findOne({ where: { code } });

      if (!group) {
        return res.status(400).json({ error: 'Group code not found' });
      }
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

  async delete(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;
    const { code } = req.params;

    const group = await Group.findOne({ where: { code } });
    const user = await User.findByPk(user_id);

    if (!group) {
      return res.status(400).json({ error: 'Group code not found' });
    }

    const isLastUser = await Group.findOne({
      where: { id: group.id },
      attributes: ['id', 'name'],
      include: {
        association: 'users',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    });

    if (isLastUser.users.length > 1) {
      await user.removeGroup(group);
      return res.json({ message: 'User removed' });
    }

    // else if last user delete group
    await Group.destroy({ where: { code } });
    return res.json({ message: 'Group deleted' });
  }
}

export default new GroupController();
