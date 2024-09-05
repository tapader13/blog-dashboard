import Blog from '@/lib/blogModel';
import { connectDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();
    const {
      title,
      slug,
      description,
      category,
      tags,
      status,
      specificCategory,
    } = await req.json();
    const blog = await Blog.create({
      title,
      slug,
      description,
      category,
      tags,
      status,
      specificCategory,
    });
    console.log(blog);
    return new NextResponse(
      JSON.stringify({
        message: 'Blog created successfully',
        blog,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: 'Error creating blog',
        error,
      }),
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectDb();

    const blogs = await Blog.find();
    return new NextResponse(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: 'Error fetching blog(s)',
        error,
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const blog = await Blog.findByIdAndDelete(id);
    console.log(blog);
    if (!blog) {
      return new NextResponse(
        JSON.stringify({
          message: 'Blog not found',
        }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: 'Blog deleted successfully',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: 'Error deleting blog',
        error,
      }),
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await connectDb();
    const {
      id,
      title,
      slug,
      description,
      category,
      tags,
      status,
      specificCategory,
    } = await req.json();

    if (!id) {
      return new NextResponse(
        JSON.stringify({
          message: 'Blog ID is required',
        }),
        { status: 400 }
      );
    }

    const result = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        description,
        category,
        tags,
        status,
        specificCategory,
      },
      { new: true }
    );

    if (!result) {
      return new NextResponse(
        JSON.stringify({
          message: 'Blog not found',
        }),
        { status: 404 }
      );
    }
    console.log(result);
    return new NextResponse(
      JSON.stringify({
        message: 'Blog updated successfully',
        blog: result,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: 'Error updating blog',
        error,
      }),
      { status: 500 }
    );
  }
};
