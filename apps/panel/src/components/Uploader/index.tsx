import type { UploadRequestOption } from "rc-upload/lib/interface";

import React, { useCallback, useEffect, useRef, useState } from "react";
import update from "immutability-helper";
import { PlusOutlined } from "@ant-design/icons";
import { Progress, Tooltip, UploadFile, UploadProps } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RcFile } from "antd/es/upload";
import { Upload } from "./styles";
import { ImageService } from "queries";
import { IImage } from "common";

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
      {file.status === "error" ? (
        errorNode
      ) : (
        <div className="h-[100px]">{originNode}</div>
      )}
    </div>
  );
};

interface Props {
  images?: IImage[];
  onChange: (ids: string[]) => void;
}

const Uploader = ({ images = [], onChange }: Props) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [progress, setProgress] = useState<{ [index: number]: number }>({});

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

  const onUpload = async (options: UploadRequestOption) => {
    const { onSuccess, onError, file, onProgress } = options;
    const index = files.indexOf(file as RcFile);

    const onUploadProgress = (event: any) => {
      const percent = Math.floor((event.loaded / event.total) * 100);
      setProgress({ ...progress, [index]: percent });

      if (percent === 100) {
        setTimeout(() => setProgress({ ...progress, [index]: percent }), 1000);
      }

      onProgress?.({ percent: (event.loaded / event.total) * 100 });
    };

    try {
      const res = await ImageService.upload(file as RcFile, onUploadProgress);
      onSuccess?.(res._id);
    } catch (err: any) {
      onError?.(err);
    }
  };

  useEffect(() => {
    onChange(files.map((file) => file.response));
  }, [files, onChange]);

  useEffect(() => {
    setFiles(
      images.map((img) => ({
        uid: img._id!,
        status: "done",
        type: "image/png",
        percent: 100,
        url: img.url,
        name: img.key,
      }))
    );
  }, [images]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        customRequest={onUpload}
        fileList={files}
        onChange={innerOnChange}
        itemRender={(originNode, file, currFileList) => {
          const index = currFileList.indexOf(file);
          return (
            <>
              <DragableUploadListItem
                originNode={originNode}
                file={file}
                fileList={currFileList}
                moveRow={moveRow}
              />
              {progress[index] > 0 ? (
                <Progress percent={progress[index]} />
              ) : null}
            </>
          );
        }}
      >
        <div>
          <PlusOutlined rev="123" /> <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </DndProvider>
  );
};

export default Uploader;
