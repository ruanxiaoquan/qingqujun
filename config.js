export default {
    isDev: true,
    dev: {
        server: "http://127.0.0.1:3800/", 
        image: "http://img3.youxinpai.com/", //图片上传
    },
    production: {
        server: "http://deliver.youxinpai.com/", 
        image: "http://img3.youxinpai.com/", //图片上传
    },
    cache: {
        token: "TOKEN",
        search: "CEARCH",
    },
    upload: {
        app: "nbp",
        key: "0ab043533b6f1aabd34712f1e7f58970"
    }
}