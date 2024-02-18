"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jsx-a11y/anchor-is-valid */
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_1 = require("react");
var styles = require("../styles/style.less");
var TableForm = function (_a) {
  var value = _a.value,
    onChange = _a.onChange;
  var _b = (0, react_1.useState)(false),
    clickedCancel = _b[0],
    setClickedCancel = _b[1];
  var _c = (0, react_1.useState)(false),
    loading = _c[0],
    setLoading = _c[1];
  var _d = (0, react_1.useState)(0),
    index = _d[0],
    setIndex = _d[1];
  var _e = (0, react_1.useState)({}),
    cacheOriginData = _e[0],
    setCacheOriginData = _e[1];
  var _f = (0, react_1.useState)(value),
    data = _f[0],
    setData = _f[1];
  var getRowByKey = function (key, newData) {
    var _a;
    return (_a = newData || data) === null || _a === void 0
      ? void 0
      : _a.filter(function (item) {
        return item.key === key;
      })[0];
  };
  var toggleEditable = function (e, key) {
    e.preventDefault();
    var newData =
      data === null || data === void 0
        ? void 0
        : data.map(function (item) {
          return __assign({}, item);
        });
    var target = getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        cacheOriginData[key] = __assign({}, target);
        setCacheOriginData(cacheOriginData);
      }
      target.editable = !target.editable;
      setData(newData);
    }
  };
  var newMember = function () {
    var newData =
      (data === null || data === void 0
        ? void 0
        : data.map(function (item) {
          return __assign({}, item);
        })) || [];
    newData.push({
      key: "NEW_TEMP_ID_".concat(index),
      workId: "",
      name: "",
      department: "",
      editable: true,
      isNew: true,
    });
    setIndex(index + 1);
    setData(newData);
  };
  var remove = function (key) {
    var newData =
      data === null || data === void 0
        ? void 0
        : data.filter(function (item) {
          return item.key !== key;
        });
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };
  var handleFieldChange = function (e, fieldName, key) {
    var newData = __spreadArray([], data, true);
    var target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };
  var saveRow = function (e, key) {
    e.persist();
    setLoading(true);
    setTimeout(function () {
      if (clickedCancel) {
        setClickedCancel(false);
        return;
      }
      var target = getRowByKey(key) || {};
      if (!target.value || !target.name) {
        antd_1.message.error("请填写完整成员信息。");
        e.target.focus();
        setLoading(false);
        return;
      }
      delete target.isNew;
      toggleEditable(e, key);
      if (onChange) {
        onChange(data);
      }
      setLoading(false);
    }, 500);
  };
  var handleKeyPress = function (e, key) {
    if (e.key === "Enter") {
      saveRow(e, key);
    }
  };
  var cancel = function (e, key) {
    setClickedCancel(true);
    e.preventDefault();
    var newData = __spreadArray([], data, true);
    // 编辑前的原始数据
    var cacheData = [];
    cacheData = newData.map(function (item) {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          var originItem = __assign(
            __assign(__assign({}, item), cacheOriginData[key]),
            { editable: false }
          );
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }
      return item;
    });
    setData(cacheData);
    setClickedCancel(false);
  };
  var columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: function (text, record) {
        if (record.editable) {
          return (
            <antd_1.Input
              value={text}
              autoFocus
              onChange={function (e) {
                return handleFieldChange(e, "name", record.key);
              }}
              onKeyPress={function (e) {
                return handleKeyPress(e, record.key);
              }}
              placeholder="Nhập tên dữ liệu"
            />
          );
        }
        return text;
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "20%",
      render: function (text, record) {
        if (record.editable) {
          return (

            <antd_1.Input
              value={text}
              onChange={function (e) {
                return handleFieldChange(e, "value", record.key);
              }}
              onKeyPress={function (e) {
                return handleKeyPress(e, record.key);
              }}
              placeholder="Nhập giá trị"
            />
          );
        }
        return text;
      },
    },
  ];
  return (
    <>
      <antd_1.Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={function (record) {
          return record.editable ? styles.editable : "";
        }}
      />
      <antd_1.Button
        style={{ width: "100%", marginTop: 16, marginBottom: 8 }}
        type="dashed"
        onClick={newMember}
      >
        <icons_1.PlusOutlined />
        Chỉnh sửa dữ liệu
      </antd_1.Button>
    </>
  );
};
export default TableForm;