# Donald Danforth Plant Science Center Data Science Facility

This repository contains the build files for the Data Science Facility website.
The theme is based on the [Grayscale Jekyll theme](https://github.com/jeromelachaud/grayscale-theme).

After updating, to rebuild the site run the following on the webserver:

```bash
scl enable rh-ruby25 bash
jekyll build -d /var/www/datascience
```
