const router = require("express").Router();
const { readdirSync } = require('fs-extra');
const path = require('path');
const log = require('./log');
const { performance } = require('perf_hooks');
const compression = require('compression');
const srcPath = path.join(__dirname, "../api/");

router.use(compression());

const apiCache = new Map();

const apiFiles = readdirSync(srcPath).filter(file => file.endsWith(".js"));
apiFiles.forEach(file => {
  const filePath = path.join(srcPath, file);
  const api = require(filePath);
  if (api.config && api.initialize) {
    apiCache.set(api.config.name, api);
  }
});

let n = 0;
apiCache.forEach((api, name) => {
  if (!api.config.category || !api.config.link) return;
  
  const routePath = `/${api.config.category}/${api.config.link}`;
  const methods = api.config.methods || ['GET'];
  
  methods.forEach(method => {
    const handler = async (req, res) => {
      try {
        await api.initialize({ req, res, log });
      } catch (error) {
        console.error(`Error in ${name} API:`, error);
        res.status(500).send("An error occurred");
      }
    };
    
    switch (method.toUpperCase()) {
      case 'GET':
        router.get(routePath, handler);
        break;
      case 'POST':
        router.post(routePath, handler);
        break;
      case 'PUT':
        router.put(routePath, handler);
        break;
      case 'DELETE':
        router.delete(routePath, handler);
        break;
      default:
        router.get(routePath, handler);
    }
  });
  
  if (global.api && global.api instanceof Map) {
    global.api.set(name, api);
  } else {
    console.warn("global.api is not a Map. Skipping setting API in global scope.");
  }
  n++;
  log.main(`Successfully loaded ${name}`);
});

log.main(`Successfully loaded ${n} API${n !== 1 ? 's' : ''}`);

module.exports = router;