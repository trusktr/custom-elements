# Custom Elements #

Custom elements are a part of the [W3C Web Components](http://w3c.github.io/webcomponents/explainer/) specification ([see spec](http://w3c.github.io/webcomponents/spec/custom/)). They allow you to define and register new HTML tags/elements in your documents. You can then use these tags as regular HTML.

This library polyfills the custom elements API on browsers today. It is a barebones fork of the [X-Tag core library](https://github.com/x-tag/core) from Mozilla ([see website](http://x-tags.org/)). X-Tags in turn uses the [Polymer](https://github.com/Polymer/polymer) polyfills from Google ([see website](http://www.polymer-project.org/)).

The aim of this fork is to provide a stripped down version of the polyfill, with zero additional weight.

## What’s included? ##

There are two source files in the repository:

- `CustomElements.js`, which polyfills the W3C Web Components custom elements API.
- `MutationObserver.js`, which polyfills the [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver) API. This is needed for the CustomElements polyfill and additionally polyfills the [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) API.

Each of these files are minified for distributions (see the `dist` directory).

## How do I use it? ##

Including CustomElements.js (or CustomElements.min.js) in your source will polyfill the custom elements API. For browsers that already support CustomMutations, it is not necessary to include CustomMutations.js (CustomMutations.min.js), although it will do harmful if you do (apart from possibly polyfilling the WeakMap API).

A simple demo file is located in the `demo` directory. An introduction to the custom elements API (with code examples) is [available on](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/) the HTML5 Rocks website from Google.