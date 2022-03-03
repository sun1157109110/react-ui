import React from "react";
import classNames from "classnames";
import "./index.css";
/**
 * switch
 * @param {onClick} func 对外暴露的点击事件
 * @param {checked} bool 是否被选中
 * @param {disabled} bool 是否被禁用
 * @param {onText} string 开启状态的文本
 * @param {offText} string 关闭状态的文本
 * @param {onChange} func 状态切换时的函数
 * @param {size} string 组件的尺寸
 */
export default function Switch(props) {
  let {
    color = "#09f",
    className,
    onClick,
    checked,
    disabled,
    onText = "on",
    offText = "off",
    onChange,
    size,
  } = props;
  const handleChange = (e) => {
    console.log(e.target.checked);
    console.log(e.currentTarget);
    console.log(e.target);
    onChange && onChange(e.target.checked);
  };
  const handleClick = ()=>{
      onClick&&onClick()
  }
  return (
    <div className={classNames("switchWrap", className)}>
      <label
        className={classNames("switchInner", size)}
        style={{
          pointerEvents: disabled ? "none" : "default",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          onClick={handleClick}
        ></input>
        <span
          className="switchDot"
          style={{ borderColor: color }}
          data-ontext={onText}
        ></span>
        <span className="offText">{offText}</span>
      </label>
    </div>
  );
}
