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

router.get("/", (req, res, next) => {
  getAll()
    .then((acc) => {
      res.status(200).json(acc || []);
    })
    .catch(next);
});

router.get("/:id", checkAccountId, (req, res, next) => {
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    create(req.body)
      .then((acc) => {
        res.status(201).json(acc);
      })
      .catch(next);
  },
);

router.put("/:id", checkAccountId, checkAccountPayload, (req, res, next) => {
  updateById(req.params.id, req.body)
    .then((acc) => {
      res.status(200).json(acc);
    })
    .catch(next);
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  deleteById(req.params.id)
    .then((acc) => {
      res.status(200).json(acc);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
    stack: err.stack,
  });
});

module.exports = router;
