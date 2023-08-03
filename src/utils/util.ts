/**
 * @description 节流
 * @param { Function } func
 * @param { Number } time
 * @return { Function }
 */
export const throttle = (func: (_p: any) => any, time = 1000): any => {
    let previous = new Date(0).getTime()
    return function (...args: []) {
        const now = new Date().getTime()
        if (now - previous > time) {
            previous = now
            return func(args)
        }
    }
}

/**
 * @description 防抖
 * @param { Function } func
 * @param { Number } time
 * @return { Function }
 */
export const debounce = (func: (_p: any) => any, time = 1000) => {
    let timer: any = null
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = null
            func(args)
        }, time)
    }
}


/**
 * 打开地图app
 * 
 * @param lat 
 * @param lon 
 * @param name 
 * @param sourceApplication 
 */
export const openMap = (lat: any, lon: any, name: string, sourceApplication: any) => {
    var url = "";
    if (plus.os.name == "Android") {
        var hasBaiduMap = plus.runtime.isApplicationExist({ pname: 'com.baidu.BaiduMap', action: 'baidumap://' });
        var hasAmap = plus.runtime.isApplicationExist({ pname: 'com.autonavi.minimap', action: 'androidamap://' });
        var urlBaiduMap = `baidumap://map/marker?location=${lat},${lon}&title=${name}&src=${sourceApplication}`;
        var urlAmap = `androidamap://viewMap?sourceApplication=${sourceApplication}&poiname=${name}&lat=${lat}&lon=${lon}&dev=0`
        if (hasAmap && hasBaiduMap) {
            plus.nativeUI.actionSheet({ title: "选择地图应用", cancel: "取消", buttons: [{ title: "百度地图" }, { title: "高德地图" }] }, function (e) {
                switch (e.index) {
                    case 1:
                        plus.runtime.openURL(urlBaiduMap);
                        break;
                    case 2:
                        plus.runtime.openURL(urlAmap);
                        break;
                }
            })
        }
        else if (hasAmap) {
            plus.runtime.openURL(urlAmap);
        }
        else if (hasBaiduMap) {
            plus.runtime.openURL(urlBaiduMap);
        }
        else {
            url = `geo:${lat},${lon}?q=${sourceApplication}`;
            plus.runtime.openURL(url); //如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差  
        }
    } else {
        // iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）  
        plus.nativeUI.actionSheet({ title: "选择地图应用", cancel: "取消", buttons: [{ title: "Apple地图" }, { title: "百度地图" }, { title: "高德地图" }] }, function (e) {
            console.log("e.index: " + e.index);
            switch (e.index) {
                case 1:
                    url = `http://maps.apple.com/?q=${sourceApplication}&ll=${lat},${lon}&spn=0.008766,0.019441`;
                    break;
                case 2:
                    url = `baidumap://map/marker?location=${lat},${lon}&title=${name}&src=${sourceApplication}`;
                    break;
                case 3:
                    url = `iosamap://viewMap?sourceApplication=${sourceApplication}&poiname=${name}&lat=${lat}&lon=${lon}&dev=0`;
                    break;
                default:
                    break;
            }
            if (url != "") {
                plus.runtime.openURL(url, function (e) {
                    plus.nativeUI.alert("本机未安装指定的地图应用");
                });
            }
        })
    }
}