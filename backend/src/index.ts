const fastify = require('fastify')({ logger: true });
const sqlite3 = require('better-sqlite3');
const path = require('path');
const cors = require('fastify-cors');

//SQLite database connection with correct path handling
const dbPath = path.resolve('../backend/db/winedrops.db');
const db = new sqlite3(dbPath);



fastify.register(cors, {
  origin: '*', // Allow all origins
});

// Define INITIALIZER ROUTE

fastify.get('/', async (request, reply) => {
  return { message: 'Hello World' };
});


// API route to fetch best-selling wines with sorting and searching
fastify.get('/wines', async (request, reply) => {
  const { sort = 'revenue', search = '' } = request.query;

  // SQL query to fetch wine data based on search and sorting
  let query = `
    SELECT 
      mw.name AS name,
      mw.vintage AS vintage,
      SUM(co.total_amount) AS revenue,
      SUM(co.quantity) AS bottlesSold,
      COUNT(co.id) AS ordersCount
    FROM master_wine mw
    JOIN wine_product wp ON mw.id = wp.master_wine_id
    JOIN customer_order co ON wp.id = co.wine_product_id
    WHERE (co.status = 'paid' OR co.status = 'dispatched')
    AND (mw.name LIKE '%' || ? || '%' OR mw.vintage LIKE '%' || ? || '%')
    GROUP BY mw.name, mw.vintage
  `;

  // Sorting logic
  if (sort === 'revenue') {
    query += ' ORDER BY revenue DESC';
  } else if (sort === 'bottlesSold') {
    query += ' ORDER BY bottlesSold DESC';
  } else if (sort === 'ordersCount') {
    query += ' ORDER BY ordersCount DESC';
  }

  // Execute the query with search parameters for both name and vintage
  try {
    const wines = db.prepare(query).all(search, search);
    reply.send(wines);
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({ error: 'Database query failed' });
  }
});

// Start the Fastify server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
