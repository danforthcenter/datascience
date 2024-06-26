# Data Science Facility Usage Policies

## Purpose

Establishes the responsibilities of Donald Danforth Plant Science Center (DDPSC) personnel or other authorized users 
for the protection and proper use of DDPSC Data Science Facility (Data Science) resources.

## Scope

This policy applies to all users of Data Science resources and their supervisors. Any exceptions to this policy must 
be approved by your department head and Data Science.

## Overview

The Data Science infrastructure is a shared resource and as such, the rules for acceptable use help to protect the 
integrity of the services and data for all users. Acceptable use means respecting other users’ rights, computing 
resources, and all license and contractual agreements.

## Requirements

1. General policies
    1. Users must comply with all DDPSC policies and relevant software licensing while using computing resources.
    2. Data Science resources are for research purposes only. Commercial use must be set up as a separate activity 
    and discussed with DDPSC and Data Science staff.
    3. Users may only access computers, user accounts, and files they are authorized to access.
    4. Research data on the Data Science infrastructure must be treated with care with regard to access, retention, 
    sharing, publishing, and attribution. Principal Investigators or other responsible data custodians should be 
    consulted for any questions related to such issues.
    5. Users are responsible for reporting unauthorized access to Data Science resources.
2. Computing policies
    1. Users should not run programs on the login and SOCA scheduling server. All jobs should be 
    submitted to the SOCA cluster instead. Some small (e.g. text editing) or essential (e.g. ssh, screen, tmux, 
    etc.) programs are generally acceptable. A monitoring service runs on these servers that will email users about 
    processes that violate this policy. If you are unsure or feel you were emailed in error, please contact the 
    Data Science staff.
    2. Users should not run large numbers of jobs simultaneously without testing first. A good rule of thumb is to 
    first test running 1, then 10, then 100 jobs to make sure there are no unintended problems before launching a 
    larger number of jobs.
    3. Users should monitor jobs running in the SOCA cluster periodically to make sure they are running as expected 
    and utilizing resources as requested.
3. Storage policies
    1. Individual users and supervisors are responsible for data management. Minimally, data management practices must 
    comply with the DDPSC policy on the 
    [Retention of and Access to Research Data](https://danforth.workvivo.com/documents/15622).
    2. Research data and software stored in user and group directories is (or should be treated as) work product that 
    is owned by the department and the DDPSC (or relevant entity). Personal data should not be stored on this system. 
    Users must comply with the 
    [DDPSC non-disclosure agreement](https://danforth.workvivo.com/documents/15617).
    3. The Data Science storage system is a shared filesystem, so copyrighted materials that do not allow sharing 
    should not be stored on this system.
4. Prohibited activities
    1. Violations of the copyright, trade secret, patent or other intellectual rights protections of any person or 
    company. This includes (but is not limited to):
        1. Installation or distribution of “pirated” software that is not appropriately licensed for use by DDPSC or 
        the user.
        2. Unauthorized use of copyrighted material such as music, movies, unlicensed software and digitization and 
        distribution of print media.
        3. Exporting software, technical information, encryption software/technology in violation of international or 
        regional laws.
        4. Introduction of malicious programs into a DDPSC computer, network or server (e.g., virus, worm, trojan, 
        ransomware, etc.).
    2. Revealing account information or passwords or allowing use of your account by others. If another user needs an 
    account they should contact Data Science staff with permission from their supervisor.
    3. Using DDPSC resources to obtain, transmit, view or store material that is in violation of sexual harassment or 
    hostile workplace policies or laws.
    4. Causing or aiding in security breaches or disruptions of network communication.
    5. Intentional destruction of intellectual property or work product. See 3.2 above.
    6. Using Data Science resources for personal projects or commercial work without prior approval.

## Compliance

A user found to have violated any of the prohibited activities will be immediately reported to their supervisor and 
People & Culture for disciplinary action, up to and including termination of employment or relationship with DDPSC. If 
warranted by activities that cause significant or repeated disruption, a user’s account may be suspended until a 
meeting with Data Science staff can be arranged. For all other policy violations, Data Science staff will work with 
users for compliance and, if necessary, may involve the user’s supervisor.

## Change History

* 2018-01-03: Initial text finalized.
* 2018-11-06: Updated login/HTCondor server name.
* 2019-09-12: Updated facility name.
* 2024-06-12: Updated language to reflect migration to AWS-based infrastructure systems.
