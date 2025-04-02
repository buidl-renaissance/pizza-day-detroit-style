import ClaimPoap from './ClaimPoap';

type Props = {
  params: Promise<{
    qr: string;
  }>;
};

export default async function ClaimPoapPage({ params }: Props) {
  const { qr } = await params;
  return <ClaimPoap qrCode={qr} />;
}

