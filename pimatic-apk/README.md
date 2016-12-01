<H1>pimatic-apk</H1>
This is a try-out to make a "native" app for android based on [cordova](https://cordova.apache.org/) and [framework7](https://framework7.io).

This is a copy of the original project for IOS by sweebee (Wiebe Nieuwenhuis). 
The original project is called pimatic-app and can be found in Sweebee's [github repo](https://github.com/sweebee/pimatic-app).
The layout of an IOS framework7 app is slightly different to that of an android app. The same is valid 
for the initialization of the app. So that is what I changed.<br>

To make a new android cordova app you first need to install cordova, install android studio and install the relevant android SDK.
To compile/build this project into a functional apk do the following:<br>

Create a new cordova project and create the android platform<br>
```
cordova create pimatic-apk
cd pimatic-apk
cordova platform add android
```
Inside this `pimatic-apk` folder you will also find a `www` folder which is a default "skeleton" folder which we will now remove.
So from inside this same pimatic-apk folder do:<br>
`rm -rf www` (linux platform; on windows do `rmdir www /s /q`)<br>

Either "git clone" this repository or download the zip.
Inside the repository or the zip file you will find the folder `pimatic-apk/www`.
Copy this `www` folder and all its contents into the `pimatic-apk` folder/project you created above.
When you have done that you can issue the command `cordova build` and your apk will be compiled/build.



