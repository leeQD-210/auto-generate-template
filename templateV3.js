module.exports = {
  v3Template: (componentName) => {
    return `
      <template>
      <div class="${componentName}"></div>
    </template>
    <script lang="ts" setup>
    import { defineComponent } from 'vue'
    defineComponent({
      name: '${componentName}'
    })
    </script>
    <style lang="less" scoped></style>
      `
  }
}
