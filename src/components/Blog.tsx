'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import MarkdownEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';
const Blog = ({
  existingTitle,
  existingSlug,
  existingDescription,
  existingCategory,
  existingTags,
  existingStatus,
}: {
  existingTitle?: string;
  existingSlug?: string;
  existingDescription?: string;
  existingCategory?: string;
  existingTags?: string;
  existingStatus?: string;
  id?: string;
}) => {
  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [category, setCategory] = useState<string[]>(
    existingCategory ? existingCategory.split(',') : []
  );
  const [tags, setTags] = useState<string[]>(
    existingTags ? existingTags.split(',') : []
  );
  const [status, setStatus] = useState(existingStatus || '');

  return (
    <div className='w-full bg-white p-5 rounded-lg'>
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
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>
      <div className='grid w-full items-center gap-1.5 mt-5'>
        <Label htmlFor='description'>Description</Label>
        <MarkdownEditor
          onChange={(e) => setDescription(e.text)}
          value={description}
          style={{ width: '100%', height: '400px' }}
          renderHTML={(text) => {
            return (
              <ReactMarkdown
                components={{
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
          className='w-full p-2 border rounded appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20 overflow-auto'
        >
          <option value='Technology'>Technology</option>
          <option value='Health'>Health</option>
          <option value='Education'>Education</option>
          <option value='Finance'>Finance</option>
          <option value='Lifestyle'>Lifestyle</option>
          <option value='Travel'>Travel</option>
          <option value='Food'>Food</option>
          <option value='Fashion'>Fashion</option>
          <option value='Entertainment'>Entertainment</option>
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
          className='w-full p-2 border rounded appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20 overflow-auto'
        >
          <option value='JavaScript'>JavaScript</option>
          <option value='React'>React</option>
          <option value='CSS'>CSS</option>
          <option value='HTML'>HTML</option>
          <option value='Next.js'>Next.js</option>
          <option value='Tailwind'>Tailwind</option>
          <option value='MongoDB'>MongoDB</option>
          <option value='Express'>Express</option>
          <option value='Node.js'>Node.js</option>
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
          <option value='draft'>Draft</option>
          <option value='published'>Published</option>
        </select>
      </div>

      <div className='mx-auto w-1/3 mt-5'>
        <Button variant={'destructive'} size='lg'>
          Add Blog
        </Button>
      </div>
    </div>
  );
};

export default Blog;
