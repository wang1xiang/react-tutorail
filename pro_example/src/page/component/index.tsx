/* eslint-disable react/no-multi-comp */
//todo
import React from 'react'
import './index.less'

// class Index extends React.Component{
//     state={ number:0 }
//     handerClick=()=>{
//         setTimeout(()=>{
//             this.setState({ number: 1  })
//         })
//         this.setState({ number: 2  })
//         ReactDOM.flushSync(()=>{
//             this.setState({ number: 3  })
//         })
//         this.setState({ number: 4  })
//     }
//     render(){
//         const { number } = this.state
//         console.log(number) // 打印什么？？
//         return <div>
//             <div>{ number }</div>
//             <button onClick={this.handerClick} >测试flushSync</button>
//         </div>
//     }
// }

// Index.displayName = 'hello_asdw2222'

// const Home = ({ children })=>{
//     console.log( children.type.displayName )
//     return <div>{children}</div>
// }



// export default () => <Home><Index/></Home>

function Index(){
    // const [ number , setNumber ] = useState(0)
    return <div>
        {/* { number }
        <button onClick={()=>setNumber(22)} >点击</button> */}
        hello.world
    </div>
}

export default Index