export async function GET() {
  const payload = {
    envMaintenance: process.env.MAINTENANCE_MODE ?? null,
    nextPublicMaintenance: process.env.NEXT_PUBLIC_MAINTENANCE_MODE ?? null,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    nodeEnv: process.env.NODE_ENV ?? null,
    timestamp: new Date().toISOString(),
  };
  return Response.json(payload, { headers: { 'Cache-Control': 'no-store' } });
}


