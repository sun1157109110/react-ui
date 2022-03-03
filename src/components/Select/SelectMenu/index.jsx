import React,{ useState,useEffect } from 'react';
import './index.css';

export default function SelectMenu(props) {
    const [selected, setSelected] = useState(false);
    const {label,value,className='',selectedValue,handleSelect} = props;
    //value 默认根据此属性进行筛选 label是文本值;
    useEffect(() => {
        if(selectedValue===value){
            setSelected(true)
        }
    }, [value,selectedValue]);
    return (
        <div className={`${className}${selected?'selected':''}`} onClick={()=>{handleSelect({value,label})}}>
            {label}
        </div>
    )
}
