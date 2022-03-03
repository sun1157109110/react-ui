import React from 'react';
import styles from './index.module.css';
import PropTypes from 'prop-types'
// 通过进度控制进度条长度
// 进度条总长度可以由用户来控制
// 随时修改精度条的额颜色
// 当进度为100%时进度条可以自动消失(可能的需求)
// 进度提示文本(用户想知道当前长度下的具体进度, 比如体温计)
// 对于不同的进度节点,需要有不同的进度条颜色(比如游戏人物里的血, 快没血的时候为红色, 血满的时候为蓝色)


/**
 * 进度条组件
 * @param {barColor} string 进度条的颜色
 * @param {percent} number 进度值百分比
 * @param {isAutoDisappear} boolean 是否进度到100%时自动消失
 * @param {isHiddenText} boolean 是否影藏进度条文本
 * @param {width} string|number 进度条的宽度
 * @param {textColor} string 进度文本颜色
 * @param {statusColor} array 状态阈值,分别设置不同进度范围的进度条颜色,最大允许设置3个值, 为一个二维数组
 */


export default function Progress(props) {
    const checkStatuesColor = (scope,val,defaultColor)=>{
        //升序排序
        statusColor.sort((a,b)=>a[0]-b[0]);
        if(scope.length === 1) {
            return val < scope[0][0] ? scope[0][1] : defaultColor
          }else if(scope.length === 2) {
            return val < scope[0][0] ? scope[0][1]
              : scope[0][0] < val && val < scope[1][0] ? scope[1][1]
                : defaultColor
          }else if(scope.length === 3) {
            return val < scope[0][0] ? scope[0][1]
              : scope[0][0] < val && val < scope[1][0] ? scope[1][1]
                : scope[1][0] < val && val < scope[2][0] ? scope[2][1]
                  : defaultColor
          }
        
    }
    let {width = 800,
        percent =0,
        barColor = '#666',
        isAutoDisappear = false,
        isHiddenText = false,//是否隐藏进度条文本
        textColor = '#ccc',
        statusColor = [[30,'yellow'],[60,'blue'],[90,'red']]
        } = props
    return  percent ===100&&isAutoDisappear?null:
        <div>
            <div className={styles.progressWrap}>
                {/* 进度条总长度可以由用户来控制 */}
                <div className={styles.progressBar} style={{width:typeof width==='number'?width+'px':width}}>
                    <div className={styles.progressInnerBar} style={{backgroundColor:statusColor&&statusColor.length>0?checkStatuesColor(statusColor,percent,barColor):barColor,width:`${percent}%`}}></div>
                </div>
                {!isHiddenText&&<div className={styles.progressText} style={{color:textColor}}>{percent+'%'}</div>}
            </div>
        </div>
};
Progress.propTypes = {
  barColor:PropTypes.string,
  themeColor: PropTypes.string,
  percent: PropTypes.number,
  autoHidden: PropTypes.bool,
  textAlign: PropTypes.string,
  hiddenText: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  statusScope: PropTypes.array
}

