#!/bin/bash

mkdocs build --site-dir /var/www/datascience --clean
mkdir /var/www/datascience/datasets
mkdir /var/www/datascience/workshops
ln -s /data/datascience/data/fahlgren_et_al_2015_bellwether.tar.gz /var/www/datascience/datasets/fahlgren_et_al_2015_bellwether.tar.gz
ln -s /data/datascience/data/fahlgren_et_al_2015_bellwether_jpeg.tar.gz /var/www/datascience/datasets/fahlgren_et_al_2015_bellwether_jpeg.tar.gz
ln -s /data/datascience/data/ddpsc_network_2024.html /var/www/datascience/ddpsc_network_2025.html
ln -s /data/bart/data/bart_sorghum_nitrogen_image_data.tar.gz /var/www/datascience/datasets/bart_sorghum_nitrogen_image_data.tar.gz
ln -s /data/bart/data/bart_nitrogen_data_and_scripts.tar.gz /var/www/datascience/datasets/bart_nitrogen_data_and_scripts.tar.gz
ln -s /data/bart/data/bart_homography_images.zip /var/www/datascience/datasets/bart_homography_images.zip
ln -s /data/bart/data/bart_homography_data_and_scripts.zip /var/www/datascience/datasets/bart_homography_data_and_scripts.zip
ln -s /data/datascience/data/mockler-hazelnut-genome-data.tar.gz /var/www/datascience/datasets/mockler-hazelnut-genome-data.tar.gz
ln -s /data/datascience/data/workshops/ggplot-Workshop.zip /var/www/datascience/workshops/ggplot-Workshop.zip
ln -s /data/datascience/data/workshops/pcvr-workshop.zip /var/www/datascience/workshops/pcvr-workshop.zip
ln -s /data/datascience/data/workshops/single-plant-analysis-tutorial.zip /var/www/datascience/workshops/single-plant-analysis-tutorial.zip
ln -s /data/datascience/data/workshops/multiple-plant-analysis-tutorial.zip /var/www/datascience/workshops/multiple-plant-analysis-tutorial.zip
ln -s /data/datascience/data/workshops/hyperspectral-data-tutorial.zip /var/www/datascience/workshops/hyperspectral-data-tutorial.zip
ln -s /data/datascience/data/workshops/naive-bayes-classifier-workshop.zip /var/www/datascience/workshops/naive-bayes-classifier-workshop.zip
ln -s /data/datascience/data/workshops/bean-phenotyping-lab.zip /var/www/datascience/workshops/bean-phenotyping-lab.zip
ln -s /data/datascience/data/workshops/stats-tests-r-workshops.zip /var/www/datascience/workshops/stats-tests-r-workshops.zip
