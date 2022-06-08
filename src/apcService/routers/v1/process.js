const express = require('express');

const { defaultStrategy, sharonStrategy, ribeyeStrategy, newyorkStrategy } = require('../../utilities/strategyUtil');

const logger = require('../../../utilities/logger')('APC_SERVICE');

const router = express.Router();

router.post('/api/v1/process', async (req, res) => {
  const { id, type, thickness, moisture } = req.body;

  const handle = logger.begin({
    id,
    type,
    thickness,
    moisture,
  });

  try {
    if (!global.cache) {
      throw new Error('the global cache is not existed');
    }
    const tFactor = global.cache.get('FACTOR_THICKNESS');
    const mFactor = global.cache.get('FACTOR_MOISTURE');

    let data = null;
    if (type === 'SHARON') {
      data = sharonStrategy(thickness, tFactor);
    } else if (type === 'RIB_EYE'){
      data = ribeyeStrategy(thickness, tFactor);
    } else if (type === 'NEW_YORK'){
      data = newyorkStrategy(thickness, tFactor);
    } else {
      data = defaultStrategy(moisture, mFactor);
    }

    logger.end(handle, { tFactor, mFactor, ...data }, `process (${id}) of APC has completed`);

    return res.status(200).send({ ok: true, data: { ...data, tFactor, mFactor } });
  } catch (err) {
    logger.fail(handle, { tFactor, mFactor }, err.message);

    return res.status(500).send({ ok: false, message: err.message });
  }
});

router.get('/', async (req, res) => {
    // for Ingress discover
    return res.status(200).send({ ok: true});

  }
);

module.exports = router;
