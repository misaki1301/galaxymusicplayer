module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: "Galaxy Music Player",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    start_url: "/index.html",
    manifestOptions: {
      display: 'standalone',
      orientation: 'portrait'
    },
    workboxPluginMode: 'GenerateSW'
  },
};
