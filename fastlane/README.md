fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
### test
```
fastlane test
```
test lane

----

## iOS
### ios build
```
fastlane ios build
```
Build debug iOS application.
### ios release
```
fastlane ios release
```
Build release iOS application.

----

## Android
### android build
```
fastlane android build
```
Build the Android application.
### android release
```
fastlane android release
```
Ship to Playstore Alpha track.

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).