import {getClinicMedia} from '../../../lib/clinic-media.mjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(await getClinicMedia({liveVideos:true}), {
    headers: {'Cache-Control':'no-store', 'X-Robots-Tag':'noindex'},
  });
}
