import type { UserConfigExport } from '@tarojs/cli'

export default {
  projectName: 'ai-recipe-chat',
  date: '2026-03-18',
  designWidth: 375,
  deviceRatio: {
    375: 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-framework-react', '@tarojs/plugin-platform-weapp'],
  framework: 'react',
  compiler: 'webpack5',
  mini: {},
  h5: {},
  defineConstants: {
    __API_BASE_URL__: JSON.stringify(process.env.API_BASE_URL || 'http://127.0.0.1:8000')
  }
} satisfies UserConfigExport

