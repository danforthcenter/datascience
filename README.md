# Donald Danforth Plant Science Center Data Science Facility

This repository contains the build files for the Data Science Facility documentation website.

After updating, to rebuild the site run the following on the webserver:

```bash
mkdocs build --site-dir /var/www/datascience --clean
ln -s /usr/share/ganglia /var/www/datascience/ganglia
```
