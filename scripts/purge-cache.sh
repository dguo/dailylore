#!/usr/bin/env bash

set -e
set -o pipefail

echo Clearing the CloudFlare cache..

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
     -H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" \
     -H "X-Auth-Key: ${CLOUDFLARE_API_KEY}" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}' | \
     tee /dev/tty | \
     python -c "import json, sys; response = json.load(sys.stdin); exit(0 if response['success'] else 1)"

