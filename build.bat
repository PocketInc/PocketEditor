echo off
echo ========
echo Pocket Editor Builder
echo Are you sure you want to build Pocket Editor?
pause
electron-packager ./ --asar --app-copyright Pocket,Inc. --icon ./icon.ico
echo Done.
pause