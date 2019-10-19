---
title: "Scary git-lfs “bad object” error not so scary after all"
date: 2019-10-19T18:00:53+01:00
draft: false
---

I just got the following error while trying to push to my [git-lfs]()-enabled repository:

```sh
ref master:: Error in git rev-list --stdin --objects --not --remotes=origin --: exit status 128 fatal: bad object f895c581f0ff52b2272318105ad7bcc09b5fb8eb
```

Some quick [ducking](https://duckduckgo.com) revealed scary stories of repository corruptions. _Eek!_ Not what I wanted to hear.

Turns out, however, that the error message is not as scary as it looks.

Here’s when/why you get this scary error:

1. Your repository is head of master with a commit where the only changes are git-lfs changes and

2. Your repository is actually also behind master with non-git-lfs changes (these don’t appear in `git status` for some reason when your working copy is in this state) and

3. You do a `git push`.

The fix, of course, is to `git pull` and merge your non-git-lfs changes and then push again.

_Whew!_
