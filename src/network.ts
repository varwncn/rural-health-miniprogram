import Taro from '@tarojs/taro'

/**
 * 网络请求模块
 * 封装 Taro.request、Taro.uploadFile、Taro.downloadFile，自动添加项目域名前缀
 * 如果请求的 url 以 http:// 或 https:// 开头，则不会添加域名前缀
 *
 * IMPORTANT: 除非你需要添加全局参数，如给所有请求加上 header，否则不能修改此文件
 */
export namespace Network {
    const createUrl = (url: string): string => {
        // 如果已经是完整 URL，直接返回
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url
        }

        // 获取项目域名，优先使用环境变量，否则根据环境自动判断
        let domain = (globalThis as any).PROJECT_DOMAIN || ''

        // 如果没有配置 PROJECT_DOMAIN，根据环境自动判断
        if (!domain) {
            const env = Taro.getEnv()
            // 小程序开发环境：使用本地开发服务器
            if (env === Taro.ENV_TYPE.WEAPP) {
                // 注意：在小程序中使用 http://localhost 需要在开发者工具中关闭域名校验
                domain = 'http://localhost:3000'
            } else if (env === Taro.ENV_TYPE.H5) {
                // H5 开发环境：使用相对路径，由 Vite proxy 处理
                domain = ''
            } else {
                // 其他环境（如生产环境）需要有配置
                domain = 'http://localhost:3000'
            }
        }

        // 如果 domain 为空（H5 环境），直接返回 url
        if (!domain) {
            return url
        }

        return `${domain}${url}`
    }

    export const request: typeof Taro.request = option => {
        const fullUrl = createUrl(option.url)
        console.log('📡 Network.request:', {
            url: option.url,
            fullUrl: fullUrl,
            method: option.method || 'GET',
            data: option.data
        })
        return Taro.request({
            ...option,
            url: fullUrl,
        })
    }

    export const uploadFile: typeof Taro.uploadFile = option => {
        const fullUrl = createUrl(option.url)
        console.log('📤 Network.uploadFile:', {
            url: option.url,
            fullUrl: fullUrl,
            filePath: option.filePath,
            name: option.name
        })
        return Taro.uploadFile({
            ...option,
            url: fullUrl,
        })
    }

    export const downloadFile: typeof Taro.downloadFile = option => {
        const fullUrl = createUrl(option.url)
        console.log('📥 Network.downloadFile:', {
            url: option.url,
            fullUrl: fullUrl
        })
        return Taro.downloadFile({
            ...option,
            url: fullUrl,
        })
    }
}
