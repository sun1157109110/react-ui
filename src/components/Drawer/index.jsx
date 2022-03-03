import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.css";
import PropTypes from "prop-types";
/**
 * Drawer 抽屉组件
 * @param {isVisible} bool 抽屉是否可见
 * @param {isClosable} bool 是否显示右上角的关闭按钮
 * @param {destroyOnClose} bool 关闭时销毁里面的子元素
 * @param {getContainer} HTMLElement 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom
 * @param {maskClosable} bool 点击蒙层是否允许关闭抽屉
 * @param {isMask} bool 是否展示遮罩
 * @param {drawerStyle} object 用来设置抽屉弹出层样式
 * @param {width} number|string 弹出层宽度
 * @param {zIndex} number 弹出层层级
 * @param {placement} string 抽屉方向
 * @param {onClose} string 点击关闭时的回调
 */

function Drawer(props) {
  let {
    isClosable = true,
    destroyOnClose,
    getContainer = document.body,
    maskClosable = true,
    isMask = true,
    drawerStyle,
    width = "300px",
    zIndex = 10,
    placement = "right",
    onClose,
    children,
  } = props;
  const [isVisible, setIsVisible] = useState(props.isVisible);
  const [isDesChild, setIsDesChild] = useState(false);
  //监听isVisible的变化
  useEffect(() => {
    setIsVisible(() => {
      //当抽屉打开时,让父元素溢出隐藏,不让其滚动,
      if (getContainer !== false && props.isVisible) {
        getContainer.style.overflow = "hidden";
      }
      return props.isVisible;
    });
    setIsDesChild(false);
  }, [props.isVisible, getContainer]);
  const handleClose = () => {
    setIsVisible((prev) => {
      if (getContainer !== false && prev) {
        getContainer.style.overflow = "auto";
      }
    });
    onClose && onClose();
    //关闭时是否要销毁内部组件
    destroyOnClose && setIsDesChild(true);
  };
  const childDom = (
    <div
      className={styles.drawerWrap}
      style={{
        position: getContainer === false ? "absolute" : "fixed",
        width: isVisible ? "100%" : "0px",
        zIndex,
      }}
    >
      {!!isMask && (
        <div
          className={styles.drawerMask}
          onClick={maskClosable ? handleClose : null}
        ></div>
      )}
      <div
        className={styles.drawerContent}
        style={{ width, [placement]: isVisible ? 0 : "-100%", ...drawerStyle }}
      >
        {isDesChild ? null : children}
        {!!isClosable && (
          <span className={styles.closeBtn} onClick={handleClose}>
            X
          </span>
        )}
      </div>
    </div>
  );
  //不传值默认挂在到body下面,false就为最近的父元素,如果传一个dom元素,就挂载到这个dom元素上
  return getContainer === false
    ? childDom
    : ReactDOM.createPortal(childDom, getContainer);
}

Drawer.propTypes = {
  isVisible:PropTypes.bool,
  children:PropTypes.element,
  visible: PropTypes.bool,
  closable: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
  getContainer: PropTypes.element,
  maskClosable: PropTypes.bool,
  mask: PropTypes.bool,
  drawerStyle: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  zIndex: PropTypes.number,
  placement: PropTypes.string,
  onClose: PropTypes.func,
};

export default Drawer;
