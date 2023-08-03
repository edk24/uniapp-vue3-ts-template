// import { getInfo } from '@/api/staff'
import { TOKEN_KEY } from '@/enums/cacheEnums'
import cache from '@/utils/cache'
import { defineStore } from 'pinia'

interface UserState {
    userInfo: Record<string, any>
    token: string | null
    temToken: string | null
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        userInfo: {},
        token: cache.get(TOKEN_KEY) || null,
        temToken: null
    }),
    getters: {
        isLogin: (state) => !!state.token
    },
    actions: {
        async getUser() {
            // TODO 请求接口拿到用户信息数据
            // const data = await getInfo()
            // this.userInfo = data
        },
        login(token: string) {
            this.token = token
            cache.set(TOKEN_KEY, token)
        },
        logout() {
            this.token = ''
            this.userInfo = {}
            cache.remove(TOKEN_KEY)
        }
    }
})
