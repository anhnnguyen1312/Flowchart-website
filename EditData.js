import React, { useState, useEffect, memo } from "react";
import { Link, parsePath } from "react-router-dom";
import { Flowchart } from "@ant-design/flowchart";
import {
  TaskNode,
  UserTaskNode,
  StartNode,
  EndNode
} from "views/examples/component/CustomNode";
import {
  formSchemaService,
  controlMapService,
} from "views/examples/component/NodeComponent";

import { Card, CardHeader, Container, Row } from "reactstrap";
import ChartsHeader from "components/Headers/ChartsHeader.js";
import { Button, Space, Table, Drawer } from 'antd';
import {
  ArrowRightOutlined,
} from '@ant-design/icons';
// import { useParams } from 'react-router-dom'
// import { ParamHTMLAttributes } from "react";
// import { ParamKeyValuePair } from "react-router-dom";
// import { ParamParseKey } from "react-router-dom";
import { matchPath, useNavigate, useLocation } from 'react-router-dom'

const createLink = (src) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.className = "dynamic-link";
  link.href = src;
  document.getElementsByTagName("head")[0].appendChild(link);
};
createLink("https://unpkg.com/antd@4.24.3/dist/antd.css");
createLink("https://unpkg.com/@ant-design/flowchart@1.2.1/dist/index.css");

export default function Edit(info,chuoi) {
    let editdata = []
    if (info !== null) {
        for (let i=0; i<info.data.length; i++) {
          if (info.data[i].flowchartId === chuoi[4])
            editdata.push(info.data[i])
        }
    }
    console.log('47',editdata)
    return editdata;
}