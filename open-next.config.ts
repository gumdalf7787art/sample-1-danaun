import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Initial public-site deployment: persistent ISR caching is not enabled yet.
// Add an R2 cache override only after the corresponding bucket is provisioned.
export default defineCloudflareConfig({});
