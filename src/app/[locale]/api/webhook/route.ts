import { NextResponse } from 'next/server';

const defaultData = {
  jupiter: {
    id: 0,
    zodiac: 3,
    entryDate: '2024-05-01',
    exitDate: '2025-05-09'
  },
  venus: { id: 1, zodiac: 5, entryDate: '2024-07-01', exitDate: '2024-08-13' },
  saturn: {
    id: 2,
    zodiac: 11,
    entryDate: '2023-01-17',
    exitDate: '2025-03-29'
  },
  rahu: { id: 3, zodiac: 12, entryDate: '2023-10-30', exitDate: '2025-04-18' },
  ketu: { id: 4, zodiac: 6, entryDate: '2023-10-30', exitDate: '2025-04-18' }
};

let latestData = { ...defaultData };

export async function GET() {
  return NextResponse.json({ latestData });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body);

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    latestData = body;

    return NextResponse.json({
      message: 'Data updated successfully',
      latestData
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
