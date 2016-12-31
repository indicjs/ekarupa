SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "ascii-unicode-converter/": "src/"
  },
  browserConfig: {
    "baseURL": "/ascii-unicode-converter/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.17"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "ascii-unicode-converter": {
      "main": "ascii-unicode-converter.js",
      "format": "esm",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "indicjs/ekarupa": "github:indicjs/ekarupa@master",
    "indicjs/unicode-conversion-maps": "github:indicjs/unicode-conversion-maps@master"
  },
  packages: {}
});