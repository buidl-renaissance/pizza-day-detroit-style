import { NextResponse } from 'next/server';
import { getPoapsForWallet } from '@/utils/poap';
import { PoapToken } from '@/utils/interfaces';

const relevantPoapIds = [
  '7327662',
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');
  
  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }
  
  try {
    const poaps = await getPoapsForWallet(walletAddress);
    const relevantPoap = poaps.filter((poap: PoapToken) => relevantPoapIds.includes(poap.tokenId));
    return NextResponse.json({ relevantPoap });
  } catch (error) {
    console.error('Error fetching POAPs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch POAPs' }, 
      { status: 500 }
    );
  }
}
