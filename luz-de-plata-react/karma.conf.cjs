const istanbul = require("rollup-plugin-istanbul");

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
      plugins: [
        istanbul({
          include: [
            "src/utils/carrito.js",
            "src/utils/favoritos.js",
            "src/utils/usuarios.js",
          ],
          exclude: ["tests/**/*.spec.js"],
        }),
      ],

      output: {
        format: "iife",
        sourcemap: "inline",
      },
    },

    reporters: ["progress", "coverage"],

    coverageReporter: {
      dir: "coverage",
      reporters: [{ type: "text-summary" }, { type: "html" }],
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ["ChromeHeadless"],

    singleRun: true,

    concurrency: Infinity,
  });
};
