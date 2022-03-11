if (process.env.NODE_ENV === "production") {
  require("@google-cloud/trace-agent").start();
  require("@google-cloud/debug-agent").start();
}

require("./src/server.js");
