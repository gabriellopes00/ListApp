//Imports
  import {Request, Response} from 'express';
  import Slugify from 'slugify';
  
  import db from '../database/connection';  
  import Validator from '../validations/InputDataValidation';

  interface category{
    categoryName: string
    categoryUrl: string
  };

export default {

  async index(req: Request, res:Response){
    try {
      const categories:Array<category> = await db.select().from('categories');
      if(categories.length === 0) return res.sendStatus(204);

      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  async createCategory(req: Request, res:Response){
    try {
      const {categoryName} = req.body;
      const data:object = {
        categoryName: categoryName,
        categoryUrl: Slugify(categoryName)
      }

      await Validator.categoriesValidation.validate(data);
      await db.insert(data).into('categories');
      
      res.sendStatus(201);
    } catch (error) {
      error.name === 'ValidationError' ? res.sendStatus(400) : res.sendStatus(500);
      console.log(error);
    }
  },

  async updateCategory(req: Request, res:Response){
    try {
      const { categoryUrl } = req.params;
      const data:category = req.body;

      const category = await db.select()
      .from('categories').where({categoryUrl: categoryUrl});
      if(category.length === 0) return res.sendStatus(404);

      await Validator.categoriesValidation.validate(data);      
      await db.update(data).table('categories')
      .where({categoryUrl: categoryUrl});

      res.sendStatus(200);
    } catch (error) {
      error.name === 'ValidationError' ? res.sendStatus(400) : res.sendStatus(500);
      console.log(error);
    }
  },

  async deleteCategory(req: Request, res:Response){
    try {
      const { categoryUrl } = req.params;

      const category = await db.select()
      .from('categories').where({categoryUrl: categoryUrl});
      if(category.length === 0) return res.sendStatus(404);

      await db.delete().from('categories').where({categoryUrl : categoryUrl});
      res.sendStatus(200);

    } catch (error) {
      res.sendStatus(400);
      console.log(error);
    }
  }
  
}


  