
const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
    config.resolve.alias
            //设置“src”目录别名为“@”
            .set("@", resolve("src"))
            // .set("views", resolve("src/views"))
  },
  css: {
    loaderOptions: {
     
      less:{
        globalVars: {
          primary: '#fff'
        }
      }
    }, // E
  },
  devServer: {
    open: true,
    proxy: {
      "/api": {  
        target: "http://localhost:5000",
        pathRewrite: { "^/api": "/" },
      },
    },
  },
};
