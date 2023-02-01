import React, { useCallback, useRef, useState } from "react";
import update from "immutability-helper";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Tooltip, UploadFile, UploadProps } from "antd";
import { Upload } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageModule from "../../modules/image";

const type = "DragableUploadList";

interface DragableUploadListItemProps {
  originNode: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  file: UploadFile;
  fileList: UploadFile[];
  moveRow: (dragIndex: any, hoverIndex: any) => void;
}

const DragableUploadListItem = ({
  originNode,
  moveRow,
  file,
  fileList,
}: DragableUploadListItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const index = fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const errorNode = (
    <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>
  );
  return (
    <div
      ref={ref}
      className={`ant-upload-draggable-list-item ${
        isOver ? dropClassName : ""
      }`}
      style={{ cursor: "move" }}
    >
      {file.status === "error" ? errorNode : originNode}
    </div>
  );
};

interface Props {
  onChange: (ids: string[]) => void;
}

const Uploader = ({ onChange }: Props) => {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = files[dragIndex];
      setFiles(
        update(files, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [files]
  );

  const innerOnChange: UploadProps["onChange"] = ({ fileList: files }) => {
    setFiles(files);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Upload
        action={async (file) => {
          const res = await ImageModule.upload(file);
          console.log(res);
          return "";
        }}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        fileList={files}
        onChange={innerOnChange}
        itemRender={(originNode, file, currFileList) => (
          <DragableUploadListItem
            originNode={originNode}
            file={file}
            fileList={currFileList}
            moveRow={moveRow}
          />
        )}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </DndProvider>
  );
};

export default Uploader;
