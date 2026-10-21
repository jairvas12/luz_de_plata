module.exports = function (config) {
  config.set({
    basePath: "",

    frameworks: ["jasmine"],

    files: [
      {
        pattern: "tests/**/*.spec.js",
        watched: true,
      },
    ],

    preprocessors: {
      "tests/**/*.spec.js": ["rollup"],
    },

    rollupPreprocessor: {
      output: {
        format: "iife",
        sourcemap: "inline",
      },
    },

    reporters: ["progress"],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ["ChromeHeadless"],

    singleRun: true,

    concurrency: Infinity,
  });
};
