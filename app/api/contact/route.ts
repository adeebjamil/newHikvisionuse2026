import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Contact } from '@/models/Contact';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const contact = await Contact.create(body);
    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const messages = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await dbConnect();
    const { id, statusField, value } = await request.json();
    const update = { [statusField]: value };
    const contact = await Contact.findByIdAndUpdate(id, update, { new: true });
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { id } = await request.json();
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
