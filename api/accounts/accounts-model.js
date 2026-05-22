const db = require("../../data/db-config");

const getAll = () => {
  // KODLAR BURAYA
  return db("accounts");
};

const getById = (id) => {
  // KODLAR BURAYA
  return db("accounts").where({ id }).first();
};

const create = (account) => {
  // KODLAR BURAYA
  return db("accounts")
    .insert(account)
    .then((ids) => {
      return getById(ids[0]);
    });
};

const updateById = (id, account) => {
  // KODLAR BURAYA
  return db("accounts")
    .where({ id })
    .update(account)
    .then(() => {
      return getById(id);
    });
};

const deleteById = (id) => {
  // KODLAR BURAYA
  return getById(id).then((account) => {
    return db("accounts")
      .where("id", id)
      .del()
      .then(() => account);
  });
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
