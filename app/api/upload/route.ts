import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    // Upload to ImgBB
    const imgbbForm = new FormData();
    imgbbForm.append('image', base64);
    
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: 'POST',
      body: imgbbForm,
    });
    
    const data = await res.json();
    
    if (!data.success) {
      throw new Error(data.error?.message || 'Upload failed');
    }

    // Ensure URL is properly encoded (handles spaces/special chars in filenames)
    const rawUrl = data.data.url;
    const encodedUrl = rawUrl.replace(/ /g, '%20');
    
    return NextResponse.json({ url: encodedUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
