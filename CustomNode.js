const TaskNode = (props) => {
  const { size = { width: 100, height: 70 }, data } = props;
  const { width, height } = size;
  const {
    label = "Task",
    stroke = "#659FBF",
    fill = "#EFF2FF",
    fontFill,
    fontSize,
  } = data;

  return (
    <div
      className="tasknode-container"
      style={{
        position: "relative",
        
        float: "right",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        background: "#E0FFFF",
        border: "2px solid #659FBF",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.20)",
        width,
        height,
        borderColor: stroke,
        backgroundColor: fill,
        color: fontFill,
        fontSize,
      }}
    >
      <div style={{ color: fontFill }}>{label}</div>
    </div>
  );
};

const StartNode = (props) => {
  const { size = { width: 80, height: 80 }, data } = props;
  const { width, height } = size;
  const {
    label = "Start",
    stroke = "#7EB73F",
    fill = "#fff",
    fontFill,
    fontSize,
  } = data;

  return (
    <div
      className="startnode-container"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",

        background: "#20B2AA",
        border: "2px solid",
        borderRadius: "50%",

        overflow: "hidden",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.20)",

        width,
        height,
        borderColor: stroke,
        backgroundColor: fill,
        color: fontFill,
        fontSize,
      }}
    >
      <div style={{ color: fontFill }}>{label}</div>
    </div>
  );
};

const EndNode = (props) => {
  const { size = { width: 80, height: 80 }, data } = props;
  const { width, height } = size;
  const {
    label = "Start",
    stroke = "#FFD700",
    fill = "#fff",
    fontFill,
    fontSize,
  } = data;

  return (
    <div
      className="startnode-container"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",

        background: "#20B2AA",
        border: "2px solid",
        borderRadius: "50%",

        overflow: "hidden",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.20)",

        width,
        height,
        borderColor: stroke,
        backgroundColor: fill,
        color: fontFill,
        fontSize,
      }}
    >
      <div style={{ color: fontFill }}>{label}</div>
    </div>
  );
};

const UserTaskNode = (props) => {
  const { size = { width: 100, height: 70 }, data } = props;
  const { width, height } = size;
  const {
    label = "UserTask",
    stroke = "#FF0000",
    fill = "#F8F8FF",
    fontFill,
    fontSize,
  } = data;

  return (
    <div
      className="tasknode-container"
      style={{
        position: "relative",
        display: "flex",
        float: "right",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        background: "#E0FFFF",
        border: "2px solid #DC143C",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.20)",
        width,
        height,
        borderColor: stroke,
        backgroundColor: fill,
        color: fontFill,
        fontSize,
      }}
    >
      <div style={{ color: fontFill }}>{label}</div>
    </div>
  );
};

export { TaskNode, StartNode, UserTaskNode, EndNode };
