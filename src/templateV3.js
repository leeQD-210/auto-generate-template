module.exports = {
  v3Template: (componentName) => {
    return `
      <template>
      <div class="${componentName}"></div>
    </template>
    <script lang="ts">
     export default{
      name:'${componentName}'
     }
    </script>
    <script lang="ts" setup>
    </script>
    <style lang="less" scoped></style>
      `
  }
}
