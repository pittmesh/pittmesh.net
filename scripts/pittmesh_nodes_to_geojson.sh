#!/usr/bin/env bash

if [[ -z "$(command -v jq)" ]]; then
  2>& echo "jq is not available and must be. Install it somehow."
  2>& echo "If you are seeing this on heroku, ensure that the jq buildpack is installed. See the README."
  exit 1
fi

cat "$1" | tail -n +2 | sed '$d' | jq  -s '.[] | { type: "FeatureCollection", features: [ .[] | {type: "Feature", id: .name, properties: { address, hood, status, device_count }, geometry: { type: "Point", coordinates: [ .lon, .lat] } } ] }'
