import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Enquiry } from '@/models/Enquiry';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log('Received Enquiry Body:', body);
    const enquiry = await Enquiry.create(body);
    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit enquiry' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await dbConnect();
    const { id, status } = await request.json();
    const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json(enquiry);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { id } = await request.json();
    await Enquiry.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
