GIT-SWITCH(1)                                                            Git Manual                                                            GIT-SWITCH(1)

NNAAMMEE
       git-switch - Switch branches

SSYYNNOOPPSSIISS
       _g_i_t _s_w_i_t_c_h [<options>] [--no-guess] <branch>
       _g_i_t _s_w_i_t_c_h [<options>] --detach [<start-point>]
       _g_i_t _s_w_i_t_c_h [<options>] (-c|-C) <new-branch> [<start-point>]
       _g_i_t _s_w_i_t_c_h [<options>] --orphan <new-branch>

DDEESSCCRRIIPPTTIIOONN
       Switch to a specified branch. The working tree and the index are updated to match the branch. All new commits will be added to the tip of this
       branch.

       Optionally a new branch could be created with either --cc, --CC, automatically from a remote branch of same name (see ----gguueessss), or detach the working
       tree from any branch with ----ddeettaacchh, along with switching.

       Switching branches does not require a clean index and working tree (i.e. no differences compared to HHEEAADD). The operation is aborted however if the
       operation leads to loss of local changes, unless told otherwise with ----ddiissccaarrdd--cchhaannggeess or ----mmeerrggee.

       THIS COMMAND IS EXPERIMENTAL. THE BEHAVIOR MAY CHANGE.

OOPPTTIIOONNSS
       <branch>
           Branch to switch to.

       <new-branch>
           Name for the new branch.

       <start-point>
           The starting point for the new branch. Specifying a <<ssttaarrtt--ppooiinntt>> allows you to create a branch based on some other point in history than where
           HEAD currently points. (Or, in the case of ----ddeettaacchh, allows you to inspect and detach from some other point.)

           You can use the @@{{--NN}} syntax to refer to the N-th last branch/commit switched to using "git switch" or "git checkout" operation. You may also
           specify -- which is synonymous to @@{{--11}}. This is often used to switch quickly between two branches, or to undo a branch switch by mistake.

           As a special case, you may use AA......BB as a shortcut for the merge base of AA and BB if there is exactly one merge base. You can leave out at most
           one of AA and BB, in which case it defaults to HHEEAADD.

       -c <new-branch>, --create <new-branch>
           Create a new branch named <<nneeww--bbrraanncchh>> starting at <<ssttaarrtt--ppooiinntt>> before switching to the branch. This is a convenient shortcut for:

               $ git branch <new-branch>
               $ git switch <new-branch>

       -C <new-branch>, --force-create <new-branch>
           Similar to ----ccrreeaattee except that if <<nneeww--bbrraanncchh>> already exists, it will be reset to <<ssttaarrtt--ppooiinntt>>. This is a convenient shortcut for:

               $ git branch -f <new-branch>
               $ git switch <new-branch>

       -d, --detach
           Switch to a commit for inspection and discardable experiments. See the "DETACHED HEAD" section in ggiitt--cchheecckkoouutt(1) for details.

       --guess, --no-guess
           If <<bbrraanncchh>> is not found but there does exist a tracking branch in exactly one remote (call it <<rreemmoottee>>) with a matching name, treat as
           equivalent to

               $ git switch -c <branch> --track <remote>/<branch>

           If the branch exists in multiple remotes and one of them is named by the cchheecckkoouutt..ddeeffaauullttRReemmoottee configuration variable, we’ll use that one for
           the purposes of disambiguation, even if the <<bbrraanncchh>> isn’t unique across all remotes. Set it to e.g.  cchheecckkoouutt..ddeeffaauullttRReemmoottee==oorriiggiinn to always
           checkout remote branches from there if <<bbrraanncchh>> is ambiguous but exists on the _o_r_i_g_i_n remote. See also cchheecckkoouutt..ddeeffaauullttRReemmoottee in ggiitt--ccoonnffiigg(1).

           ----gguueessss is the default behavior. Use ----nnoo--gguueessss to disable it.

           The default behavior can be set via the cchheecckkoouutt..gguueessss configuration variable.

       -f, --force
           An alias for ----ddiissccaarrdd--cchhaannggeess.

       --discard-changes
           Proceed even if the index or the working tree differs from HHEEAADD. Both the index and working tree are restored to match the switching target. If
           ----rreeccuurrssee--ssuubbmmoodduulleess is specified, submodule content is also restored to match the switching target. This is used to throw away local changes.

       -m, --merge
           If you have local modifications to one or more files that are different between the current branch and the branch to which you are switching, the
           command refuses to switch branches in order to preserve your modifications in context. However, with this option, a three-way merge between the
           current branch, your working tree contents, and the new branch is done, and you will be on the new branch.

           When a merge conflict happens, the index entries for conflicting paths are left unmerged, and you need to resolve the conflicts and mark the
           resolved paths with ggiitt aadddd (or ggiitt rrmm if the merge should result in deletion of the path).

       --conflict=<style>
           The same as ----mmeerrggee option above, but changes the way the conflicting hunks are presented, overriding the mmeerrggee..ccoonnfflliiccttSSttyyllee configuration
           variable. Possible values are "merge" (default) and "diff3" (in addition to what is shown by "merge" style, shows the original contents).

       -q, --quiet
           Quiet, suppress feedback messages.

       --progress, --no-progress
           Progress status is reported on the standard error stream by default when it is attached to a terminal, unless ----qquuiieett is specified. This flag
           enables progress reporting even if not attached to a terminal, regardless of ----qquuiieett.

       -t, --track
           When creating a new branch, set up "upstream" configuration.  --cc is implied. See ----ttrraacckk in ggiitt--bbrraanncchh(1) for details.

           If no --cc option is given, the name of the new branch will be derived from the remote-tracking branch, by looking at the local part of the refspec
           configured for the corresponding remote, and then stripping the initial part up to the "*". This would tell us to use hhaacckk as the local branch
           when branching off of oorriiggiinn//hhaacckk (or rreemmootteess//oorriiggiinn//hhaacckk, or even rreeffss//rreemmootteess//oorriiggiinn//hhaacckk). If the given name has no slash, or the above
           guessing results in an empty name, the guessing is aborted. You can explicitly give a name with --cc in such a case.

       --no-track
           Do not set up "upstream" configuration, even if the bbrraanncchh..aauuttooSSeettuuppMMeerrggee configuration variable is true.

       --orphan <new-branch>
           Create a new _o_r_p_h_a_n branch, named <<nneeww--bbrraanncchh>>. All tracked files are removed.

       --ignore-other-worktrees
           ggiitt sswwiittcchh refuses when the wanted ref is already checked out by another worktree. This option makes it check the ref out anyway. In other words,
           the ref can be held by more than one worktree.

       --recurse-submodules, --no-recurse-submodules
           Using ----rreeccuurrssee--ssuubbmmoodduulleess will update the content of all active submodules according to the commit recorded in the superproject. If nothing (or
           ----nnoo--rreeccuurrssee--ssuubbmmoodduulleess) is used, submodules working trees will not be updated. Just like ggiitt--ssuubbmmoodduullee(1), this will detach HHEEAADD of the
           submodules.

