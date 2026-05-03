# AWS S3

## Data transfer via the AWS CLI tools

!!! note
    You will need to have configured the AWS CLI toolkit before using these commands. See
    [Command-line interface authentication](aws.md#command-line-interface-authentication).

!!! note
    If you have more than one profile configured, add the flag `--profile <profile name>` to the end of each command to
    specify which profile to use.

### List buckets

Get a list of S3 buckets for a given account:

```bash
aws s3 ls
```

### Copy a single file

```bash
# From local to S3
aws s3 cp <local file> s3://<bucket name>/<key>
# From S3 to local
aws s3 cp s3://<bucket name>/<key> <local file>
```

The full "key" or path-like address of a file on S3 can be defined at the time of transfer — the "folders" do not need to
exist ahead of time (because they are not real folders). If you want to use a key you have already created and don't want to
risk typing it wrong, go to the AWS console and click the "Copy S3 URI" button.

Add the flag `--dryrun` to test the transfer without actually copying anything.

### Copy a collection of files

```bash
# From local to S3
aws s3 sync <local path> s3://<bucket name>/<key prefix>
# From S3 to local
aws s3 sync s3://<bucket name>/<key prefix> <local path>
```

Like `cp`, the path prefix for all transferred files can be defined at the time of transfer. Useful flags:

- `--dryrun` — test the transfer without copying anything
- `--no-follow-symlinks` — prevent copying linked data (recommended to avoid duplicating data)
- `--exclude ".*" --exclude "*/.*"` — exclude hidden files and directories

### Check the number of files before transferring

!!! note
    Data transfer speed is a function of file size and the number of files. Transferring a large number of small files is
    very slow because S3 must create an object for each file. If you have a large number of files, consider: 1) whether the
    data need to be kept; and 2) whether they can be packaged into a tar or zip archive.

    As an example: a 20 GB directory with ~10 million small image tile files took over 24 hours to transfer. After removing
    the tile directories, only 3,000 files remained and the transfer finished in under a minute.

Check the number of files in a directory (including subdirectories):

```bash
du --inodes -s <path to directory>
```

---

## Accessing data in S3 via the SOCA cluster

### Mount S3 with mountpoint-s3

[mountpoint-s3](https://github.com/awslabs/mountpoint-s3) is a tool that mounts an S3 bucket on the server running your job
so you can access files as if they were on a local filesystem. This avoids copying data to the cluster's EFS storage, which
is expensive. It is particularly useful for read-heavy workloads.

A description of supported filesystem operations is in the
[mountpoint-s3 documentation](https://github.com/awslabs/mountpoint-s3/blob/main/doc/CONFIGURATION.md).

!!! note
    There is currently a limitation where authentication with `mountpoint-s3` does not support the SSO system. You will need
    to apply temporary credentials to `~/.aws/credentials` rather than using the `aws sso login` method.

#### Authenticate with temporary credentials

1. Navigate to the AWS SSO portal.
2. Select the account you want.
3. Click "Command line or programmatic access."
4. Copy the credentials block under **Option 2** (manually add a profile to your credentials file).
5. Open `~/.aws/credentials` in a text editor and paste the credentials. Rename the profile header (the text in brackets) to
`[default]` if you have a single profile or to a custom name (e.g. `[datascience]`) if you have multiple profiles.

#### Mount a bucket

In your job file or in an interactive session, mount the bucket in the `/scratch` area:

```bash
# Optionally create a subdirectory so /scratch remains usable
mkdir /scratch/s3

# Mount the bucket
# Replace "datascience" with your credentials file profile name
# Replace "ddpsc-datascience" with your bucket name
mount-s3 ddpsc-datascience /scratch/s3

# Optionally limit the mount to a prefix within the bucket
mount-s3 --prefix shares/datascience/users/nfahlgren/ ddpsc-datascience /scratch/s3
```

#### Unmount a bucket

```bash
fusermount -u /scratch/s3
```

---

## Restoring archived data in S3

For restoring a large number of files, use S3 Batch Operations. Contact the Data Science team for assistance.

### Create an inventory of files to be restored

```bash
# Authenticate
aws sso login

# Create a CSV inventory for all files within a directory and subdirectories
aws s3 ls --recursive \
  s3://<bucket>/<key prefix> \
  | awk '{print "<bucket>,"$4}' > dir-inventory.csv
```

Quality-check the inventory file — does it have the number of files you expect?

### Upload the inventory to S3

```bash
aws s3 cp dir-inventory.csv s3://<bucket>/dir-inventory.csv
```

### Use S3 Batch Operations to restore the files

1. Go to the SSO login page from Okta
2. Select the `S3BatchOperations` role for the account you want to restore files in
3. Navigate to **S3 > Batch Operations > Create Job**
    1. **Manifest**: select CSV and navigate to your CSV file, then click Next
    2. **Operation**: Restore > Intelligent-Tiering Archive Access tier or Deep Archive Access tier > Standard retrieval, then click Next
    3. **Completion report**: select a location to store a report
    4. **Permissions**: Choose from existing IAM roles > `S3forBatchOperations`, then click Next
    5. Click **Create job**
4. Restoration takes 3–24 hours

---

## Desktop clients for S3

### Cyberduck (macOS/Linux/Windows)

- Installation instructions for [macOS](https://cyberduck.io/download/) and [Windows](https://cyberduck.io/download/)
- [Step-by-step guide](https://docs.cyberduck.io/protocols/s3/) for connecting to S3

### Transmit (macOS)

First, follow the [Command-line interface authentication](aws.md#command-line-interface-authentication) instructions on your
local computer to create an SSO profile (e.g. `default`).

1. In Transmit, click the **+** button and select **Amazon S3** to create a new server
2. Set **Protocol** to Amazon S3, **Address** to `s3.amazonaws.com`, and **Profile** to your profile name (e.g. `default`)

Before connecting (credentials expire every 12 hours):

1. Log into the AWS web console via Okta
2. Select the group and role (`S3ReadWrite`), then click "Command line or programmatic access"
3. Copy the text under **Option 2**
4. Open `~/.aws/credentials`, paste the text, and rename the profile header in brackets to match your Transmit profile name
5. Go back to Transmit and connect
