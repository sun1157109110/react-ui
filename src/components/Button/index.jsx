import React from "react";
import "./index.css";
import classNames from "classnames";

/**
 * @param {onClick} func 对外暴露的点击事件
 * @param {className} string 自定义类名
 * @param {type} string 按钮类型 primary |confirm| warning | info | default | pure
 * @param {shape} string 按钮形状 circle | radius(默认)
 */
export default function Button(props) {
  let { className, onClick, type, shape, block, children } = props;

  return (
    <div
      className={classNames(
        "btn",
        "ripple",
        type,
        shape,
        block ? "block" : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
