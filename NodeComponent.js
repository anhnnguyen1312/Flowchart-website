import {
  FormWrapper,
  EdgeService,
  GroupService,
  CanvasService,
  EditorPanels,
} from "@ant-design/flowchart";

import React, { useState, useEffect } from "react";

import { Select } from 'antd';





import { Button, Divider, Input, Popconfirm, Table, message } from "antd";
import ModalForm from "./ModalForm.js";
import Show from "./Show.js";
import UserModal from "./UserModal.js";


import ModalFormEdge from "./ModalFormEdge.js";
import ShowEdge from "./ShowEdge.js";
import { Label } from "reactstrap";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const PREFIX = "flowchart-editor";
const { InputFiled } = EditorPanels;

const TaskComponent = (props) => {
  const { config, plugin = {} } = props;
  const { updateNode } = plugin;
  const [nodeConfig, setNodeConfig] = useState({
    ...config,
  });
  const [properties, setProperties] = useState([])
  const onNodeConfigChange = (key, value) => {
    setNodeConfig({
      ...nodeConfig,
      [key]: value,
    });
    updateNode({
      [key]: value,
    });
  };
  useEffect(() => {
    setNodeConfig({
      ...config,
    });
  }, [config]);

  const fetchNodeData = async (id) => {
    await fetch(`http://localhost:8080/api/nodedata/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success === undefined) {
        setProperties(data.properties)
      } 
    })
    .catch(() => setProperties({}));
  }

  console.log("node:", properties)

  useEffect(() => {
    fetchNodeData(config.id);
  }, [])
  return (
    <div className={`${PREFIX}-panel-body`}>
      <div className={`${PREFIX}-panel-group`} style={{ borderBottom: "none" }}>
      <p>Edit</p>
      <Label>Name</Label>
        <InputFiled
          label={nodeConfig.name === 'custom-node-image' ? '图片地址' : 'Name'}
          value={nodeConfig.label}
          onChange={(value) => {
            onNodeConfigChange('label', value);
          }}
        />


        <Show id={config.id} properties={properties} setProperties={setProperties}/>
        <Select
    defaultValue="Choose Service"
    style={{
      width: 175,
    }}
    onChange={handleChange}
    
    options={[ 
      
       
        {
         
          label: 'Service task 1',
          
          
        },
        {
          label: 'Service task 2',
          
        },
      
      
    ]}
  />

        {/* <h6>Select option</h6> */}

        <ModalForm id={config.id} properties={properties} setProperties={setProperties} />

        <div
          className={`${PREFIX}-panel-group`}
          style={{ borderBottom: "none" }}
        ></div>
      </div>
    </div>
  );
};

//////////////////////////////////////////////////
const CircleComponent = (props) => {
  const { config, plugin = {} } = props;
  const { updateNode } = plugin;
  const [nodeConfig, setNodeConfig] = useState({
    ...config,
  });
  const onNodeConfigChange = (key, value) => {
    setNodeConfig({
      ...nodeConfig,
      [key]: value,
    });
    updateNode({
      [key]: value,
    });
  };
  useEffect(() => {
    setNodeConfig({
      ...config,
    });
  }, [config]);
  return (
    <div className={`${PREFIX}-panel-body`}>
      <div className={`${PREFIX}-panel-group`}>
        <h5>Try</h5>
        <InputFiled
          label={nodeConfig.name === "custom-node-image" ? "图片地址" : "Edit"}
          value={nodeConfig.label}
          onChange={(value) => {
            onNodeConfigChange("label", value);
          }}
        />
      </div>
      {/* <div className={`${PREFIX}-panel-group`} style={{ borderBottom: "none" }}>
        <h5>Try</h5> */}
      {/* <input
          class="favorite styled"
          type="button"
          value="Add attribute"
        ></input> */}
      {/* <div className={`${PREFIX}-node-text-style`}>
            <InputNumberFiled
              label="字号"
value={nodeConfig.fontSize}
              width={68}
              onChange={(value) => {
                onNodeConfigChange('fontSize', value);
              }}
            />
            <ColorPicker
              value={nodeConfig.fontFill}
              onChange={(value) => {
                onNodeConfigChange('fontFill', value);
              }}
            />
          </div> */}
      {/* </div> */}
    </div>
  );
};
//////////////////////////////////
const UserTaskComponent = (props) => {
  const { config, plugin = {} } = props;
  const { updateNode } = plugin;
  const [nodeConfig, setNodeConfig] = useState({
    ...config,
  });
  const [properties, setProperties] = useState([])
  const onNodeConfigChange = (key, value) => {
    setNodeConfig({
      ...nodeConfig,
      [key]: value,
    });
    updateNode({
      [key]: value,
    });
  };
  useEffect(() => {
    setNodeConfig({
      ...config,
    });
  }, [config]);

  const fetchNodeData = async (id) => {
    await fetch(`http://localhost:8080/api/nodedata/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success === undefined) {
        setProperties(data.properties)
      } 
    })
    .catch(() => setProperties({}));
  }

  console.log("node:", properties)

  useEffect(() => {
    fetchNodeData(config.id);
  }, [])
  return (
    <div className={`${PREFIX}-panel-body`}>
      <div className={`${PREFIX}-panel-group`} style={{ borderBottom: "none" }}>
      <h5>Edit</h5>
        <InputFiled
          label={nodeConfig.name === 'custom-node-image' ? '图片地址' : 'Name'}
          value={nodeConfig.label}
          onChange={(value) => {
            onNodeConfigChange('label', value);
          }}
        />
        

        <Show id={config.id} properties={properties} setProperties={setProperties}/>

        <h5>Select option</h5>

        <UserModal id={config.id} properties={properties} setProperties={setProperties} />

        <div
          className={`${PREFIX}-panel-group`}
          style={{ borderBottom: "none" }}
        ></div>
      </div>
    </div>
  );
};

