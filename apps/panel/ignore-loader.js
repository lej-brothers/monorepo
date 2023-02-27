//ignore-loader.js
/**
 * A webpack loader that does nothing. Used as a workaround for an issue
 * with react refresh and common.
 * @see config-overrides.js
 */
module.exports = function loader(source) {
  return "";
};