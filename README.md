[![Build Status](https://travis-ci.org/martinsuba/copy-link-extension.svg?branch=master)](https://travis-ci.org/martinsuba/copy-link-extension)

# Copy Link by Shortcut Chrome extension

Chrome extension for quick copying of currently opened website url, hovered anchor href or image source link by keyboard shortcuts. There's no more need to right-click when copying image source and link address or selecting url in address bar before copying.

Once installed, simply hover over a link or an image and press keyboard shortcut copy link to the clipboard. Also could be used for copying the current website url with keyboard shortcut.

## Features

Copy to clipboard by shortcut:

:heavy_check_mark: Current website url - Alt + A<br>
:heavy_check_mark: Hovered image source - Alt + S<br>
:heavy_check_mark: Hovered anchor href - Alt + D

The history of copied links can be displayed by clicking on the extension icon in Chrome bar.

## Known Issues

* copy image is not working if then image is overlaid by another element
* copy image is not working if the image on the website is a background image of another element

## Build

```
git clone https://github.com/martinsuba/copy-link-extension
npm i
npm run build
```
