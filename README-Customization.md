## Fonts

### Change the default title font (Work Sans):

1. To change the default title font, first upload your font files to the `src/styles/fonts` folder (woff and woff2 formats are recommended).
2. Update `src/styles/fonts.scss` with the `@font-face` corresponding to your desired font.
3. Finally, in `src/styles/fonts.scss` file, go to the end of the file. And replace `Work Sans` with your new font name in the following code:

```
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "YOUR NEW FONT NAME HERE", sans-serif;
}

```

> Tip: If you just want to change the font for a font that is in Google Fonts, you can use the following helper to download the font files and generate the `@font-face` code: https://google-webfonts-helper.herokuapp.com/fonts

### Change the default text font (Work Sans):

1. To change the default text font, first upload your font files to the `src/styles/fonts` folder (woff and woff2 formats are recommended).
2. Update `src/styles/fonts.scss` with the `@font-face` corresponding to your desired font.
3. Finally, in `src/styles/fonts.scss` file, go to the end of the file. And replace `Roboto` with your new font name in the following code:

```
body {
  font-family: "YOUR NEW FONT NAME HERE", sans-serif;
}
```

> Tip: If you just want to change the font for a font that is in Google Fonts, you can use the following helper to download the font files and generate the `@font-face` code: https://google-webfonts-helper.herokuapp.com/fonts
