import * as Yup from 'yup';
import Record from '../models/Record';
import Group from '../models/Group';
import Account from '../models/Account';

class RecordController {
  async index(req, res) {
    const schema = Yup.object().shape({
      groupId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { groupId } = req.params;

    const accounts = await Group.findByPk(groupId, {
      include: [
        {
          model: Account,
          as: 'accounts',
          attributes: ['id', 'name'],
          include: {
            model: Record,
            as: 'records',
            attributes: ['id', 'name'],
          },
        },
      ],
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
      date: Yup.date().required(),
      value: Yup.string().required(),
      categoryId: Yup.number().required(),
      accountId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { type, name, date, value, categoryId, accountId } = req.body;

    const record = await Record.create({
      type,
      name,
      date,
      value,
      category_id: categoryId,
      account_id: accountId,
    });

    return res.json(record);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const record = await Record.findByPk(id);

    if (!record) {
      return res.status(400).json({ error: 'Record does not exist' });
    }

    await Record.destroy({ where: { id } });

    return res.status(204).send();
  }
}

export default new RecordController();
