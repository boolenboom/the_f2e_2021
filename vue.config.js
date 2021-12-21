module.exports = {
    filenameHashing:true,
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/assets/scss/main.scss";
                `
            }
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Travel Taiwan";
                return args;
            })
    }
}