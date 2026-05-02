# Accessing AWS

Authentication with AWS resources uses the Danforth Center Single Sign-On service Okta.

## AWS web console

The web console is used to access the accounts you have access to (e.g. your lab) and any services enabled in the account
(e.g. S3). After logging in through Okta, you will see a list of AWS accounts you have access to. Expand an account to see
the available roles.

Two roles may be available depending on your account:

- **S3ReadWrite** — privileges for accessing and managing data in S3
- **S3BatchOperations** — privileges for running batch operations on S3 objects (e.g. batch restoring files from archival
states)

Most users will only have an `S3ReadWrite` role.

## Scale-Out Computing on AWS (SOCA)

SOCA is an auto-scaling Linux cluster running on AWS that provides a high-performance computing environment for research
computing. SOCA provides a web-based desktop environment and a command-line interface for running jobs on the cluster using
a PBS scheduler.

!!! note
    Although a SOCA button appears in Okta, opening the SOCA app from Okta will not work. Instead, go directly to
    [https://soca.datasci.danforthcenter.org](https://soca.datasci.danforthcenter.org) and it will automatically initiate the
    authentication process.

To get command-line access to the SOCA scheduler server, follow the SSH instructions at
[https://soca.datasci.danforthcenter.org/ssh](https://soca.datasci.danforthcenter.org/ssh).

For full SOCA documentation, see
[Scale-Out Computing on AWS (SOCA)](https://awslabs.github.io/scale-out-computing-on-aws-documentation/).

## Command-line access to AWS resources

Use the AWS CLI program v2:

```bash
/usr/local/bin/aws
```

### Configure an SSO profile

Create an SSO profile for an account and permission set (e.g. `datascience` > `S3ReadWrite`):

```bash
aws configure sso
```

The information needed to answer the configuration questions can be found at the SSO portal access via Okta.

Select the account and then click on "Command line or programmatic access" next to the profile you want.

Further reading: [https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html](https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html)

#### Example

```bash
aws configure sso

SSO session name (Recommended): okta
SSO start URL [None]: add-our-start-url-here
SSO region [None]: us-east-2
SSO registration scopes [sso:account:access]: sso:account:access

# Follow the URL and paste in the given code
# Click allow and go back to the terminal
# Select the account and permission set you want to use
# Name the account something sensible like "datascience"
# If you name your profile "default" it will be used when no profile is specified

# To reauthenticate later:
aws sso login --profile datascience
```

### Reauthenticate

After configuring a profile, you periodically need to log in again:

```bash
aws sso login --profile <profile name>
```

### Authentication session duration

THe default session duration is 12 hours. If you need a longer session, please contact the Data Science Facility staff to
request an increase.
