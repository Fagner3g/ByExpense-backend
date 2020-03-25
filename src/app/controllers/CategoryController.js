import * as Yup from 'yup';
import SubCategory from '../models/SubCategory';
import Category from '../models/Category';

class AccountController {
  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const response = await SubCategory.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['id', 'name'],
    });

    if (!response) {
      return res.status(400).json({ error: 'SubCategories does not exist' });
    }

    return res.json(response);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, id } = req.body;

    const isExistSubCat = await SubCategory.findByPk(id);

    if (!isExistSubCat) {
      return res.status(400).json({ error: 'SubCategory does not exist' });
    }

    const [category, isExist] = await Category.findOrCreate({
      where: { name, sub_category_id: id },
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

    const isExist = await Category.findByPk(id);

    if (!isExist) {
      return res.status(400).json({ error: 'Category does not exist' });
    }

    await Category.destroy({ where: { id } });

    return res.status(204).send();
  }
}

export default new AccountController();
