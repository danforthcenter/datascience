# Getting Started

!!! note
    All users of the Danforth Center Data Science infrastructure must first acknowledge that they have read and
    understand the [Usage Policies](policies.md).

## Setting up your workstation

### Jupyter Notebook access

On any platform, point your web browser to 
[https://jupyter.datasci.danforthcenter.org](https://jupyter.datasci.danforthcenter.org) and enter your Data Science
username and password.

### Command-line access

#### Applications

You will need a terminal application that supports `ssh` to log into the Data Science infrastructure. Below are some
recommended applications by platform.

* macOS: Terminal (built-in), [iTerm2](https://www.iterm2.com).
* Linux/Unix: Terminal (built-in).
* Windows: [Windows Subsystem for Linux](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide) 
(Windows 10 only), [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty), [Cygwin](https://www.cygwin.com).

#### Logging in

To log into the system via ssh, open one of the above applications and enter the command:

`ssh username@stargate.datasci.danforthcenter.org`

where username is your Data Science username. The first time you log in you will need to type "yes" to accept the
server's key.

### File access

#### Applications

* macOS: [Cyberduck/Mountain Duck](https://cyberduck.io), [Transmit](https://panic.com/transmit), 
[FileZilla](https://filezilla-project.org).
* Linux/Unix: System file browser (built-in), [FileZilla](https://filezilla-project.org).
* Windows: [Cyberduck/Mountain Duck](https://cyberduck.io), [WinSCP](https://winscp.net/eng/download.php), 
[FileZilla](https://filezilla-project.org).

The above applications will let you quickly browse the Data Science filesystem. Many will even let you edit files
directly on the server from your local computer.

For large file transfers it is often better to download directly from the source onto the system without using your
local computer as a mid-point stop. This can be done on the server `chronos` or in the HTCondor cluster using
[wget](https://www.gnu.org/software/wget/manual/wget.html) or [curl](https://curl.haxx.se/docs/manpage.html).

You can also [Globus Connect](https://www.globus.org) to transfer files between your computer or other remote
endpoints and the Data Science endpoint. See the [Globus guide](globus.md) for more information.

### Running jobs

See the [HTCondor guide](htcondor.md) for more information.
