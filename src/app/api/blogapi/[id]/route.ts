import Blog from '@/lib/blogModel';
import { connectDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDb();
    const { id } = params;
    const blog = await Blog.findOne({ _id: id });
    if (!blog) {
      return new NextResponse(
        JSON.stringify({
          message: 'Blog not found',
        }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify({ blog, message: 'blog found' }), {
      status: 200,
    });
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
