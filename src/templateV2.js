module.exports = {
  v2Template: (componentName) => {
    return `
    <template>
    <div class="${componentName}"></div>
    </template>
    <script>
    export default {
      data() {
       return{}
      } 
    }
    </script>
    <style lang="less" scoped></style>
    `
  }
}
