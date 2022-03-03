import React from "react";
import classNames from "classnames";
import "./index.css";
/**
 * Spin组件
 * @param {isLoading} bool 加载中状态，默认为true
 * @param {loadingText} string 加载状态的文本
 * @param {hiddenText} bool 是否隐藏加载状态的文本
 * @param {type} string spin的类型，ball|line
 * @param {spinColor} string 加载动画颜色
 * @param {textColor} string 加载文本颜色
 */

export default function Spin(props) {
  const spinType = { line: "line" };
  const {
    isLoading = true,
    type,
    loadingText = "拼命加载中",
    hiddenText = false,
    spinColor = "#06c",
    textColor = "#1e1e1e",
  } = props;

  return isLoading ? (
    <div className="loadingWrap">
      <div
        className={classNames("loadInner", "ballSpinFadeLoad", spinType[type])}
        style={{ backgroundColor: spinColor }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {!hiddenText && (
        <span className="loadingText" style={{ color: textColor }}>
          {loadingText}
        </span>
      )}
    </div>
  ) : null;
}
