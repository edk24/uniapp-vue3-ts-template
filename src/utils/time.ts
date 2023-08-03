/**
 * 格式化为 xxx以前 (1小时前, 一天前, 6小时前....)
 * 
 * @param timeStr 时间字符串
 */
export const getTimeAgo = (timeStr: string) => {
    const currentTime:any = new Date();
    const time:any = new Date(timeStr);
    const timeDiff = Math.abs(currentTime - time);
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

    if (seconds < 60) {
        return "刚刚";
    } else if (minutes < 60) {
        return "今天 " + formatTime(time);
    } else if (hours < 24) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (
            time.getDate() === yesterday.getDate() &&
            time.getMonth() === yesterday.getMonth() &&
            time.getFullYear() === yesterday.getFullYear()
        ) {
            return "昨天 " + formatTime(time);
        } else {
            return formatDate(time) + " " + formatTime(time);
        }
    } else if (days < 7) {
        return formatDate(time) + " " + formatTime(time);
    } else if (weeks < 4) {
        return weeks + "周前";
    } else {
        return time.toLocaleString();
    }
}


function formatTime(time:any) {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return hours + ":" + minutes;
}

function formatDate(time:any ) {
    const month = (time.getMonth() + 1).toString().padStart(2, "0");
    const day = time.getDate().toString().padStart(2, "0");
    return month + "-" + day;
}