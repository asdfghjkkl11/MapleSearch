#!/bin/sh
#
# starlits@hebees.com
# 2022-11-25
#

#
# CSS spelling bug
#
find ./node_modules/@toast-ui/editor/dist/ -name '*.css' -exec perl -pi -e 's/overflow-X/overflow-x/g' {} \;

#
# charset issue 1
#
find ./node_modules/@toast-ui/editor/dist/ -name 'toastui-editor.css' -exec perl -pi -e 's/\@charset "utf-8";//g' {} \;

#
# charset issue 2
#
# filename : node_modules/tui-pagination/dist/tui-pagination.css
# find ./node_modules/tui-pagination/dist/ -name 'tui-pagination.css' -exec perl -pi -e 's/\@charset 'utf-8';//g' {} \;
#
sed '/\@charset/d' node_modules/tui-pagination/dist/tui-pagination.css > ./tui-pagination.css
mv ./tui-pagination.css node_modules/tui-pagination/dist/tui-pagination.css 

#
# tabIndex
# 
# node_modules/svelte-file-dropzone/src/components/Dropzone.svelte
find ./node_modules/svelte-file-dropzone/src/components/ -name 'Dropzone.svelte' -exec perl -pi -e 's/tabindex/tabIndex/g' {} \;
