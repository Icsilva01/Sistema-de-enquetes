
// necessário para entender que os arquivos .scss são módulos de css
declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}