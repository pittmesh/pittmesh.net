# Pittmesh.net

## History

The first site was built on [Jekyll](https://jekyllrb.com/) and [ModestMaps](http://modestmaps.com/). 
It was great for a few years but showed its age in how difficult it was to update. 
The next, and current, version was built with [Leaflet.js](https://leafletjs.com/) 
and made the site a lot easier to update!

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

