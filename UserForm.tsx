/* eslint-disable jsx-a11y/anchor-is-valid */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Select, Table, message } from 'antd';
import type { FC } from 'react';
import React, { useState } from 'react';

import styles from '../styles/style.less';

type TableFormDateType = {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
};
type TableFormProps = {
  value?: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
  id?: string;
  properties?: [];
  setProperties?: (value: any[]) => void;
};






const UserForm: FC<TableFormProps> = ({ value, onChange, id, properties, setProperties }) => {
  const [clickedCancel, setClickedCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [cacheOriginData, setCacheOriginData] = useState({});
  const [data, setData] = useState(value);

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || properties)?.filter((item) => item.key === key)[0];

  const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const newProperties = properties?.map((item) => ({ ...item }));
    const target = getRowByKey(key, newProperties);
    if (target) {
      
      if (!target.editable) {
        cacheOriginData[key] = { ...target };
        setCacheOriginData(cacheOriginData);
      }
      target.editable = !target.editable;
      setProperties(newProperties);
    }
  };
  console.log("properties", properties)
  const newMember = () => {
    const newProperties = properties?.map((item) => ({ ...item })) || [];

    newProperties.push({
      key: `NEW_TEMP_ID_${index}`,
      value: '',
      name: '',
      type: '',
      property: '',
      editable: true,
      isNew: true,
    });

    setIndex(index + 1);
    setProperties(newProperties);
  };

  const remove = (key: string) => {
    const newProperties = properties?.filter((item) => item !== key) as TableFormDateType[];
    setProperties(newProperties);
    if (onChange) {
      onChange(newProperties);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newProperties = [...(properties as TableFormDateType[])];
    const target = getRowByKey(key, newProperties);
    if (target) {
      target[fieldName] = e.target.value;
      setProperties(newProperties);
    }
  };

  const handleSelectChange = (
    value: string,
    fieldName: string,
    key: string,
  ) => {
    const newProperties = [...(properties as TableFormDateType[])];
    const target = getRowByKey(key, newProperties);
    if (target) {
      target[fieldName] = value;
      setProperties(newProperties);
    }
  };

  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
e.persist();
    setLoading(true);
    setTimeout(() => {
      if (clickedCancel) {
        setClickedCancel(false);
        return;
      }
      const target = getRowByKey(key) || ({} as any);
      if (!target.value || !target.name || !target.property) {
        message.error('Save failed');
        (e.target as HTMLInputElement).focus();
        setLoading(false);
        return;
      }
      delete target.isNew;
      toggleEditable(e, key);
      if (onChange) {
        onChange(properties as TableFormDateType[]);
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  const cancel = (e: React.MouseEvent, key: string) => {
    setClickedCancel(true);
    e.preventDefault();
    const newProperties = [...(data as TableFormDateType[])];
    // 编辑前的原始数据
    let cacheData = [];
    cacheData = newProperties.map((item) => {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...cacheOriginData[key],
            editable: false,
          };
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }
      return item;
    });
    setProperties(cacheData);
    setClickedCancel(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'name', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="Nhập tên dữ liệu"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '13%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'value', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="Nhập giá trị"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              
              onChange={(e) => handleFieldChange(e, 'type', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="Nhập loại"
            />
          );
        }
        return text;
      },
    },
{
      title: 'Property',
      dataIndex: 'property',
      key: 'property',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Select defaultValue={""} allowClear 
            onChange={(value) => handleSelectChange(value, 'property', record.key)}
              options={[
              {
                value:"",
                label:"Choose property"
              },
              {
                value: "Boolean",
                label: "Boolean"
              },
              {
                value:"String",
                label:"String"
              },
              {
                value: "Number",
                label: "Number"
              }
            ]} />
          );
        }
        return text;
      },
    },
   
  ];

  return (
    <>
      <Table<TableFormDateType>
        loading={loading}
        columns={columns}
        dataSource={properties}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
     <Button
        style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
        type="dashed"
        onClick={newMember}
      >
        <PlusOutlined />
        Thêm dữ liệu
      </Button>
    </>
  );
};

export default UserForm;