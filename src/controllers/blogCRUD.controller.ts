import { Request, Response } from 'express';
import { BlogModel } from '../models/blog.model';

class BlogCRUD {
  constructor() {}

  public static async create(req:Request, res:Response){
    try {
        const { title, author, content } = req.body;
        const newBlog = await BlogModel.createBlog({title,author,content});
        return res.status(200).json(newBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
  }
  public static async fetch(req:Request, res:Response){
    try {
        const { id } = req.params;
        const newBlog = await BlogModel.find({_id:id});
        return res.status(200).json(newBlog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return res.status(500).json('Something went wrong!');
    }
  }

  public static async delete(req:Request, res:Response){
    try {
      const { id } = req.params;
        const newBlog = await BlogModel.findByIdAndDelete({_id:id});
        return res.status(200).json(newBlog);
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json('Something went wrong!');
    }
  }

  public static async update(req:Request, res:Response){
    try {
        const { content } = req.body;
        const newBlog = await BlogModel.updateOne({content});
        return res.status(200).json(newBlog);
    } catch (error) {
        console.error('Error updating blog:', error);
        return res.status(500).json('Something went wrong!');
    }
  }
  public static async fetchAll(req:Request, res:Response){
    try {
        const blogs = await BlogModel.find();
        return res.status(200).json(blogs);
    } catch (error) {
        console.error('Error updating blog:', error);
        return res.status(500).json('Something went wrong!');
    }
  }
}

export default BlogCRUD;
