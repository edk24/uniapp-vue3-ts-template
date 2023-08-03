<template>
    <view class="uploader-container flex wrap">
        <u-upload @on-change="handleCallback" :action="action" :header="{ token: token, version: '1.0.0' }"
            :deletable="deletable" :max-count="maxUpload" :showProgress="showProgress" @on-remove="remove"
            :multiple="mutiple" :custom-btn="true" :width="previewSize" :height="previewSize" :disabled="disabled"
            ref="upload">
            <template #addBtn>
                <view class="uplader-upload" hover-class="slot-btn__hover" hover-stay-time="150">
                    <u-icon size="48" color="#dcdee0" name="camera" />
                    <view class="xs mt-[10rpx]">
                        {{ fileList.length >= 1 ? fileList.length + '/' + maxUpload : tips }}
                    </view>
                </view>
            </template>

        </u-upload>
    </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useStaffStore } from '@/stores/user'
import { toast } from '@/utils/util'

const staffStore = useStaffStore()

/** Emit Start **/
const emit = defineEmits(['update:modelValue'])
/** Emit End **/

/** Props Start **/
const props = withDefaults(
    defineProps<{
        mutiple?: boolean // 默认不允许多选图片
        maxUpload?: number // 限制上传文件数量
        previewSize?: any // upload显示的大小
        deletable?: any // 是否可删除
        tips?: string //提示
        showProgress?: false // 是否显示进度条
        disabled?: false
    }>(),
    {
        mutiple: false,
        maxUpload: 1,
        previewSize: '160',
        deletable: true,
        tips: '上传图片',
        showProgress: false,
        disabled: false
    }
)
/** Props End **/

/** Data Start **/
const action = ref<string | null>('')
const token = ref<string | null>('')
const fileList = ref<Array<any> | null>([])
const versions = ref<string | null>('1.0.0')
/** Data End **/

/** Methods Start **/
/**
 * @param { params } 上传返回值
 * @return { void }
 * @description 上传，不管成不成功都返回数据｜提示
 */
const handleCallback = (params: any) => {
    toast(JSON.parse(params.data).msg)

    if (JSON.parse(params.data).code == 1) {
        fileList.value.push(JSON.parse(params.data).data.url)
        emit('update:modelValue', fileList.value)
    }
}

/**
 * @param { event } 索引值
 * @return { void }
 * @description 删除一个图片
 */
const remove = (event: number | string) => {
    fileList.value.splice(event, 1)
    emit('update:modelValue', fileList.value)
}
/** Methods End **/

/** Life Cycle Start **/
onMounted(() => {
    action.value = `${import.meta.env.VITE_APP_BASE_URL}/staffapi/upload/image`
    token.value = staffStore.token
})
/** Life Cycle End **/
</script>

<style lang="scss" scoped>
.uploader-container {
    width: 160rpx;
    height: 160rpx;

    .uplader-upload {
        position: relative;
        width: 160rpx;
        height: 160rpx;
        padding-top: 30rpx;
        text-align: center;
        margin: 11rpx;
        border: 2px dashed #e5e5e5;

        >view {
            color: #bbb;
        }
    }
}
</style>
@/stores/user