const istanbul =
  require("rollup-plugin-istanbul");

const {
  babel
} =
  require("@rollup/plugin-babel");

const {
  nodeResolve
} =
  require("@rollup/plugin-node-resolve");

const commonjs =
  require("@rollup/plugin-commonjs");

const replace =
  require("@rollup/plugin-replace");


module.exports = function (config) {

  const ignorarCss = {
    name: "ignorar-css",
    resolveId(source) {
      if (source.endsWith(".css")) {
        return (
          "\0css-vacio:"
          +
          source
        );
      }
      return null;
    },

    load(id) {
      if (
        id.startsWith(
          "\0css-vacio:"
        )
      ) {
        return "";
      }
      return null;
    }
  };

  config.set({
    basePath: "",
    frameworks: [
      "jasmine"
    ],
    files: [
      {
        pattern:
          "tests/**/*.spec.js",
        watched: true
      },
      {
        pattern:
          "tests/**/*.spec.jsx",
        watched: true
      }
    ],

    preprocessors: {
      "tests/**/*.spec.js": [
        "rollup"
      ],
      "tests/**/*.spec.jsx": [
        "rollup"
      ]
    },

    rollupPreprocessor: {
      plugins: [
        replace({
          preventAssignment:
            true,
          objectGuards:
            true,
          values: {
            "process.env.NODE_ENV":
              JSON.stringify(
                "test"
              )
          }
        }),
        ignorarCss,
        nodeResolve({
          browser: true,
          extensions: [
            ".js",
            ".jsx"
          ]
        }),
        commonjs(),
        babel({
          babelHelpers:
            "bundled",
          extensions: [
            ".js",
            ".jsx"
          ],
          presets: [
            [
              "@babel/preset-react",
              {
                runtime:
                  "automatic"
              }
            ]
          ],
          exclude:
            "node_modules/**"
        }),

        istanbul({
          include: [
            "src/utils/carrito.js",
            "src/utils/favoritos.js",
            "src/utils/usuarios.js",
            "src/components/ProductoCard.jsx",
            "src/pages/Catalogo.jsx"
          ],
          exclude: [
            "tests/**/*.spec.js",
            "tests/**/*.spec.jsx"
          ]
        })
      ],
      output: {
        format:
          "iife",
        sourcemap:
          "inline"
      }
    },

    reporters: [
      "progress",
      "coverage"
    ],

    coverageReporter: {
      dir:
        "coverage",
      reporters: [
        {
          type:
            "text-summary"
        },
        {
          type:
            "html"
        }
      ]
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,
    
    autoWatch: false,

    browsers: ["ChromeHeadless"],

    singleRun: true,

    concurrency: Infinity
  });

};