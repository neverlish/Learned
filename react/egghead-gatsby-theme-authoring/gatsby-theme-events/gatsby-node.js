const fs = require('fs');

// 1 make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'data';

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
}

// 2 define the event type

// 3 define resolvers for any custom fields (slug)

// 4 query for event and create pages