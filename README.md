# Pittmesh.net

## History

The first site was build on ModestMaps. It was great for a few years but showed
its age in how difficult it was to update. The next, and current, version was
built with Leaflet.js and made the site a lot easier to update!

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
|`MATTERMOST_WEBHOOK_URL`|The URL to which build status messages should be
sent|`http://example.com/mattermost/0xd34db33f`|

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
