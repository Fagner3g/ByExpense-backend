import * as Yup from 'yup';
import Account from '../models/Account';
import Group from '../models/Group';

class AccountController {
  async index(req, res) {
    const schema = Yup.object().shape({
      groupId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { groupId } = req.params;

    const accounts = await Group.findByPk(groupId, {
      include: { model: Account, as: 'accounts', attributes: ['id', 'name'] },
      attributes: ['id', 'name'],
    });

    if (!accounts) {
      return res.status(400).json({ error: 'Group does not exist' });
    }

    return res.json(accounts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      groupId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, groupId } = req.body;

    const account = await Account.findOne({
      where: { name, group_id: groupId },
    });

    if (account) {
      return res.status(400).json({ error: 'Account already exists' });
    }

    const group = await Account.create({ name, group_id: groupId });

    return res.json(group);
  }
}

export default new AccountController();
