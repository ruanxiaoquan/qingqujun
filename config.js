export default {
    isDev: true,
    dev: {
        server: "http://deliver.test.youxinpai.com/",
        proxy: "",
        net: "http://10.70.14.42:8036/", //.net 接口
        remark: "http://padapi.test.youxinpai.com/", //售后进度
        juzhen: "http://juzhen.ceshi.youxinpai.com/", //物流
        brands: "http://daiban.ceshi.youxinpai.com/", //获取品牌
        image: "http://img3.youxinpai.com/", //图片上传
    },
    production: {
        server: "http://deliver.youxinpai.com/",
        map: "http://league.youxinpai.com/map.html",
        proxy: "http://deliver.test.youxinpai.com/mobile/inspection/task_list",
        net: "http://transformers.youxinpai.com/",
        remark: "http://padapi.youxinpai.com/", //售后进度
        juzhen: "http://juzhen.youxinpai.com/", //物流
        brands: "http://daiban.youxinpai.com/", //获取品牌
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