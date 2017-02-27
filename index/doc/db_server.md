# VenomKB database server

_author: Joseph D. Romano_
_last updated: 02-25-2017_

VenomKB consists of two major components:

- The web app hosted at venomkb.org
- The MongoDB database - hosted separately - that the web app communicates with

This document describes the technical configuration of the MongoDB database. For information about the structure of the web app, refer to the other documents in this directory, as well as the README in the project's root directory.

- - -

### Server location

The database server is located on an AWS EC2 instance at `54.198.136.17:27017`. Currently, no authentication is required to connect, and users can connect from any IP. This will change in the [relatively] near future.

- - -

### Database details

The database containing all of the existing functionality is `venomkb_test`. After connecting to the MongoDB shell, you can access the database via the command `use venomkb_test`.

`venomkb_test` contains 4 collections:

- `protein`
- `species`
- `synthetic_venom_derivative`
- `venom`

These are self-explanatory, and described in further detail in the rest of the documentation.