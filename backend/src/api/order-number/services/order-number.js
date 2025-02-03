'use strict';

/**
 * order-number service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::order-number.order-number');
