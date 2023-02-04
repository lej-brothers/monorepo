import { Request, Response } from "express";
import ImageService from "../../services/image.service";

const controller = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).send({ error: "cannot read file" });
  const image = await ImageService.upload(req.file);
  if (!image)
    return res.send(400).send({ error: "Cannot Upload Destinated File" });
  const url = ImageService.get(image.key);

  res.send({
    ...image,
    name: image.key,
    status: 'done',
    thumbUrl: url,
    url,
  });
};

export default { controller };
