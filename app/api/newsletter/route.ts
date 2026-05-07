import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Newsletter } from '@/models/Newsletter';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email } = await request.json();
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: true, message: 'Already subscribed' });
    }

    const subscription = await Newsletter.create({ email });
    return NextResponse.json({ success: true, data: subscription });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ success: false, error: 'Failed to subscribe' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { id } = await request.json();
    await Newsletter.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
  }
}
