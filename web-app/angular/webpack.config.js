const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  output: {
    publicPath: "http://localhost:4201/",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "nav",
      filename: "remoteEntry.js",
      exposes: {
        './NavComponent': './src/app/components/nav/nav.component.ts',
      },
      shared: {
        ...deps,
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: deps["@angular/core"] },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: deps["@angular/common"] },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: deps["@angular/router"] },
      },
    }),
  ],
};
