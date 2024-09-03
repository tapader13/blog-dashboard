import mongoose from 'mongoose';

interface IBlog {
  title: string;
  slug: string;
  description: string;
  category: [string];
  tags: [string];
  status: string;
}

const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.models?.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