EEXXAAMMPPLLEESS
       The following command switches to the "master" branch:

           $ git switch master

       After working in the wrong branch, switching to the correct branch would be done using:

           $ git switch mytopic

       However, your "wrong" branch and correct "mytopic" branch may differ in files that you have modified locally, in which case the above switch would
       fail like this:

           $ git switch mytopic
           error: You have local changes to 'frotz'; not switching branches.

       You can give the --mm flag to the command, which would try a three-way merge:

           $ git switch -m mytopic
           Auto-merging frotz

       After this three-way merge, the local modifications are _n_o_t registered in your index file, so ggiitt ddiiffff would show you what changes you made since the
       tip of the new branch.

       To switch back to the previous branch before we switched to mytopic (i.e. "master" branch):

           $ git switch -

       You can grow a new branch from any commit. For example, switch to "HEAD~3" and create branch "fixup":

           $ git switch -c fixup HEAD~3
           Switched to a new branch 'fixup'

       If you want to start a new branch from a remote branch of the same name:

           $ git switch new-topic
           Branch 'new-topic' set up to track remote branch 'new-topic' from 'origin'
           Switched to a new branch 'new-topic'

       To check out commit HHEEAADD~~33 for temporary inspection or experiment without creating a new branch:

           $ git switch --detach HEAD~3
           HEAD is now at 9fc9555312 Merge branch 'cc/shared-index-permbits'

       If it turns out whatever you have done is worth keeping, you can always create a new name for it (without switching away):

           $ git switch -c good-surprises

SSEEEE AALLSSOO
       ggiitt--cchheecckkoouutt(1), ggiitt--bbrraanncchh(1)

GGIITT
       Part of the ggiitt(1) suite

Git 2.30.2                                                               08/17/2024                                                            GIT-SWITCH(1)
