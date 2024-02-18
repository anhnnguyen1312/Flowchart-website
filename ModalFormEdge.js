import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useState } from "react";
import TableForm from "views/examples/component/TableForm";
import Form from "views/examples/component/TableFormEdge.tsx";
import FlowChart from "../FlowChart";

const LocalizedModal = (props) => {
  console.log(props);
  const { id, properties, setProperties } = props;

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const createData = async (id) => {
    const request = {
      id: props.id,
      properties: properties,
    };
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    };
    await fetch("http://localhost:3001/api/edgesdata", requestOptions).catch(
      (error) => {
        console.log("create data failed", error);
      }
    ).then;
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm thuộc tính
      </Button>
      <Modal
        width={1000}
        title="Modal"
        open={open}
        onOk={() => {
          createData(id);
          hideModal();
        }}
        onCancel={hideModal}
        okText="Accept"
        cancelText="Cancel"
        
      >
        <Form id={id} properties={properties} setProperties={setProperties} />
      </Modal>
    </>
  );
};

const LocalizedModal2 = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        User task
      </Button>
      <Modal
        width={600}
        title="Modal"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Accept"
        cancelText="Cancel"
      >
        <TableForm />
      </Modal>
    </>
  );
};

const ModalFormEdge = (props) => {

  const { id, properties, setProperties } = props;

  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to save the changes ?",
      okText: "Accept",

      cancelText: "Cancel",
    });
  };
  return (
    <>
      <Space>
        <LocalizedModal id={id} properties={properties} setProperties={setProperties}/>
        {/* <LocalizedModal2 /> */}
        {/* <Button onClick={confirm}>Confirm</Button> */}
      </Space>
      {contextHolder}
    </>
  );
};
export default ModalFormEdge;
