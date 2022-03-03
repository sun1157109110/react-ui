import ReactDOM from "react-dom";
import { useEffect } from "react";
import "./index.css";

let instance = null;
export default function Position(props) {
  let { onNotVisibleArea, targetRef, getContainer, children } = props;
  const container = getContainer && getContainer();
  //如果下拉框容器不存在 就创建一个
  if (!instance) {
    instance = document.createElement("div");
    instance.className = "ll-position";
    document.body.appendChild(instance);
  }

  useEffect(() => {
    //更新下拉框位置的方法
    const setInstance = () => {
      //获取input框距离可见窗口的顶部左部距离以及高度
      const { left, top, height } = targetRef.current.getBoundingClientRect();
      //用作下拉框绝对定位的样式
      const style = {
        //下拉框距离文档顶部的距离
        top: document.documentElement.scrollTop + top + height + "px",
        //下拉框距离文档左边的距离
        left: document.documentElement.scrollLeft + left + "px",
      };
      instance.style.top = style.top;
      instance.style.left = style.left;
      return { top, left, height };
    };
    //滚动事件加判断
    const handleScroll = () => {
      let { top, height } = setInstance();
      if (
        //滚动容器距离页面顶端的距离大于输入框到顶部的距离 offsetTop距离最近父容器的距离;
        //实际可用container.getBoundingClientRect().top
        container.offsetTop - top > 0 ||
        top + height - container.offsetTop > container.offsetHeight
      ) {
        onNotVisibleArea();
      }
    };
    instance && setInstance();
    if (container) {
      container.addEventListener("scroll", handleScroll, false);
    }
    //页面卸载后清楚事件绑定
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll, false);
      }
    };
  }, [container, onNotVisibleArea, targetRef]);

  //将选择项添加到instance的最后面,渲染成react元素 之后render
  return instance && ReactDOM.createPortal(children, instance);
}
