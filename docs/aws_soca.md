# Scale-Out Computing on AWS (SOCA)

Full documentation:
[https://awslabs.github.io/scale-out-computing-on-aws-documentation/](https://awslabs.github.io/scale-out-computing-on-aws-documentation/)

!!! note
    - You must be on the Danforth Center local network or connected via VPN to access the web or command-line interface.
    - For VPN connections, use the **Full Protection** connection option in FortiClient.
    - For remote command-line work, you can log into `stargate` first and then log into SOCA.

## Web interface

Site: [https://soca.datasci.danforthcenter.org](https://soca.datasci.danforthcenter.org)

## Command-line interface

The SOCA scheduler uses the PBS resource manager (analogous to HTCondor). PBS job files are written as shell scripts.

!!! note
    - Always set the project using the `-P` option — the project name should be the name of your group (e.g. `baxter`, `datascience`, `phenotyping`)
    - All SOCA-specific job parameters (`-l`) are described in the [SOCA documentation](https://awslabs.github.io/scale-out-computing-on-aws-documentation/)

### Job template program

To quickly generate a job file template with common settings:

```bash
# Example
job-template myjob.sh
```

Then edit the job file as needed.

You can also set common options with command-line arguments:

```
# usage: job-template [-h] [-n NAME] [-t TYPE] [-d SCRATCH] [-s] filename
#
# Create a SOCA job template file.
#
# positional arguments:
#   filename              Name of the job file.
#
# options:
#   -h, --help            show this help message and exit
#   -n NAME, --name NAME  Name of the job.
#   -t TYPE, --type TYPE  Type of instance.
#   -d SCRATCH, --scratch SCRATCH
#                         Scratch space (GB).
#   -s, --spot            Use spot instances.

# Example
job-template myjob.sh -n testjob -t t3.xlarge -d 100 -s
```

### Example interactive session

Shell script (e.g. `mysession.sh`):

```bash
#!/bin/bash
## BEGIN PBS SETTINGS: Note PBS lines MUST start with #
#PBS -N interactive-job
#PBS -V -j oe -o interactive-job.qlog
#PBS -P datascience
#PBS -q normal
#PBS -l nodes=1,instance_type=t3.nano
#PBS -l system_metrics=true
## END PBS SETTINGS

## BEGIN ACTUAL CODE

## END ACTUAL CODE
```

Start the session:

```bash
qsub -I mysession.sh
```

### Example non-interactive job with Spot pricing

Job shell script (e.g. `myjob.sh`):

```bash
#!/bin/bash
## BEGIN PBS SETTINGS: Note PBS lines MUST start with #
#PBS -N my-conda-env-job
#PBS -V -j oe -o my-conda-env-job.qlog
#PBS -P datascience
#PBS -q normal
#PBS -l nodes=1,instance_type=t3.xlarge,spot_price=auto
#PBS -l system_metrics=true
## END PBS SETTINGS

## BEGIN ACTUAL CODE
# Activate a virtual environment, if needed
source ~/.bash_profile
conda activate myenv

samtools view -b alignment.sam | samtools sort -@ 4 -m 4G -o sorted.alignment.bam
## END ACTUAL CODE
```

### Choosing a compute instance type

The tables below are a subset of AWS EC2 compute instances covering most common use cases. GPU instances (Accelerated
Computing) should only be used after consulting the Data Science team.

!!! note
    To compare detailed information about all compute types, see [https://instances.vantage.sh/](https://instances.vantage.sh/)

#### Affordable instances with burstable performance

| API Name    | Compute Family  | Instance Memory | vCPUs                  | Instance Storage | Network Performance | On Demand      | Linux Spot Average cost | Linux Spot Interrupt Frequency |
| ----------- | --------------- | --------------- | ---------------------- | ---------------- | ------------------- | -------------- | ----------------------- | ------------------------------ |
| t3.nano     | General purpose | 0.5 GiB         | 2 vCPUs (1h 12m burst) | EBS only         | Up to 5 Gigabit     | $0.0052 hourly | $0.0006 hourly          | <5%                            |
| t3.micro    | General purpose | 1 GiB           | 2 vCPUs (2h 24m burst) | EBS only         | Up to 5 Gigabit     | $0.0104 hourly | $0.0016 hourly          | <5%                            |
| t3.small    | General purpose | 2 GiB           | 2 vCPUs (4h 48m burst) | EBS only         | Up to 5 Gigabit     | $0.0208 hourly | $0.0042 hourly          | <5%                            |
| t3.medium   | General purpose | 4 GiB           | 2 vCPUs (4h 48m burst) | EBS only         | Up to 5 Gigabit     | $0.0416 hourly | $0.0089 hourly          | 5-10%                          |
| t3.large    | General purpose | 8 GiB           | 2 vCPUs (7h 12m burst) | EBS only         | Up to 5 Gigabit     | $0.0832 hourly | $0.0237 hourly          | <5%                            |
| t3.xlarge   | General purpose | 16 GiB          | 4 vCPUs (9h 36m burst) | EBS only         | Up to 5 Gigabit     | $0.1664 hourly | $0.0419 hourly          | <5%                            |
| t3.2xlarge  | General purpose | 32 GiB          | 8 vCPUs (9h 36m burst) | EBS only         | Up to 5 Gigabit     | $0.3328 hourly | $0.0635 hourly          | <5%                            |

#### General purpose compute instances

| API Name    | Compute Family  | Instance Memory | vCPUs    | Instance Storage | Network Performance | On Demand    | Linux Spot Average cost | Linux Spot Interrupt Frequency |
| ----------- | --------------- | --------------- | -------- | ---------------- | ------------------- | ------------ | ----------------------- | ------------------------------ |
| m4.large    | General purpose | 8 GiB           | 2 vCPUs  | EBS only         | Moderate            | $0.10 hourly | $0.0316 hourly          | 15-20%                         |
| m4.xlarge   | General purpose | 16 GiB          | 4 vCPUs  | EBS only         | High                | $0.20 hourly | $0.0583 hourly          | 10-15%                         |
| m4.2xlarge  | General purpose | 32 GiB          | 8 vCPUs  | EBS only         | High                | $0.40 hourly | $0.1116 hourly          | 15-20%                         |
| m4.4xlarge  | General purpose | 64 GiB          | 16 vCPUs | EBS only         | High                | $0.80 hourly | $0.2649 hourly          | 15-20%                         |
| m4.10xlarge | General purpose | 160 GiB         | 40 vCPUs | EBS only         | 10 Gigabit          | $2.00 hourly | $0.4763 hourly          | 5-10%                          |
| m4.16xlarge | General purpose | 256 GiB         | 64 vCPUs | EBS only         | 25 Gigabit          | $3.20 hourly | $0.6755 hourly          | >20%                           |
| m5.large      | General purpose | 8 GiB           | 2 vCPUs  | EBS only                    | Up to 10 Gigabit    | $0.096 hourly  | $0.0254 hourly          | >20%                           |
| m5.xlarge     | General purpose | 16 GiB          | 4 vCPUs  | EBS only                    | Up to 10 Gigabit    | $0.192 hourly  | $0.0395 hourly          | >20%                           |
| m5.2xlarge    | General purpose | 32 GiB          | 8 vCPUs  | EBS only                    | Up to 10 Gigabit    | $0.384 hourly  | $0.0908 hourly          | >20%                           |
| m5.4xlarge    | General purpose | 64 GiB          | 16 vCPUs | EBS only                    | Up to 10 Gigabit    | $0.768 hourly  | $0.2114 hourly          | >20%                           |
| m5.8xlarge    | General purpose | 128 GiB         | 32 vCPUs | EBS only                    | 10 Gigabit          | $1.536 hourly  | $0.3067 hourly          | 15-20%                         |
| m5.12xlarge   | General purpose | 192 GiB         | 48 vCPUs | EBS only                    | 12 Gigabit          | $2.304 hourly  | $0.4177 hourly          | 15-20%                         |
| m5.16xlarge   | General purpose | 256 GiB         | 64 vCPUs | EBS only                    | 20 Gigabit          | $3.072 hourly  | $0.6415 hourly          | 15-20%                         |
| m5.24xlarge   | General purpose | 384 GiB         | 96 vCPUs | EBS only                    | 25 Gigabit          | $4.608 hourly  | $1.0833 hourly          | >20%                           |
| m5.metal      | General purpose | 384 GiB         | 96 vCPUs | EBS only                    | 25 Gigabit          | $4.608 hourly  | $1.1919 hourly          | 10-15%                         |
| m6i.large      | General purpose | 8 GiB           | 2 vCPUs   | EBS only                     | Up to 12.5 Gigabit  | $0.096 hourly   | $0.0252 hourly          | >20%                           |
| m6i.xlarge     | General purpose | 16 GiB          | 4 vCPUs   | EBS only                     | Up to 12.5 Gigabit  | $0.192 hourly   | $0.0518 hourly          | >20%                           |
| m6i.2xlarge    | General purpose | 32 GiB          | 8 vCPUs   | EBS only                     | Up to 12.5 Gigabit  | $0.384 hourly   | $0.1054 hourly          | >20%                           |
| m6i.4xlarge    | General purpose | 64 GiB          | 16 vCPUs  | EBS only                     | Up to 12.5 Gigabit  | $0.768 hourly   | $0.123 hourly           | >20%                           |
| m6i.8xlarge    | General purpose | 128 GiB         | 32 vCPUs  | EBS only                     | 12.5 Gigabit        | $1.536 hourly   | $0.7567 hourly          | >20%                           |
| m6i.12xlarge   | General purpose | 192 GiB         | 48 vCPUs  | EBS only                     | 18.75 Gigabit       | $2.304 hourly   | $0.4322 hourly          | >20%                           |
| m6i.16xlarge   | General purpose | 256 GiB         | 64 vCPUs  | EBS only                     | 25 Gigabit          | $3.072 hourly   | $0.5075 hourly          | >20%                           |
| m6i.24xlarge   | General purpose | 384 GiB         | 96 vCPUs  | EBS only                     | 37.5 Gigabit        | $4.608 hourly   | $1.2939 hourly          | >20%                           |
| m6i.32xlarge   | General purpose | 512 GiB         | 128 vCPUs | EBS only                     | 50 Gigabit          | $6.144 hourly   | $1.3336 hourly          | >20%                           |
| m6i.metal      | General purpose | 512 GiB         | 128 vCPUs | EBS only                     | 50 Gigabit          | $6.144 hourly   | $1.0501 hourly          | >20%                           |

#### Compute optimized instances

| API Name   | Compute Family    | Instance Memory | vCPUs    | Instance Storage | Network Performance | On Demand     | Linux Spot Average cost | Linux Spot Interrupt Frequency |
| ---------- | ----------------- | --------------- | -------- | ---------------- | ------------------- | ------------- | ----------------------- | ------------------------------ |
| c4.large   | Compute optimized | 3.75 GiB        | 2 vCPUs  | EBS only         | Moderate            | $0.10 hourly  | $0.0152 hourly          | >20%                           |
| c4.xlarge  | Compute optimized | 7.5 GiB         | 4 vCPUs  | EBS only         | High                | $0.199 hourly | $0.0338 hourly          | >20%                           |
| c4.2xlarge | Compute optimized | 15 GiB          | 8 vCPUs  | EBS only         | High                | $0.398 hourly | $0.1096 hourly          | >20%                           |
| c4.4xlarge | Compute optimized | 30 GiB          | 16 vCPUs | EBS only         | High                | $0.796 hourly | $0.2151 hourly          | >20%                           |
| c4.8xlarge | Compute optimized | 60 GiB          | 36 vCPUs | EBS only         | 10 Gigabit          | $1.591 hourly | $0.2933 hourly          | >20%                           |
| c5.large      | Compute optimized | 4 GiB           | 2 vCPUs  | EBS only                     | Up to 10 Gigabit    | $0.085 hourly | $0.0205 hourly          | >20%                           |
| c5.xlarge     | Compute optimized | 8 GiB           | 4 vCPUs  | EBS only                     | Up to 10 Gigabit    | $0.17 hourly  | $0.0432 hourly          | >20%                           |
| c5.2xlarge    | Compute optimized | 16 GiB          | 8 vCPUs  | EBS only                     | Up to 10 Gigabit    | $0.34 hourly  | $0.0629 hourly          | >20%                           |
| c5.4xlarge    | Compute optimized | 32 GiB          | 16 vCPUs | EBS only                     | Up to 10 Gigabit    | $0.68 hourly  | $0.1243 hourly          | >20%                           |
| c5.9xlarge    | Compute optimized | 72 GiB          | 36 vCPUs | EBS only                     | 12 Gigabit          | $1.53 hourly  | $0.2783 hourly          | 10-15%                         |
| c5.12xlarge   | Compute optimized | 96 GiB          | 48 vCPUs | EBS only                     | 12 Gigabit          | $2.04 hourly  | $0.3785 hourly          | 15-20%                         |
| c5.18xlarge   | Compute optimized | 144 GiB         | 72 vCPUs | EBS only                     | 25 Gigabit          | $3.06 hourly  | $0.7178 hourly          | >20%                           |
| c5.24xlarge   | Compute optimized | 192 GiB         | 96 vCPUs | EBS only                     | 25 Gigabit          | $4.08 hourly  | $1.0446 hourly          | >20%                           |
| c5.metal      | Compute optimized | 192 GiB         | 96 vCPUs | EBS only                     | 25 Gigabit          | $4.08 hourly  | $0.7489 hourly          | 15-20%                         |
| c6i.large     | Compute optimized | 4 GiB           | 2 vCPUs   | EBS only                     | Up to 12.5 Gigabit  | $0.085 hourly  | $0.0202 hourly          | 15-20%                         |
| c6i.xlarge    | Compute optimized | 8 GiB           | 4 vCPUs   | EBS only                     | Up to 12.5 Gigabit  | $0.17 hourly   | $0.0452 hourly          | 15-20%                         |
| c6i.2xlarge   | Compute optimized | 16 GiB          | 8 vCPUs   | EBS only                     | Up to 12.5 Gigabit  | $0.34 hourly   | $0.1177 hourly          | >20%                           |
| c6i.4xlarge   | Compute optimized | 32 GiB          | 16 vCPUs  | EBS only                     | Up to 12.5 Gigabit  | $0.68 hourly   | $0.1648 hourly          | 15-20%                         |
| c6i.8xlarge   | Compute optimized | 64 GiB          | 32 vCPUs  | EBS only                     | 12.5 Gigabit        | $1.36 hourly   | $0.2986 hourly          | 15-20%                         |
| c6i.12xlarge  | Compute optimized | 96 GiB          | 48 vCPUs  | EBS only                     | 18.75 Gigabit       | $2.04 hourly   | $0.4501 hourly          | 15-20%                         |
| c6i.16xlarge  | Compute optimized | 128 GiB         | 64 vCPUs  | EBS only                     | 25 Gigabit          | $2.72 hourly   | $0.553 hourly           | 10-15%                         |
| c6i.24xlarge  | Compute optimized | 192 GiB         | 96 vCPUs  | EBS only                     | 37.5 Gigabit        | $4.08 hourly   | $1.1154 hourly          | >20%                           |
| c6i.32xlarge  | Compute optimized | 256 GiB         | 128 vCPUs | EBS only                     | 50 Gigabit          | $5.44 hourly   | $1.2924 hourly          | 10-15%                         |
| c6i.metal     | Compute optimized | 256 GiB         | 128 vCPUs | EBS only                     | 50 Gigabit          | $5.44 hourly   | $1.3813 hourly          | 5-10%                          |

#### Memory optimized instances

| API Name    | Compute Family   | Instance Memory | vCPUs    | Instance Storage | Network Performance | On Demand     | Linux Spot Average cost | Linux Spot Interrupt Frequency |
| ----------- | ---------------- | --------------- | -------- | ---------------- | ------------------- | ------------- | ----------------------- | ------------------------------ |
| r4.large    | Memory optimized | 15.25 GiB       | 2 vCPUs  | EBS only         | Up to 10 Gigabit    | $0.133 hourly | $0.0282 hourly          | <5%                            |
| r4.xlarge   | Memory optimized | 30.5 GiB        | 4 vCPUs  | EBS only         | Up to 10 Gigabit    | $0.266 hourly | $0.1116 hourly          | <5%                            |
| r4.2xlarge  | Memory optimized | 61 GiB          | 8 vCPUs  | EBS only         | Up to 10 Gigabit    | $0.532 hourly | $0.1782 hourly          | <5%                            |
| r4.4xlarge  | Memory optimized | 122 GiB         | 16 vCPUs | EBS only         | Up to 10 Gigabit    | $1.064 hourly | $0.3678 hourly          | 5-10%                          |
| r4.8xlarge  | Memory optimized | 244 GiB         | 32 vCPUs | EBS only         | 10 Gigabit          | $2.128 hourly | $0.6334 hourly          | <5%                            |
| r4.16xlarge | Memory optimized | 488 GiB         | 64 vCPUs | EBS only         | 25 Gigabit          | $4.256 hourly | $0.8787 hourly          | <5%                            |
| r5.large      | Memory optimized | 16 GiB          | 2 vCPUs  | EBS only                    | Up to 10 Gigabit    | $0.126 hourly | $0.0253 hourly          | 10-15%                         |
| r5.xlarge     | Memory optimized | 32 GiB          | 4 vCPUs  | EBS only                    | Up to 10 Gigabit    | $0.252 hourly | $0.0571 hourly          | 10-15%                         |
| r5.2xlarge    | Memory optimized | 64 GiB          | 8 vCPUs  | EBS only                    | Up to 10 Gigabit    | $0.504 hourly | $0.1172 hourly          | 10-15%                         |
| r5.4xlarge    | Memory optimized | 128 GiB         | 16 vCPUs | EBS only                    | Up to 10 Gigabit    | $1.008 hourly | $0.2406 hourly          | 10-15%                         |
| r5.8xlarge    | Memory optimized | 256 GiB         | 32 vCPUs | EBS only                    | 10 Gigabit          | $2.016 hourly | $0.5559 hourly          | 5-10%                          |
| r5.12xlarge   | Memory optimized | 384 GiB         | 48 vCPUs | EBS only                    | 12 Gigabit          | $3.024 hourly | $0.6943 hourly          | 10-15%                         |
| r5.16xlarge   | Memory optimized | 512 GiB         | 64 vCPUs | EBS only                    | 20 Gigabit          | $4.032 hourly | $1.032 hourly           | 15-20%                         |
| r5.24xlarge   | Memory optimized | 768 GiB         | 96 vCPUs | EBS only                    | 25 Gigabit          | $6.048 hourly | $1.4755 hourly          | >20%                           |
| r5.metal      | Memory optimized | 768 GiB         | 96 vCPUs | EBS only                    | 25 Gigabit          | $6.048 hourly | $1.5374 hourly          | 5-10%                          |
| r6i.large      | Memory optimized | 16 GiB          | 2 vCPUs   | EBS only                     | Up to 12.5 Gigabit  | $0.126 hourly   | $0.0439 hourly          | 15-20%                         |
| r6i.xlarge     | Memory optimized | 32 GiB          | 4 vCPUs   | EBS only                     | Up to 12.5 Gigabit  | $0.252 hourly   | $0.0784 hourly          | 10-15%                         |
| r6i.2xlarge    | Memory optimized | 64 GiB          | 8 vCPUs   | EBS only                     | Up to 12.5 Gigabit  | $0.504 hourly   | $0.1708 hourly          | >20%                           |
| r6i.4xlarge    | Memory optimized | 128 GiB         | 16 vCPUs  | EBS only                     | Up to 12.5 Gigabit  | $1.008 hourly   | $0.3274 hourly          | >20%                           |
| r6i.8xlarge    | Memory optimized | 256 GiB         | 32 vCPUs  | EBS only                     | 12.5 Gigabit        | $2.016 hourly   | $0.469 hourly           | >20%                           |
| r6i.12xlarge   | Memory optimized | 384 GiB         | 48 vCPUs  | EBS only                     | 18.75 Gigabit       | $3.024 hourly   | $0.8428 hourly          | >20%                           |
| r6i.16xlarge   | Memory optimized | 512 GiB         | 64 vCPUs  | EBS only                     | 25 Gigabit          | $4.032 hourly   | $1.1608 hourly          | >20%                           |
| r6i.24xlarge   | Memory optimized | 768 GiB         | 96 vCPUs  | EBS only                     | 37.5 Gigabit        | $6.048 hourly   | $1.7213 hourly          | 15-20%                         |
| r6i.32xlarge   | Memory optimized | 1024 GiB        | 128 vCPUs | EBS only                     | 50 Gigabit          | $8.064 hourly   | $1.8504 hourly          | 15-20%                         |
| r6i.metal      | Memory optimized | 1024 GiB        | 128 vCPUs | EBS only                     | 50 Gigabit          | $8.064 hourly   | $1.9018 hourly          | 5-10%                          |

#### GPU instances

| API Name      | Compute Family | Instance Memory | vCPUs    | GPUs | GPU model             | Instance Storage            | Network Performance | On Demand     | Linux Spot Average cost | Linux Spot Interrupt Frequency |
| ------------- | -------------- | --------------- | -------- | ---- | --------------------- | --------------------------- | ------------------- | ------------- | ----------------------- | ------------------------------ |
| g4dn.xlarge   | GPU instance   | 16 GiB          | 4 vCPUs  | 1    | NVIDIA T4 Tensor Core | 125 GB NVMe SSD             | Up to 25 Gigabit    | $0.526 hourly | $0.1234 hourly          | 5-10%                          |
| g4dn.2xlarge  | GPU instance   | 32 GiB          | 8 vCPUs  | 1    | NVIDIA T4 Tensor Core | 225 GB NVMe SSD             | Up to 25 Gigabit    | $0.752 hourly | $0.1506 hourly          | 15-20%                         |
| g4dn.4xlarge  | GPU instance   | 64 GiB          | 16 vCPUs | 1    | NVIDIA T4 Tensor Core | 225 GB NVMe SSD             | Up to 25 Gigabit    | $1.204 hourly | $0.3807 hourly          | >20%                           |
| g4dn.8xlarge  | GPU instance   | 128 GiB         | 32 vCPUs | 1    | NVIDIA T4 Tensor Core | 900 GB NVMe SSD             | 50 Gigabit          | $2.176 hourly | $0.6146 hourly          | >20%                           |
| g4dn.12xlarge | GPU instance   | 192 GiB         | 48 vCPUs | 4    | NVIDIA T4 Tensor Core | 900 GB NVMe SSD             | 50 Gigabit          | $3.912 hourly | $1.0445 hourly          | >20%                           |
| g4dn.16xlarge | GPU instance   | 256 GiB         | 64 vCPUs | 1    | NVIDIA T4 Tensor Core | 900 GB NVMe SSD             | 50 Gigabit          | $4.352 hourly | $0.7369 hourly          | 15-20%                         |
| g4dn.metal    | GPU instance   | 384 GiB         | 96 vCPUs | 8    | NVIDIA T4 Tensor Core | 1800 GB (2×900 GB NVMe SSD) | 100 Gigabit         | $7.824 hourly | $2.5934 hourly          | 5-10%                          |
| g5g.xlarge   | GPU instance   | 8 GiB           | 4 vCPUs   | 1    | NVIDIA T4G Tensor Core | EBS only                     | Up to 10 Gigabit    |                |                         |                                |
| g5.xlarge    | GPU instance   | 16 GiB          | 4 vCPUs   | 1    | NVIDIA A10G            | 250 GB NVMe SSD              | Up to 10 Gigabit    | $1.006 hourly  | $0.5464 hourly          | >20%                           |
| g5g.2xlarge  | GPU instance   | 16 GiB          | 8 vCPUs   | 1    | NVIDIA T4G Tensor Core | EBS only                     | Up to 10 Gigabit    |                |                         |                                |
| g5.2xlarge   | GPU instance   | 32 GiB          | 8 vCPUs   | 1    | NVIDIA A10G            | 450 GB NVMe SSD              | Up to 10 Gigabit    | $1.212 hourly  | $0.311 hourly           | 10-15%                         |
| g5g.4xlarge  | GPU instance   | 32 GiB          | 16 vCPUs  | 1    | NVIDIA T4G Tensor Core | EBS only                     | Up to 10 Gigabit    |                |                         |                                |
| g5.4xlarge   | GPU instance   | 64 GiB          | 16 vCPUs  | 1    | NVIDIA A10G            | 600 GB NVMe SSD              | Up to 25 Gigabit    | $1.624 hourly  | $0.5322 hourly          | 15-20%                         |
| g5g.8xlarge  | GPU instance   | 64 GiB          | 32 vCPUs  | 1    | NVIDIA T4G Tensor Core | EBS only                     | 12 Gigabit          |                |                         |                                |
| g5.8xlarge   | GPU instance   | 128 GiB         | 32 vCPUs  | 1    | NVIDIA A10G            | 900 GB NVMe SSD              | 25 Gigabit          | $2.448 hourly  | $0.6982 hourly          | >20%                           |
| g5g.16xlarge | GPU instance   | 128 GiB         | 64 vCPUs  | 2    | NVIDIA T4G Tensor Core | EBS only                     | 25 Gigabit          |                |                         |                                |
| g5g.metal    | GPU instance   | 128 GiB         | 64 vCPUs  | 2    | NVIDIA T4G Tensor Core | EBS only                     | 25 Gigabit          |                |                         |                                |
| g5.12xlarge  | GPU instance   | 192 GiB         | 48 vCPUs  | 4    | NVIDIA A10G            | 3800 GB NVMe SSD             | 40 Gigabit          | $5.672 hourly  | $3.0856 hourly          | >20%                           |
| g5.16xlarge  | GPU instance   | 256 GiB         | 64 vCPUs  | 1    | NVIDIA A10G            | 1900 GB NVMe SSD             | 25 Gigabit          | $4.096 hourly  | $0.6722 hourly          | 15-20%                         |
| g5.24xlarge  | GPU instance   | 384 GiB         | 96 vCPUs  | 4    | NVIDIA A10G            | 3800 GB NVMe SSD             | 50 Gigabit          | $8.144 hourly  | $2.8676 hourly          | >20%                           |
| g5.48xlarge  | GPU instance   | 768 GiB         | 192 vCPUs | 8    | NVIDIA A10G            | 7600 GB (2×3800 GB NVMe SSD) | 100 Gigabit         | $16.288 hourly | $7.5993 hourly          | 15-20%                         |
| p4d.24xlarge  | GPU instance   | 1152 GiB        | 96 vCPUs | 8    | NVIDIA A100 | 8000 GB (8×1000 GB NVMe SSD) | 4x 100 Gigabit      | $21.9576 hourly | $15.1233 hourly         | >20%                           |


### Manage jobs in the queue

```bash
# Check what jobs are running or idle in the queue
qstat

# View all job properties
qstat -f <job ID>

# Remove a job from the queue
qdel <job ID>

# Example
qdel 227.ip-10-0-0-56
```

---

## Setup conda

To set up the conda package and environment manager in your SOCA account, run the setup tool:

```bash
/apps/bin/setup_conda
```

When it finishes, log out and back in again and conda will be activated by default.

For more on working with conda environments, see the [conda documentation](conda.md).

---

## Using Jupyter

### Prerequisites

- Install Miniforge using the setup tool above (see [Setup conda](#setup-conda))
- In any environment you want to use with Jupyter, install JupyterLab:

```bash
conda install -c conda-forge jupyterlab ipympl nodejs
```

### Launching Jupyter

1. Go to the SOCA remote Linux desktop interface: [https://soca.datasci.danforthcenter.org/remote_desktop](https://soca.datasci.danforthcenter.org/remote_desktop)
2. Configure a new desktop session (Session Name, Storage Size, Session Type, etc.) and click **Launch my Session**
3. While the system boots you will be asked to wait — the page will refresh automatically
4. Once ready, open the session in your browser or using the DCV native client
5. From the desktop, open **Applications > Programming > JupyterLab**
6. Select **New Session** and connect to your kernel

When finished, close the session and then click **Delete Session** to shut down and remove the machine.

!!! note
    If you step away and the desktop session locks, you will need a password to unlock it. To set your user password, go to
    the SOCA web page, click **My Account** in the left sidebar, and fill out the Change my password form.

---

## Installed software

| Package      | SOCA               | stargate    |
| ------------ | ------------------ | ----------- |
| aws          | 2.36.1             | 2.36.1      |
| bcftools     | 1.19               | NA          |
| bedtools     | 2.31.1             | NA          |
| Bioperl      | 1.7.8              | NA          |
| bismark      | 0.22.3             | NA          |
| bowtie       | NA                 | 1.3.1.      |
| bowtie2      | 2.5.3              | NA          |
| bwa          | 0.7.17-r1198-dirty | NA          |
| cap3         | 02/10/15           | NA          |
| CRISPResso2  | 07/01/2025         | NA          |
| cutadapt     | 5.0                | NA          |
| deeptools    | 3.5.5              | NA          |
| emapper.py   | 2.1.13             | 2.1.13      |
| epic2        | 0.0.52             | NA          |
| fastqc       | 0.12.1             | NA          |
| flye         | 2.9.6-b1802        | 2.9.6-b1802 |
| gatk         | 4.6.2.0            | NA          |
| gffread      | 0.12.7             | NA          |
| go2sum       |                    | NA          |
| hifiasm_meta | 0.13-r308          | 0.13-r308   |
| hisat2       | 2.2.1              | NA          |
| hmmer        | 3.4                | NA          |
| htslib       | 1.19.1             | 1.21        |
| idr          | 2.0.4.2            | NA          |
| interproscan | 5.69-101.0         | NA          |
| jellyfish    | 2.3.1              | NA          |
| job-template | 1                  | NA          |
| kallisto     | 0.46.1             | NA          |
| macs3        | 3.0.3              | NA          |
| mafft        | v7.525             | NA          |
| metaMDBG     | 1.4                | 1.4         |
| minimap2     | 2.26-r1175         | NA          |
| mount-s3     | 1.7.1              | NA          |
| multiqc      | 1.28               | NA          |
| mummer       | 4.0.0rc1           | NA          |
| muscle       | 5.1.0              | NA          |
| ncbi-blast   | 2.15.0+            | NA          |
| nextflow     | 26.04.6            | 26.04.6     |
| picard       | 3.1.1              | NA          |
| plink        | 1.07               | NA          |
| plink2       | 2.00a6LM           | NA          |
| quast        | 5.3.0              | 5.3.0       |
| salmon       | 1.10.0             | NA          |
| samtools     | 1.19.2             | 1.21        |
| setup_conda  | 1                  | 1           |
| singularity  | 4.1.1              | NA          |
| snpEff       | 5.2a               | NA          |
| SnpSift      | 5.2                | NA          |
| spades       | 4.1.0              | NA          |
| sra-tools    | 3.0.10             | NA          |
| STAR         | 2.7.11b            | NA          |
| stringtie    | 2.2.1              | NA          |
| tabix        | 1.19.1             | 1.21        |
| tmux         | 3.4                | NA          |
| trimmomatic  | 0.39               | NA          |
| trim_galore  | 0.6.10             | NA          |
| Trinity      | 2.15.1             | NA          |
| vcftools     | 0.1.16             | NA          |
| whatshap     | 2.2                | NA          |

---

## Shared genome databases

To minimize storing datasets permanently on the cluster, the Data Science core maintains common genome resources and shared databases at `/data/genomes`.

General structure (for Phytozome genomes):

```bash
/data/genomes/phytozome/<species>/<version>
```

Each genome directory has a variable number of subdirectories depending on what is available, but generally includes:

- `annotation` — annotation files (e.g. GFF)
- `assembly` — genome assembly FASTA file(s)
- `expression` — expression dataset tables
- `indices` — index/database files (e.g. BWA)
- `orthology` — conserved gene sets with other species
