#!/bin/bash

mkdocs build --site-dir /var/www/datascience --clean
ln -s /usr/share/ganglia /var/www/datascience/ganglia
mkdir /var/www/datascience/datasets
ln -s /data/datascience/data/fahlgren_et_al_2015_bellwether.tar.gz /var/www/datascience/datasets/fahlgren_et_al_2015_bellwether.tar.gz
ln -s /data/datascience/data/fahlgren_et_al_2015_bellwether_jpeg.tar.gz /var/www/datascience/datasets/fahlgren_et_al_2015_bellwether_jpeg.tar.gz
