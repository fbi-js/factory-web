<%_ if (project.features.main) { _%>
import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/Apollo'
import { HeaderContentRender } from '@/components/Header'

// https://umijs.org/zh-CN/plugins/plugin-initial-state
// 可通过 useModel('@@initialState') 获取
export async function getInitialState() {
  const data = {
    userId: 1,
    name: 'muchang',
    avatar: 'https://avatars1.githubusercontent.com/u/16712324?s=60&v=4',
  }
  return data
}

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout = {
  // 自定义 Nav 区域
  headerContentRender: HeaderContentRender,
  logout: (data: any) => {
    console.log('logout data:', data)
  },
}

// https://umijs.org/zh-CN/plugins/plugin-qiankun
export async function qiankun() {
  return {
    // 注册子应用信息
    apps: [
      {
        name: 'sub-app',
        entry: 'http://localhost:8081/',
      },
    ],
    // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
    // lifeCycles: {
    //   afterMount: (props) => {
    //     console.log(props);
    //   },
    // },
    // 支持更多的其他配置，详细看这里 https://qiankun.umijs.org/zh/api/#start-opts
  }
}

export function useQiankunStateForSlave() {
  const [globalState, setGlobalState] = useState({})
  return {
    globalState,
    setGlobalState,
  }
}
<%_ } _%>

<%_ if (project.features.sub) { _%>
  import React from 'react'
  import { ApolloProvider } from '@apollo/client'
  import { client } from '@/Apollo'
  export const qiankun = {
    // 应用加载之前
    async bootstrap(props: any) {
      console.log('app1 bootstrap', props)
    },
    // 应用 render 之前触发
    async mount(props: any) {
      console.log('app1 mount', props)
    },
    // 应用卸载之后触发
    async unmount(props: any) {
      console.log('app1 unmount', props)
    },
  }
<%_ } _%>

export const rootContainer = (container: React.ReactNode) => (
  <ApolloProvider client={client}>{container} </ApolloProvider>
)