// Al ser async funct, recibimos una promesa, asi que podems usar catch en caso de error
module.exports = fn => {
  return (req, res, next) => {
    // This line allows us to get rid of all the catch block in each controller
    fn(req, res, next).catch(next);
  };
};