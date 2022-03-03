import React from "react";
import Select from "../../components/Select/index";
import SelectMenu from "../../components/Select/SelectMenu/index";
export default function SelectTest() {
  return (
    <div>
      <div style={{ background: "red", height: "200px" }}></div>
      <div id="area" style={{ margin: 10, overflow: "scroll", height: 200 }}>
        <div style={{ padding: 100, height: 1000, background: "#eee" }}>
          <h4>滚动的区域</h4>
          <h4>滚动的区域</h4>
          <h4>滚动的区域</h4>
          <h4>滚动的区域</h4>
          <h4>滚动的区域</h4>
          <h4>滚动的区域</h4>
          <h4>滚动的区域</h4>
          <h4>滚动的区域</h4>
          <h4>滚动的区域</h4>
          <Select getContainer={() => document.getElementById("area")}>
            <SelectMenu label="第一" value="1"></SelectMenu>
            <SelectMenu label="第二" value="2"></SelectMenu>
            <SelectMenu label="第三" value="3"></SelectMenu>
            <SelectMenu label="第四" value="4"></SelectMenu>
          </Select>
        </div>
      </div>
      <Select>
        <SelectMenu label="第一" value="1"></SelectMenu>
        <SelectMenu label="第二" value="2"></SelectMenu>
        <SelectMenu label="第三" value="3"></SelectMenu>
        <SelectMenu label="第四" value="4"></SelectMenu>
      </Select>
    </div>
  );
}