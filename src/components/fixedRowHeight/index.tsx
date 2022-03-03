import React, { useState, useRef, useEffect } from "react";
import { cx, css } from "@emotion/css";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import { buffer } from "stream/consumers";
interface dataType {
  id: number;
  value: string;
}

function App() {
  const listInfo: any = {
    dataLength: 10000,
    rowHeight: 22,
    visibleHeight: 500,
    startIndex: 0,
    buffer:5
  };

  listInfo.plantHeight = listInfo.dataLength * listInfo.rowHeight;
  listInfo.limit = Math.ceil(listInfo.visibleHeight / listInfo.rowHeight);
  listInfo.endIndex = Math.min(listInfo.startIndex + listInfo.limit+listInfo.buffer,listInfo.dataLength-1);

  const css1 = css({
    width: "500px",
    height: "500px",
    backgroundColor: "#ccc",
    overflow: "auto",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  });
  const [isDisplay, setIsDisplay] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [listInfo1, setListInfo1] = useState(listInfo);
  const scrollContainer = useRef(null);
  const handleClick = () => {
    setIsDisplay(!isDisplay);
  };
  const handleScroll = (e: any) => {
    const { startIndex, rowHeight, limit, dataLength,buffer } = listInfo1;
    if (e.target === scrollContainer.current) {
      const scroll_top = e.target.scrollTop;
      const currentStartIndex = Math.floor(scroll_top / rowHeight);
      if (currentStartIndex !== startIndex) {
        // listInfo.startIndex = Math.floor(scroll_top / rowHeight)
        setListInfo1({
          ...listInfo1,
          startIndex:Math.max(currentStartIndex-buffer,0),
          endIndex: Math.min(currentStartIndex + limit+buffer, dataLength - 1),
        });
        setScrollTop(scroll_top);
        console.log(scrollTop);
      }
    }
  };
  const renderItem = () => {
    const { rowHeight } = listInfo1;
    const data: dataType[] = [];
    for (let id = listInfo1.startIndex; id <= listInfo1.endIndex; id++) {
      console.log("@");

      data.push({
        id,
        value: `这是第${id}条数据`,
      });
    }
    console.log(data.length, "data");
    console.log(listInfo1);

    return data.map((item) => (
      <div
        className="dataItem"
        key={item.id}
        style={{
          position: "absolute",
          top: item.id * rowHeight + "px",
          left: 0,
        }}
      >
        {item.value}
      </div>
    ));
  };
  return (
    <React.Fragment>
      <Button type="primary" onClick={handleClick}>
        点击弹出Modal框
      </Button>
      {isDisplay && (
        <div
          className={cx("vListContainer", css1)}
          ref={scrollContainer}
          onScroll={handleScroll}
        >
          <div
            className="plantContent"
            style={{ height: listInfo.plantHeight, position: "relative" }}
          >
            {renderItem()}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
