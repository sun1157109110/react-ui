import React, { useRef } from "react";
import classnames from "classnames";
import "./index.css";

/**
 * 标签组件
 * @param {closable} boolean 是否可关闭
 * @param {onClose} func 标签关闭时的回调
 * @param {color} string 标签的颜色,不设置则为默认颜色
 */
export default function Tag(props) {
  let { children, onClose, closable, color } = props;
  let tag = useRef(null);
  const handleClick = () => {
    onClose && onClose();
    tag.current.style.display = "none";
  };
  return (
    <div
      className={classnames("tag", color ? "colorTag" : "")}
      ref={tag}
      style={{ backgroundColor: color }}
    >
      {children}
      {closable && <span className="closeBtn" onClick={handleClick}>x</span>}
    </div>
  );
}
