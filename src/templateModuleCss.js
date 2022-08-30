module.exports = {
  moduleCssTemplate: (componentName) => {
    return `
          .${componentName.toLowerCase()}{}
      `
  }
}
