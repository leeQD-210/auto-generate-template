module.exports = {
  reactTemplate: (componentName) => {
    return `
   import Styles from './style.module.less'
     const ${componentName}:React.FC=(props)=>{
      return (
          <div className={Styles.${componentName.toLowerCase()}}></div>
      )
     }
     export default ${componentName}
    `
  }
}
