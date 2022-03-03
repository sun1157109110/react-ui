import React, { useState ,useRef,useEffect} from 'react'
import Position from './Position';

/* 
父级容器overflow: auto，Select组件位于较下方。
父级容器overflow: hidden，Select组件位于较下方。
父级容器的层级较低时，高层级元素与DropdownMenu位置重合。
*/
export default function Select(props) {
    const {getContainer,onChange,defaultValue} = props;
    //控制下拉框显示/隐藏
    const [visible, setVisible] = useState(false);
    //当前选中的值
    const [data, setData] = useState({defaultValue,label:''});
    //是否设置默认值
    const [isDefaultValue, setIsDefaultValue] = useState(true);
    const inputRef= useRef(null);

    const handleSelect = (data)=>{
        setData(data);
        onChange&&onChange(data);
        //点击选项后隐藏下拉框
        setVisible(false);
    };
   
    // 查找defaultValue对应的label并展示出来
    useEffect(() => {
        if(!isDefaultValue)return;
        let index = props.children.findIndex((item)=>item.props.value===defaultValue);
        if(index>-1){
            setData(props.children[index].props);
            setIsDefaultValue(true);
        }
    }, [isDefaultValue,defaultValue,props.children]);

     //点击选择框以外的地方就隐藏下拉框
     const bindBodyClick = (e)=>{
        if(e.target !== inputRef.current){
            setVisible(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click',bindBodyClick,false)
        return () => {
            document.removeEventListener('click',bindBodyClick,false)
        }
    }, [])
    return (
       <React.Fragment>
           <input defaultValue={data.label} onClick={()=>{setVisible(true)}} ref = {inputRef} readOnly/>
           {
               visible?
               <Position onNotVisibleArea={() => setVisible(false)} targetRef = {inputRef} getContainer = {getContainer}>
                   {React.Children.map(props.children,child=>(
                       React.cloneElement(child,{handleSelect,selectedValue:data.value})
                   ))}
               </Position>:null
           }
       </React.Fragment>
    )
}
