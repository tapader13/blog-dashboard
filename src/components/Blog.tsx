'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import MarkdownEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
const Blog = ({
  id,
  existingTitle,
  existingSlug,
  existingDescription,
  existingCategory,
  existingTags,
  existingStatus,
  existingSpecificCategory,
}: {
  id?: string;
  existingTitle?: string;
  existingSlug?: string;
  existingDescription?: string;
  existingCategory?: string[];
  existingTags?: string[];
  existingStatus?: string;
  existingSpecificCategory?: string;
}) => {
  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(existingDescription || '');

  const { toast } = useToast();
  const [category, setCategory] = useState<string[]>(existingCategory || []);
  const [tags, setTags] = useState<string[]>(existingTags || []);
  const [status, setStatus] = useState(existingStatus || '');
  const [specificCategory, setSpecificCategory] = useState(
    existingSpecificCategory || ''
  );
  const handleSlugSpace = (e: any) => {
    setSlug(e.target.value.replace(/\s/g, '-'));
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      let response;
      if (id) {
        response = await axios.put(`/api/blogapi`, {
          id,
          title,
          slug,
          description,
          category,
          tags,
          status,
          specificCategory,
        });
      } else {
        response = await axios.post('/api/blogapi', {
          title,
          slug,
          description,
          category,
          tags,
          status,
          specificCategory,
        });
      }
      if (response.status === 200 || response.status === 201) {
        toast({
          title: `Blog ${id ? 'updated' : 'added'} successfully`,
          description: `Your blog has been ${
            id ? 'updated' : 'added'
          } successfully`,
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error processing your request',
      });
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div className='loader'></div>;
  }
  return (
    <div className='w-full bg-white p-5 rounded-lg'>
      <form
        onSubmit={handleFormSubmit}
        data-aos='fade-up'
        data-aos-anchor-placement='top-bottom'
      >
        <div className='grid w-full items-center gap-1.5 mt-5'>
          <Label htmlFor='title'>Enter Title</Label>
          <Input
            type='text'
            id='title'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='grid w-full items-center gap-1.5 mt-5'>
          <Label htmlFor='slug'>Enter Slug</Label>
          <Input
            type='text'
            id='slug'
            placeholder='Slug'
            value={slug}
            onChange={handleSlugSpace}
          />
        </div>
        <div className='grid w-full items-center gap-1.5 mt-5'>
          <Label htmlFor='description'>Description</Label>
          <MarkdownEditor
            onChange={(e) => setDescription(e.text)}
            value={description}
            style={{
              width: '100%',
              height: '400px',
            }}
            renderHTML={(text) => {
              return (
                <ReactMarkdown
                  components={{
                    ul: ({ node, ...props }) => (
                      <ul className='list-disc pl-5' {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className='list-decimal pl-5' {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className='mb-2' {...props} />
                    ),
                    code: ({
                      node,
                      inline,
                      className,
                      children,
                      ...props
                    }: React.ComponentProps<'code'> & {
                      node?: any;
                      inline?: boolean;
                    }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      if (!children) {
                        return null;
                      }

                      return !inline && match ? (
                        <div style={{ position: 'relative' }}>
                          <pre
                            style={{
                              padding: '0',
                              borderRadius: '5px',
                              overflowX: 'auto',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                          <Button
                            onClick={() =>
                              navigator.clipboard.writeText(children.toString())
                            }
                            style={{
                              position: 'absolute',
                              top: '0',
                              right: '0',
                              zIndex: '1',
                            }}
                          >
                            Copy code
                          </Button>
                        </div>
                      ) : (
                        <code {...props}>{children}</code>
                      );
                    },
                  }}
                  remarkPlugins={[remarkGfm]}
                >
                  {text}
                </ReactMarkdown>
              );
            }}
          />
        </div>

        {/* Category Field with Multiple Selection */}
        <div className='grid w-full items-center gap-1.5 mt-5'>
          <Label htmlFor='category'>Category</Label>
          <select
            id='category'
            multiple
            value={category}
            onChange={(e) =>
              setCategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className='w-full p-2 border rounded appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-28 overflow-auto'
          >
            <option className='p-2 hover:bg-slate-200' value='JavaScript'>
              JavaScript
            </option>
            <option className='p-2 hover:bg-slate-200' value='React'>
              React
            </option>
            <option className='p-2 hover:bg-slate-200' value='Node.js'>
              Node.js
            </option>
            <option className='p-2 hover:bg-slate-200' value='Python'>
              Python
            </option>
            <option className='p-2 hover:bg-slate-200' value='HTML'>
              HTML
            </option>
            <option className='p-2 hover:bg-slate-200' value='CSS'>
              CSS
            </option>
            <option className='p-2 hover:bg-slate-200' value='MongoDB'>
              MongoDB
            </option>
            <option className='p-2 hover:bg-slate-200' value='Express'>
              Express
            </option>
            <option className='p-2 hover:bg-slate-200' value='Next.js'>
              Next.js
            </option>
            <option className='p-2 hover:bg-slate-200' value='Tailwind'>
              Tailwind
            </option>
            <option className='p-2 hover:bg-slate-200' value='TypeScript'>
              TypeScript
            </option>
          </select>
          <p className='mt-2'>Selected Categories: {category.join(', ')}</p>
        </div>

        {/* Tags Field */}
        <div className='grid w-full items-center gap-1.5 mt-5'>
          <Label htmlFor='tags'>Tags</Label>
          <select
            id='tags'
            multiple
            value={tags}
            onChange={(e) =>
              setTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className='w-full p-2 border rounded appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-28 overflow-auto'
          >
            <option className='p-2 hover:bg-slate-200' value='Web Development'>
              Web Development
            </option>
            <option className='p-2 hover:bg-slate-200' value='Front End'>
              Front End
            </option>
            <option className='p-2 hover:bg-slate-200' value='Back End'>
              Back End
            </option>
            <option className='p-2 hover:bg-slate-200' value='Full Stack'>
              Full Stack
            </option>
            <option className='p-2 hover:bg-slate-200' value='Database'>
              Database
            </option>
          </select>
          <p className='mt-2'>Selected Tags: {tags.join(', ')}</p>
        </div>

        {/* Status Field */}
        <div className='grid w-full items-center gap-1.5 mt-5'>
          <Label htmlFor='status'>Status</Label>
          <select
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='w-full p-2 border rounded'
          >
            <option value=''>Select Status</option>
            <option value='draft'>Draft</option>
            <option value='published'>Published</option>
          </select>
        </div>

        {/* specificCategory Field */}
        <div className='grid w-full items-center gap-1.5 mt-5'>
          <Label htmlFor='specificCategory'>Specific Category</Label>
          <select
            id='specificCategory'
            value={specificCategory}
            onChange={(e) => setSpecificCategory(e.target.value)}
            className='w-full p-2 border rounded'
          >
            <option value=''>Select specific category</option>
            <option value='popular'>Popular</option>
            <option value='recent'>Recent</option>
            <option value='editorpick'>Editor’s Pick</option>
            <option value='trending'>Trending</option>
            <option value='latest'>Latest</option>
            <option value='inspiration'>Inspiration</option>
            <option value='celebration'>Celebration</option>
          </select>
        </div>
        <div className='mx-auto w-1/3 mt-5'>
          <Button variant={'destructive'} size='lg'>
            Add Blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Blog;
