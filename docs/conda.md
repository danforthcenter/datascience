# Setup conda for Python and R virtual environments

## Download and install Miniconda on the computing cluster

### Step 1
Log into stargate with a terminal.
* * *

### Step 2
Download Miniconda:

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```
* * *

### Step 3
Make the installer executable:

```bash
chmod 755 Miniconda3-latest-Linux-x86_64.sh
```
* * *

### Step 4
Run the installer:

```bash
./Miniconda3-latest-Linux-x86_64.sh -b -f -u
```
* * *

### Step 5
!!! note
    Step 5 is optional. It is useful if you plan on running non-interactive
    jobs in the cluster that rely on a conda environment. The goal is to move
    the `conda` hook code from the shell login profile `.bashrc` to the more
    general Bash profile `.bash_profile`. Non-interactive jobs in the cluster
    only load the profile `.bash_profile`, while interactive jobs load both
    profiles.

Edit the file `.bashrc` using `nano`, `emacs`, or `vim` (e.g. `nano .bashrc`).
Highlight and copy the following code (note: your username will be in place of
`user` below) and then delete it.

```bash
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/home/user/miniconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/home/user/miniconda3/etc/profile.d/conda.sh" ]; then
        . "/home/user/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/user/miniconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<
```
* * *

### Step 6
Edit the file `.bash_profile` using `nano`, `emacs`, or `vim` (e.g.
`nano .bash_profile`). Paste the copied code block above at the bottom of this
file (if doing Step 5). Add the following line to the file:

```bash
export PYTHONPATH=""
```
* * *

### Step 7
Log out and back in for the changes to take effect.
* * *

## Download and install Miniconda on your local computer

### Step 1
Navigate to the
[Miniconda download page](https://docs.conda.io/en/latest/miniconda.html) with
your web browser.
* * *

### Step 2
Under the section **Latest Miniconda Installer Links**, click on the
appropriate link for your computer. Typically you want
**Miniconda3 Windows 64-bit**, **Miniconda3 MacOSX 64-bit pkg**,
or **Miniconda3 Linux 64-bit**.
* * *

### Step 3
Run the installer and allow Miniconda to be activated by default (if prompted).
* * *
