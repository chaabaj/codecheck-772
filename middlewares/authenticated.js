
export default function() {
  return (req, res, next) => {
    if (!req.session) {
      return res.send(401, {
        msg : "Not logged";
      });
    }
    next();
  };
}
