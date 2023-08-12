const camelize = require('camelize');
const connection = require('./connection');

const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const saveWaypoints = async (waypoints, travelId) => {
    let insertPromises = [];
  
    if (waypoints && waypoints.length > 0) {
      insertPromises = waypoints.map(({ address, stopOrder }) => {
        const waypoint = { address, stopOrder, travelId };
  
        const columns = getFormattedColumnNames(waypoint);
        const placeholders = getFormattedPlaceholders(waypoint);
        const query = `INSERT INTO waypoints (${columns}) VALUES (${placeholders});`;
  
        return connection.execute(query, [...Object.values(waypoint)]);
      });
  
      await Promise.all(insertPromises);
    }
  };

  const groupWaypoints = (travels) => {
    const waypoints = [];
    travels.forEach(({ address, stopOrder }) => {
      if (address && stopOrder) waypoints.push({ address, stopOrder });
    });
    
    const [{ address, stopOrder, ...travelFields }] = travels;
    const travel = { ...travelFields, waypoints };
    return travel;
  };

const insert = async (travel) => {
  const { waypoints, ...travelData } = travel;
  const columns = getFormattedColumnNames(travelData);
  const placeholders = getFormattedPlaceholders(travelData);
  const query = `INSERT INTO travels (${columns}) VALUE (${placeholders});`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(travelData)]);
  await saveWaypoints(waypoints, insertId);

  return insertId;
};

const findById = async (travelId) => {
    const [travels] = await connection.execute(`SELECT
      TR.id,
      TR.driver_id,
      TR.starting_address,
      TR.ending_address,
      TR.request_date,
      TR.travel_status_id,
      TS.status,
      WP.address,
      WP.stop_order
    FROM travels AS TR INNER JOIN travel_status AS TS 
      ON TR.travel_status_id = TS.id
    LEFT JOIN waypoints AS WP 
      ON WP.travel_id = TR.id
    WHERE TR.id = ?;`, [travelId]);

    if (travels.length === 0) return undefined;
  
    return groupWaypoints(camelize(travels));
  };

const openTravels = async () => {
  const [travelsFromDB] = await connection.execute(
    `SELECT
      TR.id,
      TR.driver_id,
      TR.starting_address,
      TR.ending_address,
      TR.request_date,
      COUNT(WP.stop_order) AS amount_stop
    FROM travels AS TR LEFT JOIN waypoints AS WP 
      ON WP.travel_id = TR.id
    WHERE TR.travel_status_id = 1
    GROUP BY TR.id;`,
  );
  return camelize(travelsFromDB);
};

const update = async (travelStatusId, driverId, travelId) => {
  await connection.execute(
    'UPDATE travels SET travel_status_id = ?, driver_id = ? WHERE id = ?',
    [travelStatusId, driverId, travelId],
  );
};

module.exports = {
    insert,
    findById,
    openTravels,
    update,
};