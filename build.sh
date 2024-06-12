#!/bin/bash

mkdocs build --site-dir /var/www/datascience --clean
ln -s /usr/share/ganglia /var/www/datascience/ganglia
mkdir /var/www/datascience/datasets
ln -s /data/datascience/data/fahlgren_et_al_2015_bellwether.tar.gz /var/www/datascience/datasets/fahlgren_et_al_2015_bellwether.tar.gz
ln -s /data/datascience/data/fahlgren_et_al_2015_bellwether_jpeg.tar.gz /var/www/datascience/datasets/fahlgren_et_al_2015_bellwether_jpeg.tar.gz

# Temporary files
ln -s /shares/bioinformatics/nfahlgren/projects/mrcnn/mask_rcnn_leaves_0060.h5 /var/www/datascience/mask_rcnn_leaves_0060.h5
ln -s /home/nfahlgren/download/data.zip /var/www/datascience/data.zip
