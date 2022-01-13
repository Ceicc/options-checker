module.exports = optionsChecker

/** 
 * @typedef {object} configProperty
 * @property {any} default - the default value to fall on
 * @property {string} type - pipe seperated list of accepted types. e.g.: "string|boolean"
*/

/**
 * @param {object} opts
 * @param {object} config
 */
function optionsChecker(opts, config) {
  for (const property in config) {
    if (!Object.hasOwnProperty.call(config, property)) {
      continue
    }

    if (!Object.hasOwnProperty.call(opts, property)) {  // It doesn't exist in the options, fallback to the default (if there any)
      opts[property] = config[property].default
      config[property].done = true
      continue
    }

    if (typeof config[property].type !== "string") {    // The configuration does't have a type or it is not a string
      config[property].done = true
      continue
    }
    
    const arrayOfTypes = config[property].type.split("|")

    for (const type of arrayOfTypes) {
      if (typeof opts[property] === type) {
        config[property].done = true
        break
      }
    }

    if (!config[property].done && Object.hasOwnProperty.call(config[property], "default")) {   // the value provided in the options doesn't match any specified type
      opts[property] = config[property].default
      config[property].done = true
    }
  }

  // Clean unspecified propertys
  for (const property in opts) {
    if (Object.hasOwnProperty.call(opts, property) && config[property]?.done !== true) {
      delete opts[property]
    }
  }
}