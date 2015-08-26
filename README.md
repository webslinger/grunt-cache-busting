grunt-magento-cache
===================
> Cache busting files and updating references, a derivative of Paul Tondeur's grunt-cache-busting to suit magento's needs.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-magento-cache --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-magento-cache');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started#the-gruntfile


## Usage

```javascript
'cache-busting': {
    options: {
        global: true
    },
	simplejs: {
		replace: ['app/design/frontend/default/page.xml'],
		replacement: 'simple.min.css',
		file: 'tmp/deploy/js/app/simple.min.css'
	},
	groupedjs: {
	    replace: ['app/design/frontend/default/page.xml'],
        replacement: 'grouped.min.css',
        file: 'tmp/deploy/js/app/grouped.min.css'
	}
},
```

Say that the page.xml looks like this:

```xml
<PRODUCT_TYPE_simple>
    <reference name="head">
        <action method="removeItem"><type>skin_css</type><name>css/grouped.min.css</name></action>
        <action method="addCss"><stylesheet>css/simple.min.css</stylesheet></action>
    </reference>
</PRODUCT_TYPE_simple>
<PRODUCT_TYPE_grouped>
    <reference name="head">
        <action method="removeItem"><type>skin_css</type><name>css/simple.min.css</name></action>
        <action method="addCss"><stylesheet>css/grouped.min.css</stylesheet></action>
    </reference>
</PRODUCT_TYPE_grouped>
```

After running ```grunt cache-busting```, this file will look like this, and the files have changed accordingly on disk:
```xml
<PRODUCT_TYPE_simple>
    <reference name="head">
        <action method="removeItem"><type>skin_css</type><name>css/grouped.min-HASH-OF-FILE-CONTENTS.css</name></action>
        <action method="addCss"><stylesheet>css/simple.min-HASH-OF-FILE-CONTENTS.css</stylesheet></action>
    </reference>
</PRODUCT_TYPE_simple>
<PRODUCT_TYPE_grouped>
    <reference name="head">
        <action method="removeItem"><type>skin_css</type><name>css/simple.min-HASH-OF-FILE-CONTENTS.css</name></action>
        <action method="addCss"><stylesheet>css/grouped.min-HASH-OF-FILE-CONTENTS.css</stylesheet></action>
    </reference>
</PRODUCT_TYPE_grouped>
```


## API reference
### options
*options* has property global, which should be set to true when working with layout xml.
### replace
*replace* is an array of source files that is searched for the strings to be replaced.

### replacement
*replacement* is a string for which we search and replace by the hash. If it contains an extension, the extension will be preserved.

### file
*file* is the file which will be renamed to filename-HASH-OF-FILE-CONTENTS.ext. The hash is generated based on the file
contents of this parameter.

## Credits
This plugin is build on top of [grunt-cache-busting](https://github.com/PaulTondeur/grunt-cache-busting/)
