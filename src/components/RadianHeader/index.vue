<template>
    <view class="header" :style="customStyle">
        <slot></slot>
    </view>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        // 头部高度
        height: {
            type: Number,
            default: 200
        },
        // 背景 (支持渐变色!)
        bgcolor: {
            type: String,
            default: '#22bf88'
        }
    },
    computed: {
        customStyle: function () {
            return {
                '--height': this.height + 'rpx',
                '--bgColor': this.bgcolor
            }
        }
    }
});
</script>

<style lang="scss" scoped>
.header {
    /* 定位 */
    position: relative;
    width: 100%;
    height: var(--height);
    /*子元素溢出隐藏*/
    overflow: hidden;
    /*因为父级还有其它子元素需要显示，伪类设置-1后其它子元素将不能正常显示*/
    z-index: 99;
}

.header:after {
    width: 140%;
    height: calc(var(--height) - 80rpx);
    position: absolute;
    /*设置水平居中*/
    left: -20%;
    /* 之所以left:20%,是因为width:140%，若width:160%，那么left:30%才能水平居中 */
    top: 0;
    z-index: -1;
    /*层叠顺序，最底层显示*/
    content: '';
    border-radius: 0 0 50% 50%;
    /*分别对应 左上 右上 右下 左下 可以修改成其它颜色*/
    background: var(--bgColor);
}
</style>