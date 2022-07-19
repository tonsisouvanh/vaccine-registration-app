const session = require("../config/db.js");

const getAllVaccines = async () => {
  const result = await session.run(`Match (v:vaccine) return v`);

  return result.records.map((i) => i.get("v").properties);
};

const getRecommendedVaccines = async (user_id) => {
  console.log(user_id);
  // const result = await session.run(`MATCH (va:User {_id : '${user_id}'} ) return u limit 1`)
  // return result.records[0].get('u').properties
};


// const create = async (user) =>{
//     const unique_id = nanoid(8)
//     await session.run(`CREATE (u:User {_id : '${unique_id}', name: '${user.name}', email: '${user.email}', password: '${user.password}'} ) return u`)
//     return await findById(unique_id)
// }
// const findByIdAndUpdate = async (id, user) =>{
//     const result = await session.run(`MATCH (u:User {_id : '${id}'}) SET u.name= '${user.name}', u.email= '${user.email}', u.password= '${user.password}' return u`)
//     return result.records[0].get('u').properties
// }
// const findByIdAndDelete = async (id) =>{
//     await session.run(`MATCH (u:User {_id : '${id}'}) DELETE u`)
//     return await findAll()
// }

module.exports = {
  getAllVaccines,
  getRecommendedVaccines,
};
