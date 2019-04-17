# Pittmesh.net

[![Build Status](https://travis-ci.org/pittmesh/pittmesh.net.svg)](https://travis-ci.org/pittmesh/pittmesh.net)

This is the code that powers [pittmesh.net](http://www.pittmesh.net).

## Contributing

Found a bug in the site? Please file an issue and consider submitting a pull
request.

Need to add more nodes? Add it yourself and submit the pull request, or file an
issue. Ensure that you have permission from the node host to put the point on
the map, especially when using their name. It's probably better to use letters
from the [NATO phonetic
alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet) if you're
unsure.

To update the nodes, submit a pull request for your changes to
`src/node-data/nodes.json`. The information there is pretty obvious.

To update links, submit a pull request with your changes to
`src/node-data/links.json`. The text to put in the field is the name field from
`nodes.json`. **If the names do not match exactly, the link will not show.**
Check the browser console log for hints.

**All additions must be submitted via pull request.**

## Deployment

This site is deployed to a Meta Mesh server running Docker. Pushes to master
are deployed in seconds.

### Environment

The following variables must be set:

|Variable|Purpose|Example|
|--------|-------|-------|
|`SSH_HOST`|The hostname of the deployment target server|`server.metamesh.org`|
|`SSH_PORT`|The port of that SSH is listening on|`22222`|
|`SSH_USER`|The user of that SSH should use to access the host|`notroot`|
|`MATTERMOST_WEBHOOK_URL`|The URL to which build status messages should be sent|`http://example.com/mattermost/0xd34db33f`|

These can all be set and reset using

    travis encrypt --com VARIABLE=value --add

This repository also includes an encrypted private key for that user instead of
using password authentication. Assuming that the key is located in your local
.ssh directory, a command like this will re-encrypt it.

    travis encrypt-file --com ~/.ssh/id_ed25519.pittmesh.net.travis etc/deploy/ssh/id_ed25519.pittmesh.net.travis.enc

### Deploying semi-manually when PittMesh.net is offline

Sometimes the server on which this is hosted kills the site's container and
doesn't restart it. The easiest way to restart that container is to manually
start a CI build on the `master` branch, using these instructions:

1. Go to the [Travis build branches list](https://travis-ci.com/pittmesh/pittmesh.net/branches).
2. Ensure that the latest master branch build is green: in the boxes to the right, the leftmost _must_ be green and the text to the left of it _should_ say something like `#9 passed`. If it's not green, something went wrong and Colin will probably need to look at it.
3. Go up to "More Options" on the righthand side.
4. Click on "Trigger build".
5. Choose "master" branch and click "Trigger custom build".

## History

The first site was built on [Jekyll](https://jekyllrb.com/) and [ModestMaps](http://modestmaps.com/). 
It was great for a few years but showed its age in how difficult it was to update. 
The next, and current, version was built with [Leaflet.js](https://leafletjs.com/) 
and made the site a lot easier to update!

## License

This software is (c) 2012-2015 Meta Mesh, LLC. and 2016-2019 Meta Mesh Wireless Communities.

All original code is licensed under the terms of the Affero General Public License.

All artwork is licensed under the terms of the Creative Commons 3.0 BY-SA license,
unless otherwise specified.

Uses [Leaflet.js](https://leafletjs.com/).

Map pin image is public domain, but drawn by
[netalloy](https://openclipart.org/detail/169839/map-pin-by-netalloy).
