# Doom-Scrolling

Experiment that reveals images based on user-interactions.

There are three interaction types:
- tap
- tap-and-scroll
- scroll

You can interact with the buttons to test each style out. Remember to click the respective button each time you want to test a new mode so all settings are properly reset.

The game can be served by opening a terminal of your choice and navigating to the root dir, then running:

`python -m http.server`

You can also use another server (e.g. with node.js) if you'd prefer.

This is designed to be played in mobile (obviously, given it's touch-screen based). You can access mobile testing in a browser such as firefox by doing `Right Click -> Inspect` (or opening dev tools however you like), and either doing `Ctrl + Shift + M`, or entering responsive design mode by clicking the mobile icon in the top right-hand corner. 

If you're using another browser, check the browser-specific settings. Also remember to turn on touch simulation through the little finger-press icon on the upper toolbar, and set the device type (I've tested it on standard phone screens, but not on ones like ipads, kindles, etc.).