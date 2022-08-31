import resolve from 'rollup-plugin-node-resolve' // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs' // commonjs模块转换插件
import babel from 'rollup-plugin-babel' // babel 插件

export default {
  input: './src/index.js', // 打包的入口文件
  output: {
    name: 'atuo-generate-template', // 输入的包名
    file: '/index.js', // 打包输出地址, 这里的导出地址就是package内main的地址
    format: 'umd' // 包类型
  },
  plugins: [
    // 使用的插件
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
  ],
  ignore: [
    'node_modules/**' // 忽略目录
  ]
}
