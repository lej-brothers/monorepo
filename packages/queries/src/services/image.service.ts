import requester from "../configs/requester";

const ImageModule = {
  async upload(file: File, onUploadProgress: (event: any) => void) {
    const form = new FormData();
    form.set("upload", file);

    const response = await requester.post("/image", form, {
      onUploadProgress,
    });

    return response.data;
  },
};

export default ImageModule;
