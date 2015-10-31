PittMesh.net 
============

[![Build Status](https://travis-ci.org/pittmesh/pittmesh.net.svg)](https://travis-ci.org/pittmesh/pittmesh.net)

This is the code that powers [pittmesh.net](http://www.pittmesh.net).

Contributing
------------

Found a bug in the site? Please file an issue and consider submitting a pull
request.

Need to add more nodes? Add it yourself and submit the pull request, or file an
issue. Ensure that you have permission from the node host to put the point on
the map, especially when using their name. It's probably better to use letters
from the [NATO phonetic
alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet) if you're
unsure.

Deploying
---------

We use Heroku for hosting. If you think you should have deploy access, file an
issue.

Deployment workflow is as follows:

1. Deploy to pittmesh-net-staging
2. Test changes on http://staging.pittmesh.net
3. Use the pipeline to promote: `heroku pipeline:promote`

License
-------

This software is (c) 2012-2014 Meta Mesh, LLC.

All original code is licensed under the terms of the Affero General Public License.

All artwork is licensed under the terms of the Creative Commons 3.0 BY-SA license,
unless otherwise specified.

Includes code from [Modest Maps](http://modestmaps.com/) under BSD license.

Map pin image is public domain, but drawn by
[netalloy](https://openclipart.org/detail/169839/map-pin-by-netalloy).
