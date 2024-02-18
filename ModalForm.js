import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useState } from "react";
import TableForm from "views/examples/component/TableForm";
import Form from "views/examples/component/TableForm.tsx";

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
      id: id,
      properties: properties,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    };
    await fetch("http://localhost:3001/api/nodedata", requestOptions).catch(
      (error) => {
        console.log("create data failed", error);
      }
    ).then;
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Service
      </Button>
      <Modal
        width={700}
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



const ModalForm = (props) => {

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
     
      </Space>
      {contextHolder}
    </>
  );
};
export default ModalForm;