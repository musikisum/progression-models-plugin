# educandu-plugin-example

[![codecov](https://codecov.io/gh/educandu/educandu-plugin-example/branch/main/graph/badge.svg)](https://codecov.io/gh/educandu/educandu-plugin-example)

An example plugin for educandu

## Prerequisites

* node.js ^18.0.0
* optional: globally installed gulp: `npm i -g gulp-cli`

The output of this repository is an npm package (`@educandu/educandu-plugin-example`).

## Usage

* Clone this repository
* Adjust the names so that they suit your purpose (see also the naming conventions below)
* Adjust the CI/CD scripts so you can publish automtically (or remove them for manual publishing)

# Naming conventions

You need to come up with two good names:

* A **namespace** that is unique to your person or organization.
  * In best case this is also your Github/NPM organization name.
  * If you don't have an organization, use a non-common suitable name as namespace.
* A **plugin name** that clearly describes the purpose of your plugin.

In the case of this repository, the namespace is `educandu` (as this is also the Github/NPM namespace used) and the plugin name is (obviously): `example`.

Out of these two parts you can generate according to these templates:

* Template `{namespace}/educandu-plugin-{plugin-name}` (all kebab-cased), example: `educandu/educandu-plugin-example`
  * use this for the Github repository name and the NPM package name
  * use this also as the `typeName` for the plugin in the `info.js` module
  * use this also as the namespace for the plugin translations in the `*.yml` files
* Template `EP_{Namespace}_{PluginName}_{PutYourCssClassNameHere}` (all Pascal-cased), example: `EP_Educandu_Example_MyClassName`
  * use this for CSS classes that are added by the plugin

For example, if a person called "John Doe" wants to publish a plugin called "Slide show", the names could be:

* `john-doe/educandu-plugin-slide-show`
* `EP_JohnDoe_SlideShow_HeaderImage`

## License

Educandu is released under the MIT License. See the bundled LICENSE file for details.

---

## OER learning platform for music

Funded by 'Stiftung Innovation in der Hochschullehre'

<img src="https://stiftung-hochschullehre.de/wp-content/uploads/2020/07/logo_stiftung_hochschullehre_screenshot.jpg)" alt="Logo der Stiftung Innovation in der Hochschullehre" width="200"/>

A Project of the 'Hochschule für Musik und Theater München' (University for Music and Performing Arts)

<img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Logo_Hochschule_f%C3%BCr_Musik_und_Theater_M%C3%BCnchen_.png" alt="Logo der Hochschule für Musik und Theater München" width="200"/>

Project owner: Bernd Redmann\
Project management: Ulrich Kaiser
