import logger from 'loglevel';

if (PRODUCTION) {
  logger.setLevel(logger.levels.SILENT);
} else {
  logger.setLevel(logger.levels.DEBUG);
}

export default logger;
