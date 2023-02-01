import requester from "../utils/requester";

const ImageModule = {
  async upload(file: File) {
    const form = new FormData();
    form.set("upload", file);

    const response = await requester.post("/image", form);
    console.log(response);

    return response;
  },
};

export default ImageModule;
