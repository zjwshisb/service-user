import type { UserConfigExport } from "@tarojs/cli";
export default {
  defineConstants: {
    BASE_URL: '"http://localhost:8080/api/user"',
    WS_URL: '"ws://localhost:8080/api/user/chat/ws"'
  },
  mini: {},
  h5: {},
} satisfies UserConfigExport<'vite'>