////////////////////////////////////////
const NodeService1 = (props) => {
  return (
    <FormWrapper {...props}>
      {(config, plugin) => (
        <TaskComponent {...props} plugin={plugin} config={config} />
      )}
    </FormWrapper>
  );
};
//////////////////////
const NodeService2 = (props) => {
  return (
    <FormWrapper {...props}>
      {(config, plugin) => (
        <CircleComponent {...props} plugin={plugin} config={config} />
      )}
    </FormWrapper>
  );
};
///////////////////////
const NodeService3 = (props) => {
  return (
    <FormWrapper {...props}>
      {(config, plugin) => (
        <UserTaskComponent {...props} plugin={plugin} config={config} />
      )}
    </FormWrapper>
  );
};



let Props = {};
const EdgeComponent1 = (props) => {
  const { config, plugin = {} } = props;
  const { updateEdge } = plugin;
  const [edgeConfig, setEdgeConfig] = useState({
    ...config,
  });
  console.log("EdgeId: ", Props)
  const [properties, setProperties] = useState([])
  const onEdgeConfigChange = (key, value) => {
    setEdgeConfig({
      ...edgeConfig,
      [key]: value,
    });
    updateEdge({
      [key]: value,
    });
  };
  useEffect(() => {
    setEdgeConfig({
      ...config,
    });
  }, [config]);
  const fetchEdgeData = async (id) => {
    await fetch(`http://localhost:8080/api/edgesdata/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success === undefined) {
          setProperties(data.properties)
        }
      })
      .catch(() => setProperties({}));
      
  }
  
  useEffect(() => {
    fetchEdgeData(config.id);
  }, [])

  return (
    <div className={`${PREFIX}-panel-body`}>
      <div className={`${PREFIX}-panel-group`}>

        <InputFiled
          label={edgeConfig.name === 'custom-edge-image' ? '图片地址' : 'Tên'}
          value={edgeConfig.label}
          onChange={(value) => {
            onEdgeConfigChange('label', value);
          }}
        />
      </div>
      <div className={`${PREFIX}-panel-group`} style={{ borderBottom: 'none' }}>
        {/* <ColorPicker
          label="Stroke"
          value={edgeConfig.stroke}
          onChange={(value) => {
            onEdgeConfigChange('stroke', value);
          }}
        />
        <div className={`${PREFIX}-node-text-style`}>
          <InputNumberFiled
            label="字号"
            value={edgeConfig.fontSize}
            width={68}
            onChange={(value) => {
              onEdgeConfigChange('fontSize', value);
            }}
          />
          <ColorPicker
            value={edgeConfig.fontFill}
            onChange={(value) => {
              onEdgeConfigChange('fontFill', value);
            }}
          />
        </div> */}
        <ShowEdge id={config.id} properties={properties} setProperties={setProperties} />

        <ModalFormEdge id={config.id} properties={properties} setProperties={setProperties} />
      </div>
    </div>
  );
};

const EdgeService1 = (props) => {
  return (
    <FormWrapper {...props}>
      {(config, plugin) => {
        console.log("config", Props)
        return (
          <EdgeComponent1 {...props} plugin={plugin} config={Props} />
        )
      }}
    </FormWrapper>
  );
};
////////////////////////
export const controlMapService = (controlMap) => {
  controlMap.set("custom-1-service", NodeService1);
  controlMap.set("custom-2-service", NodeService2);
  controlMap.set("custom-3-service", NodeService3);
  controlMap.set("custom-edge-service", EdgeService1);
  controlMap.set("custom-group-service", GroupService);
  controlMap.set("custom-canvas-service", CanvasService);
  return controlMap;
};

const formSchemaService = async (args) => {
  const { targetType } = args;
  const { targetData } = args;
  console.log(args);
  const isGroup = args.targetData?.isGroup;
  const groupSchema = {
    tabs: [
      {
        name: "Properties",
        groups: [
          {
            name: "groupName",
            controls: [
              {
                label: "分组名",
                name: "custom-group-service",
                shape: "custom-group-service",
placeholder: "分组名称",
              },
            ],
          },
        ],
      },
    ],
  };
  const nodeSchema1 = {
    tabs: [
      {
        name: "Task",
        groups: [
          {
            name: "groupName",
            controls: [
              {
                label: "节点名",
                name: "Rectangle_Custom",
                shape: "custom-1-service",
                placeholder: "节点名称",
              },
            ],
          },
        ],
      },
    ],
  };

  const nodeSchema2 = {
    tabs: [
      {
        name: "Start",
        groups: [
          {
            name: "groupName",
            controls: [
              {
                label: "节点名",
                name: "Circle_custom",
                shape: "custom-2-service",
                placeholder: "节点名称",
              },
            ],
          },
        ],
      },
    ],
  };

  const nodeSchema3 = {
    tabs: [
      {
        name: "UserTask",
        groups: [
          {
            name: "groupName",
            controls: [
              {
                label: "节点名",
                name: "Polygon_custom",
                shape: "custom-3-service",
                placeholder: "节点名称",
              },
            ],
          },
        ],
      },
    ],
  };

  const edgeSchema1 = {
    tabs: [
      {
        name: "Properties",
        groups: [
          {
            name: "groupName",
            controls: [
              {
                label: "边",
                name: "custom-edge-service",
                shape: "custom-edge-service",
                placeholder: "边名称",
              },
            ],
          },
        ],
      },
    ],
  };
  if (isGroup) {
    return groupSchema;
  }
  if (targetData !== null && targetData.name === "Task") {
    return nodeSchema1;
  }
  if (targetData !== null && targetData.name === "Start") {
    return nodeSchema2;
  }
  if (targetData !== null && targetData.name === "UserTask") {
    return nodeSchema3;
  }
  // if (targetType === 'node') {
  //   return nodeSchema;
  // }
  if (targetType === 'edge') {
    Props = targetData;
    return edgeSchema1;
  }
  return {
    tabs: [
      {
        name: "Luu do action flow",
        groups: [
          {
            name: "groupName",
            controls: [
              {
                label: "",
                name: "custom-canvas-service",
                shape: "custom-canvas-service",
              },
            ],
          },
        ],
      },
    ],
  };
};

export {
  TaskComponent,
  CircleComponent,
  UserTaskComponent,
  NodeService1,
  NodeService2,
  NodeService3,
  formSchemaService,
};