# :tada::tada: GitHub Emoji Extension :tada::tada:
![license](https://img.shields.io/github/license/kshida/github-emoji-extension)
![GitHub version](https://badge.fury.io/gh/kshida%2Fgithub-emoji-extension.svg)
![code size](https://img.shields.io/github/languages/code-size/kshida/github-emoji-extension)

## :blush: Let's have some friendly communication on GitHub!
This Google extension allows you to use a variety of emoji when you type comments on GitHub.  
Typing emoji is as easy as typing in Slack or Jira.

Click [here](https://chrome.google.com/webstore/detail/github-emoji-extension/ihelcmhhldmlefeikdnpampbpbgbcgmg) to install!

![sample01](https://user-images.githubusercontent.com/34312716/124481266-0f5d0080-dde3-11eb-9881-a5fc892cb346.png)

## :pencil2: Usage
1. Install this extension from the Chrome web store.
2. Click on the comment field in GitHub and press `ctrl` and `/` at the same time.
3. When the pop-up window appears, click on the emoji of your choice. Emoji are categorized by category, so if you want to move quickly between categories, click on the category button.
4. The emoji will be inserted at the cursor position.
5. If you want to cancel the input of the emoji, click outside the pop-up.

## :octocat: Theme
The appearance of the emoji popup switches according to the GitHub theme.

### Default light
![themeSample01](https://user-images.githubusercontent.com/34312716/124487255-72ea2c80-dde9-11eb-9c91-cbb3b62d469f.png)

### Default dark
![themeSample02](https://user-images.githubusercontent.com/34312716/124485775-dd01d200-dde7-11eb-9733-36fb725c6be5.png)

### Dark dimmed
![themeSample03](https://user-images.githubusercontent.com/34312716/124485942-09b5e980-dde8-11eb-8a6f-5e44d5dd534f.png)

## :wrench: How to build
1. Clone this repository.
2. Execute the following command.  
```bash
$ cd github-emoji-extension
& yarn install
$ yarn build
```
3. Load the artifacts generated in the dist folder as a Chrome extension.

## :sparkles: Technology used
This software uses the following open source packages:
<p align="left">
  <a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/facebook/react/cae635054e17a6f107a39d328649137b83f25972/fixtures/dom/public/react-logo.svg" height="75px;" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://user-images.githubusercontent.com/34312716/124487886-2eab5c00-ddea-11eb-9209-b3744f5d9444.png" height="75px;" /></a>
  <a href="https://mui.com/"><img src="https://cdn-images-1.medium.com/max/184/1*r_JMQ_271-pBc3IHCdVp8w@2x.png" height="75px;" /></a>
  <a href="https://github.com/sindresorhus/ky"><img src="https://github.com/sindresorhus/ky/blob/main/media/logo.svg" height="75px;" /></a>
  <a href="https://webpack.js.org/"><img src="https://github.com/webpack/media/blob/master/logo/icon-square-big.png?raw=true" height="75px;" /></a>
  <a href="https://prettier.io/"><img src="https://github.com/prettier/prettier-logo/blob/master/images/prettier-banner-dark.png" height="75px;" /></a>
</p>

## :+1: Contributing
Pull requests and bug reports are welcome!! 😄

## :page_facing_up: License
[MIT](https://github.com/kshida/github-emoji-extension/blob/main/LICENSE)
