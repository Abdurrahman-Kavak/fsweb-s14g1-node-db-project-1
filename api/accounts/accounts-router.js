const router = require("express").Router();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await getAll();
    res.status(200).json(accounts || []);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkAccountId, (req, res, next) => {
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await create(req.body);
      res.status(201).json(newAccount);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const updatedAccount = await updateById(req.params.id, req.body);
      res.status(200).json(updatedAccount);
    } catch (error) {
      next(error);
    }
  },
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await deleteById(req.params.id);
    res.status(200).json(deletedAccount);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
    stack: err.stack,
  });
});

module.exports = router;
