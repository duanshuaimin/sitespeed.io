'use strict';

const path = require('path'),
  messageMaker = require('../../support/messageMaker'),
  DevtoolsTimelineModel = require('devtools-timeline-model');

const make = messageMaker('chrometimelinemodel').make;

module.exports = {
  name() {
    return path.basename(__filename, '.js');
  },
  open(context) {
    this.storageManager = context.storageManager;
  },
  processMessage(message, queue) {
    switch (message.type) {
      // in the future we can get trace logs from WebPageTest
      case 'browsertime.chrometrace':
      case 'webpagetest.chrometrace':
        {
          const model = new DevtoolsTimelineModel(message.data);
          queue.postMessage(make('chrome.timelinemodel', model, {
            url: message.url,
            group: message.group,
            runIndex: Number(message.name.replace('trace-','').replace('.json',''))
          }));
        }
    }
  }
};
