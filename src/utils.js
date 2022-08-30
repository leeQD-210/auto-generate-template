const { reactTemplate } = require('./templateReact.js')
const { moduleCssTemplate } = require('./templateModuleCss.js')
const { v3Template } = require('./templateV3')
const { v2Template } = require('./templateV2')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = (message) => console.log(chalk.rgb(255, 182, 193)(`${message}`))
const successLog = (message) => console.log(chalk.rgb(165, 247, 191)(`${message}`))
const errLog = (message) => console.log(chalk.red(`${message}`))
const generateFile = (path, data) => {
  // 判断路径文件是否存在
  if (fs.existsSync(path)) {
    return errLog(`${path}文件已存在`)
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', (err) => {
      if (err) {
        errLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
const createDirectory = (directory) => {
  return new Promise((resolve, reject) => {
    makeDirs(directory, () => resolve(true))
  })
}
const makeDirs = (directory, callback) => {
  // 如果文件目录存在，直接执行创建成功回调
  if (fs.existsSync(directory)) {
    callback()
  } else {
    // path.dirname返回当前路径的目录 src/templates/test/test.vue  返回 src/templates/test
    // 检验每一层的目录是否存在，不存在则返回创建路径上一级，进行判断，递归进行，都不存在，则从根目录创建
    makeDirs(path.dirname(directory), () => {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
module.exports = {
  async generate([rootDirName, templateType, templateName]) {
    // 监听用户输入
    templateName.split('#').forEach(async (item) => {
      const inputName = item.trim().toString()
      //   组件目录路径
      const templateDirectory = resolve(`../src/${rootDirName}`, inputName)
      if (fs.existsSync(templateDirectory)) {
        return errLog(`${inputName}文件目录已存在，请重新输入`)
      } else {
        log(`正在生成文件目录${templateDirectory}`)
        await createDirectory(templateDirectory)
      }
      if (inputName.includes('/')) {
        const inputArr = inputName.split('/')
        // 如果包含多级目录取最后一个作为组件名
        templateName = inputArr[inputArr.length - 1]
      } else {
        templateName = inputName
      }
      // 生成文件
      switch (templateType) {
        case 'v2':
          log(`正在生成vue2文件${resolve(templateDirectory, `index.vue`)}`)
          await generateFile(resolve(templateDirectory, `index.vue`), v2Template(templateName))
          break
        case 'v3':
          log(`正在生成vue3文件${resolve(templateDirectory, `index.vue`)}`)
          await generateFile(resolve(templateDirectory, `index.vue`), v3Template(templateName))
          break
        case 'react':
          //   组件文件路径
          log(`正在生成react文件${resolve(templateDirectory, `index.tsx`)}`)
          await generateFile(resolve(templateDirectory, `index.tsx`), reactTemplate(templateName))
          await generateFile(resolve(templateDirectory, 'style.module.less'), moduleCssTemplate(templateName))
          break
      }
      successLog(`模板文件创建完成`)
      process.stdin.emit('end')
    })
  }
}
