import { Model, Schema, model } from 'mongoose';
import { IBlog } from '../store/interfaces/blog.interface';

export interface IBlogModel extends Model<IBlog>{
  createBlog(data:IBlog):Promise<IBlog>;
}
const blogSchema = new Schema({
  title: { 
    type: String, 
    required: true 
},
  content: { 
    type: String, 
    required: true 
},
  author: { 
    type: String, 
    required: true 
},
},{
  strict:false,
  timestamps:true
});

blogSchema.statics.createBlog = async function (data) {
  const newBlog = await this.create(data);
  return newBlog;
}

export const BlogModel = model<IBlog, IBlogModel>('blogs', blogSchema);

