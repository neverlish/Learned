const fs = require('fs');

// 1 make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'data';

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
}

// 2 define the event type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  `);
}

// 3 define resolvers for any custom fields (slug)
exports.createResolvers = ({ createResolvers }, options) => {
  const basePath = options.basePath || '/';

  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
  }

  createResolvers({
    Event: {
      slug: {
        resolve: source => slugify(source.name)
      }
    }
  });
}

// 4 query for event and create pages
exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || '/';
  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/events.js')
  });

  const result = await graphql(`
    query {
      allEvent(sort: { fields: startDate, order: ASC }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('error loading events', reporter.errors);
    return;
  }

  const events = result.data.allEvent.nodes;

  events.forEach(event => {
    const slug = event.slug;

    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/event.js'),
      context: {
        eventID: event.id
      }
    });
  });
}