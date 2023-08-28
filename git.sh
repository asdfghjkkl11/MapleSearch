#!/bin/bash --login
#
# 젠킨스 스크립트
# starlits@hebees.com
# Sun Jan 15 04:07:14 KST 2023
#

#if [ -f ~/.bashrc ] ; then
#    . ~/.bashrc
#fi
export PATH="/usr/local/node/bin:${PATH}"

#GIT_URL="https://gitlab.com/hebees_dev/retina_admin.git"
#GIT_URL="https://gitlab.com/hebees_dev/retina_admin_svelte.git"

# git config --global credential.helper cache
# git config --global --list

git_prune() {
    echo "***** git fetch --prune"
    git fetch --prune
}

git_fetch() {
    echo "***** git fetch origin"
    git fetch origin 
}

git_diff() {
    echo "***** git diff --name-status origin/develop "
    git diff origin/develop --name-status
}


git_pull() {
    echo "***** git pull"
    git pull # $GIT_URL
}

git_auto() {
    echo "#############################"
    LANG=C date
    echo "#############################"
    GIT_DIR=`dirname $0`
    echo "GIT_DIR=${GIT_DIR}"
    cd $GIT_DIR
    branch_name=`git branch | grep \* | awk '{print $2}'`
    echo "git branch --> $branch_name"
    git fetch origin
    FETCH_ROWS=`git diff origin/${branch_name} --name-status | wc -l`
    echo "FETCH_ROWS=${FETCH_ROWS}"
    if [ $FETCH_ROWS -gt 0 ] ; then
    	echo "***** git pull"
    	git pull # $GIT_URL
	if [ -e package.json ] ; then
		echo "npm run build"
		npm run build
	fi
    else 
    	echo "***** no pull"
    fi
}

case "$1" in
  pull)
	git_pull
	;;
  fetch)
	git_fetch
	;;
  prune)
	git_prune
	;;
  diff)
	git_diff
	;;

#  status)
#	check_for_upstart 1
#	status_of_proc -p /var/run/sshd.pid /usr/sbin/sshd sshd && exit 0 || exit $?
#	;;
#
  *)
	git_auto
	;;
#	log_action_msg "Usage: $0 {pull|fetch|status}" || true
#	exit 1
esac

exit 0
