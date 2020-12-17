"use strict";
function errorHandler(message = "Internal server error", error = null) {
  console.error("[error]", error || message);
  throw new Error(message);
}

module.exports = errorHandler;
