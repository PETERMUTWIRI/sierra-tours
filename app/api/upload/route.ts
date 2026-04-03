import { NextRequest, NextResponse } from 'next/server';

// Upload image to imgbb
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }
    
    // Convert file to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    
    // Upload to imgbb
    const apiKey = process.env.IMGBB_API_KEY;
    const uploadFormData = new FormData();
    uploadFormData.append('image', base64Image);
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: uploadFormData,
    });
    
    const data = await response.json();
    
    if (!data.success) {
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
    
    return NextResponse.json({
      url: data.data.url,
      thumb: data.data.thumb?.url || data.data.url,
      deleteUrl: data.data.delete_url,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
