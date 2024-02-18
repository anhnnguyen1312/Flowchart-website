import React, { useState, useEffect } from "react";
// react component that copies the given text inside your clipboard

import styles from 'views/examples/styles/styles.less';
import { Table } from "antd";

const createLink = (src) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.className = "dynamic-link";
  link.href = src;
  document.getElementsByTagName("head")[0].appendChild(link);
};
createLink("https://unpkg.com/antd@4.24.3/dist/antd.css");
createLink("https://unpkg.com/@ant-design/flowchart@1.2.1/dist/index.css");

const Show = (props) => {

  const { properties } = props;

  const column = [
    {
      title: <b className={styles.table_column}>Name</b>,
      dataIndex: "chartName",
      render: (_, record) => {
        return (
          <p className={styles.p_title}>
            {record.name}
          </p>
        );
      },
    },

    {
      title: <b className={styles.table_column}>Property</b>,
      dataIndex: "chartProperty",
      render: (_, record) => {
        return (
          <p className={styles.p_title}>
            {record.property}
          </p>
        );
      },
    },
  ];

  return (
    <>
      {(
        <div>
          <Table
            scroll={{ x: 275 }}
            className={styles.table}
            rowClassName={styles.tableRow}
            columns={column}
            dataSource={properties}
          />
        </div>
      )}
    </>
  );
};

export default Show;