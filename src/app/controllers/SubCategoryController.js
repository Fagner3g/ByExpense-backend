import * as Yup from 'yup';
import Group from '../models/Group';
import SubCategory from '../models/SubCategory';

class AccountController {
  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const response = await Group.findByPk(id, {
      include: {
        model: SubCategory,
        as: 'subcategories',
        attributes: ['id', 'name'],
      },
      attributes: ['id', 'name'],
    });

    if (!response) {
      return res.status(400).json({ error: 'Group does not exist' });
    }

    return res.json(response);
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

    const [category, isExist] = await SubCategory.findOrCreate({
      where: { name, group_id: groupId },
    });

    if (!isExist) {
      return res.status(400).json({ error: 'SubCategory already exists' });
    }

    return res.json(category);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const isExist = await SubCategory.findByPk(id);

    if (!isExist) {
      return res.status(400).json({ error: 'SubCategory does not exist' });
    }

    await SubCategory.destroy({ where: { id } });

    return res.json();
  }
}

export default new AccountController();
