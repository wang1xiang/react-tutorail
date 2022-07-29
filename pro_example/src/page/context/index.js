import ChangeTheme from './ChangeTheme';
// import propsTypes from 'proptypes'
import "./index.less";

// TODO: 老版本 context
// class ConsumerDemo extends React.Component{
//    static contextTypes = {
//        theme:propsTypes.object
//    }
//    render(){
//        console.log(this.context.theme) // {  color:'#ccc',  bgcolor:'pink' }
//        const { color , background } = this.context.theme
//        return <div style={{ color,background } } >消费者</div>
//    }
// }

// const Son = React.memo(()=> <ConsumerDemo/>)  // 我们 useMemo 来隔离来自 ProviderDemo

// class ProviderDemo extends React.Component{
//     static childContextTypes={
//         theme:propsTypes.object
//     }
//     state={
//         theme: {
//             color:'#ccc',
//             background:'pink'
//         }
//     }
//     getChildContext(){
//         return { theme : this.state.theme }
//     }
//     render(){
//         return <div>
//             hello,let us learn React!
//             <Son/>
//             <button onClick={()=> this.setState({ theme:{ color:'#fff',background:'blue' }  }) }   >改变颜色</button>
//         </div>
//     }
//  }
// export default ProviderDemo

// 新版本 contexts

// const ThemeContext = React.createContext(null)

// TODO:  contextType 方式
// class ConsumerDemo extends React.Component{
//    render(){
//        const { color,background } = this.context
//        return <div style={{ color,background } } >消费者</div>
//    }
// }
// ConsumerDemo.contextType = ThemeContext
// const Son = memo(()=> <ConsumerDemo />)

// TODO: Consumer 订阅消费者方式
// const ThemeConsumer = ThemeContext.Consumer // 订阅消费者

// function ConsumerDemo(props){
//     const { color,background } = props
//     return <div style={{ color,background } } >消费者</div>
// }

// const Son = () => (
//     <ThemeConsumer>
//        { (contextValue)=> <ConsumerDemo  {...contextValue}  /> }
//     </ThemeConsumer>
// )

// TODO:  useContext 方式
// function ConsumerDemo(){
//      const { color,background } = React.useContext(ThemeContext)
//     return <div style={{ color,background } } >消费者</div>
// }

// const Son = ()=>{
//     console.log(1111)
//     return  <ConsumerDemo />
// }

// const ThemeProvider = ThemeContext.Provider //提供者

// export default function ProviderDemo(){
//     const [ contextValue , setContextValue ] = React.useState({  color:'#ccc', background:'pink' })
//     return <div>
//         <ThemeProvider value={ contextValue } >
//            { React.useMemo(()=>  <Son /> ,[]) }
//         </ThemeProvider>
//         <button onClick={ ()=> setContextValue({ color:'#fff' , background:'blue' })  } >切换主题</button>
//     </div>
// }

// TODO: 嵌套Provider

// const ThemeContext = React.createContext(null) // 主题颜色Context
// const LanContext = React.createContext(null)

// function ConsumerDemo(){
//     return <ThemeContext.Consumer>
//         { (themeContextValue)=> (
//             <LanContext.Consumer>
//                 { (lanContextValue) => {
//                     const { color , background } = themeContextValue
//                     return <div style={{ color,background } } > { lanContextValue === 'CH'  ? '大家好，让我们一起学习React!' : 'Hello, let us learn React!'  }  </div>
//                 } }
//             </LanContext.Consumer>
//         )  }
//     </ThemeContext.Consumer>
// }

// const Son = memo(()=> <ConsumerDemo />)
// export default function ProviderDemo(){
//     const [ themeContextValue ] = React.useState({  color:'#FFF', background:'blue' })
//     const [ lanContextValue ] = React.useState('CH') // CH -> 中文 ， EN -> 英文
//     return <ThemeContext.Provider value={themeContextValue}  >
//          <LanContext.Provider value={lanContextValue} >
//              <Son  />
//          </LanContext.Provider>
//     </ThemeContext.Provider>
// }

// TODO: 逐层传递Provder
// const ThemeContext = React.createContext(null)
// function Son2(){
//     return <ThemeContext.Consumer>
//         { (themeContextValue2)=>{
//             const { color , background } = themeContextValue2
//             return  <div  className="sonbox"  style={{ color,background } } >  第二层Provder </div>
//         }  }
//     </ThemeContext.Consumer>
// }

// function Son(){
//     const { color, background } = React.useContext(ThemeContext)
//     const [ themeContextValue2 ] = React.useState({  color:'#fff', background:'blue' }) /* 第二层 Provder 传递内容 */
//     return <div className='box' style={{ color,background } } >
//         第一层Provder
//         <ThemeContext.Provider value={ themeContextValue2 } >
//             <Son2  />
//         </ThemeContext.Provider>
//     </div>

// }

// export default function Provider1Demo(){
//     const [ themeContextValue ] = React.useState({  color:'orange', background:'pink' }) /* 第一层  Provider 传递内容  */
//     return <ThemeContext.Provider value={ themeContextValue } >
//         <Son/>
//     </ThemeContext.Provider>
// }

export default ChangeTheme;