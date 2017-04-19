var config = {
  expressPort: 3000,
  client: {
    mongodb: {
      defaultDatabase: "articlesdb",
      defaultCollection: "articles",
      defaultUri: "mongodb://localhost:27017/" //TODO add user and password
    },
  },
};

module.exports = config;