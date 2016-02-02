
export default function(validator) {
  return (req, res, next) => {
    const result = validator.check(req.body);

    if (result._error) {
      return res.send(400, result);
    }
    next();
  };
}
