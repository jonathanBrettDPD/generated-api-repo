const app = require("@dpdgroupuk/api-engine");
const logger = require("@dpdgroupuk/api-engine/logger");

const { PORT = 8080 } = process.env;

/**
 * Your code goes here
 */

app.listen(PORT, () => {
  logger.info(`PORT: ${PORT}`);
});
