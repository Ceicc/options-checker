# Options-Checker
Check types and pass default values for objects

## Installing
`options-checker` can be used both in node and browsers

### Node
First install it with NPM

`npm i @ceicc/options-checker`

```js
import optionsChecker from "@ceicc/options-checker"

// can be imported using CommonJS syntax
// const optionsChecker = require("@ceicc/options-checker")
```
### Browser
```html
<script defer src="https://unpkg.com/@ceicc/options-checker@^1"></script>
```

## Usage Example
Most useful place would be for checking options arguments

```js
const fs = require("fs/promises"),
      optionsChecker = require('./index')


function createFile(path, opts = {}) {
  if (typeof path !== "string") throw TypeError("path argument should be string")

  optionsChecker(opts, {
    data: { default: "",          type: "string|number" },
    cb:   { default: console.log, type: "function"      }
  })

  fs.writeFile(path, opts.data).then(opts.cb)
}

createFile('./test.txt', { data: "Hello World" })
```

You don't need re-assign `opts` because javascript passes objects by refrence.

The default value can be discarded, and `optionsChecker` will only do type checking.

Any value that it's not specified in the config object or failed type checking and doesn't have default value will be deleted.

## Arguments
  1. `opts` The object to check against
  2. `config` The configuration object that holds the types and default values.

The key in `config` object would be the name of the value to check against in the `opts` object, and the value of this key would be an object with those two keys:

- `default` - the default value to fall on
- `type` - pipe seperated list of accepted types. e.g.: "string|boolean"