const chalk = require('chalk')
const log = (message) => console.log(chalk.rgb(255, 182, 193)(`${message}`))
const { generate } = require('./utils')

function* processInput(chunk) {
  log(`请输入要生成模板文件的根目录(components / pages / views or others)`)
  yield
  log(`请输入要生成的模板类型（v3,v2,react）`)
  yield
  log(`请输入要生成的模板文件名称,多级目录请以./dir/fileName形式输入,同时生成多个文件目录请以#隔开`)
  yield
}
const handleProcess = processInput()
handleProcess.next()
const needProps = []
process.stdin.on('data', async (chunk) => {
  needProps.push(String(chunk).trim())
  if (handleProcess.next().done) {
    try {
      await generate(needProps)
    } catch (e) {
      errLog(e)
    }
  }
})
process.stdin.on('end', () => {
  process.exit()
})
