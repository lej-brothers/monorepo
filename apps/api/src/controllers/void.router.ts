import { Router } from "express";

const router = Router({});

router.get("/", (_, res) => {
  res
    .status(200)
    .send({
      messsage:
        "Wenn du lange genug in den Abgrund starrst, wir der Abgrund in dich zurückstarren.",
    });
});

export default router;
