#!/usr/bin/env bash

if [[ -z "$(command -v jq)" ]]; then
  # shellcheck disable=SC2238
  2>& echo "jq is not available and must be. Install it somehow."
  # shellcheck disable=SC2238
  2>& echo "If you are seeing this on heroku, ensure that the jq buildpack is installed. See the README."
  exit 1
fi

tail -n +2 < "${1}" | sed '$d' | jq  -s '.[] | { type: "FeatureCollection", features: [ .[] | {type: "Feature", id: .name, properties: { address, hood, status, device_count }, geometry: { type: "Point", coordinates: [ .lon, .lat] } } ] }'
