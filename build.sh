#!/bin/bash

mkdocs build --site-dir /var/www/datascience --clean
ln -s /usr/share/ganglia /var/www/datascience/ganglia
mkdir /var/www/datascience/datasets
ln -s /data/datascience/data/fahlgren_et_al_2015_bellwether.tar.gz /var/www/datascience/datasets/fahlgren_et_al_2015_bellwether.tar.gz
ln -s /data/datascience/data/fahlgren_et_al_2015_bellwether_jpeg.tar.gz /var/www/datascience/datasets/fahlgren_et_al_2015_bellwether_jpeg.tar.gz
ln -s /data/bart/data/bart_sorghum_nitrogen_image_data.tar.gz /var/www/datascience/datasets/bart_sorghum_nitrogen_image_data.tar.gz
ln -s /data/bart/data/bart_nitrogen_data_and_scripts.tar.gz /var/www/datascience/datasets/bart_nitrogen_data_and_scripts.tar.gz
ln -s /data/bart/data/bart_homography_images.zip /var/www/datascience/datasets/bart_homography_images.zip
ln -s /data/bart/data/bart_homography_data_and_scripts.zip /var/www/datascience/datasets/bart_homography_data_and_scripts.zip

# Temporary files
ln -s /shares/bioinformatics/nfahlgren/projects/mrcnn/mask_rcnn_leaves_0060.h5 /var/www/datascience/mask_rcnn_leaves_0060.h5
ln -s /home/nfahlgren/download/data.zip /var/www/datascience/data.zip
ln -s /home/nfahlgren/download/ddpsc_network_2024.html /var/www/datascience/ddpsc_network_2024.html
