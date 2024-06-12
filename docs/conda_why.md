# Why use conda (or similar tools)?

What is [conda](https://docs.conda.io/en/latest/)?

>Package, dependency and environment management for any language—Python, R, Ruby,
>Lua, Scala, Java, JavaScript, C/ C++, Fortran, and more.

## You can use the versions of the tools you want/need
On the computing cluster, a limited set of versions of programming language interpreters (`python`, `R`, etc.) can be
easily installed and maintained by the core facility.

Likewise, managing large collections of packages that work with these interpreter versions is difficult and stops working
once the interpreter gets too outdated. Updating the interpreter is not trivial and also requires reinstalling all the
packages.

With `conda` environments, you set up smaller environments to suit the needs of your projects and bypass the global, outdated
environments we have on the cluster.

## You can create multiple frozen, project-specific environments
Scenario 1: you are writing a paper and working on the methods section. You want to record what versions of programs you used
in your analyses, but how do you know if the versions available to you now match what were installed when you did your work?

Scenario 2: you wrote a program or script awhile back and now it will not run with the current version of Python, R, etc. or
the current versions of packages.

Instead, you could use `conda` to create a project-specific environment that contains a fixed set of programs and packages
that remain unchanged as you do your work. The versions of the programs you used can be easily queried and reported for
reproducibility.

## Citations
> Sandve GK, Nekrutenko A, Taylor J, Hovig E. 2013. Ten simple rules for reproducible computational research.
> PLoS Computational Biology 9:e1003285. DOI: [10.1371/journal.pcbi.1003285](https://doi.org/10.1371/journal.pcbi.1003285).
