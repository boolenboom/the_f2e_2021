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
    }
}