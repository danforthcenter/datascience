# Build/manage Python and R virtual environments with conda

Before working with `conda` environments, start by [installing conda](conda.md).

After installing `conda`, the only environment will be the default called `base`. You can install anything you like in `base`
but we recommend limiting this to only the most essential commonly used tools you use because the larger an environment gets
the more complicated the dependencies become.

## List available environments

```bash
conda env list

# Example output
# conda environments:
#
# base                  *  /home/user/miniconda3
# datasci                  /home/user/miniconda3/envs/datasci
# plantcv                  /home/user/miniconda3/envs/plantcv
```

The star indicates the current active environment, which you can also see listed next to your command-line prompt, for
example: `(base) [username@ip-10-0-0-38 ~]$`

## Activate an environment

Activating an environment alters your shell session so that your active paths are set to the environment executable directory
and libraries.

Activate the `datasci` environment in the example above:

```bash
conda activate datasci
```

You should note the change to your command-line prompt: `(datasci) [username@ip-10-0-0-38 ~]$`

## Deactivate and environment

You can turn off an environment by deactivating the currently activate environment.

```bash
conda deactivate
```

## Deleting an environment

Environments can be removed, in the example below we delete the `datasci` environment:

```bash
conda env remove -n datasci
```

## Working with conda packages

Packages installed in a `conda` environment are downloaded from the [Anaconda package repository](https://anaconda.org/).
`conda` packages are maintained by a variety of sources, including core packages in the `default` channel maintained by
Anaconda, and commonly used community channels [conda-forge](https://conda-forge.org/) and
[bioconda](https://bioconda.github.io/). However, regardless of channel, these packages are all findable through the search
interface at [Anaconda](https://anaconda.org/). For example, if you wanted to install the R package `ggplot2` and you search
for it, you will find that the package name is `r-ggplot2` and it is available from the `conda-forge` channel (it is also
available in other channels, but the versions are older).

### Install one or more packages in the active environment

When working in an environment, you can install additional packages. For example:

A new Python package:

```bash
mamba install -c conda-forge plantcv
```

A couple R packages:

```bash
mamba install -c conda-forge r-ggplot2 r-dplyr
```

A specific version of a program:

```bash
mamba install -c bioconda samtools=1.15.1
```

!!! note
    You can install packages or software in an environment even if there is no available `conda` package. For example,
    in Python `pip install seaborn` would install `seaborn` from PyPI instead of Anaconda, or in R
    `install.packages("ggplot2")` would install `ggplot2` from CRAN.

### Create a new environment with a command

For relatively simple environments, you can specify all the packages on the command-line:

```bash
mamba create -n myenv -c conda-forge -c bioconda 'r-base>=4' r-ggplot2 samtools
```

### Create a new environment from a configuration file

For larger environments and for better documentation and reproducibility, you can build a simple configuration file with
environment specifications. The environment files are encoded in YAML, for example `environment.yml`:

```yaml
name: myenv
channels:
    - conda-forge
    - bioconda
dependencies:
    - python=3.10
    - matplotlib
    - numpy
    - pandas
    - scipy
    - scikit-image
    - scikit-learn
    - opencv>=4
```

Then to create the environment:

```bash
mamba env create -f environment.yml
```

