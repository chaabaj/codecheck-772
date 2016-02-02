import R from 'ramda';

export default function filterObj(obj, filterFn) {
  return R.reduce((result, key) => {
    if (R.is(Object, obj[key]) && !R.isNil(obj)) {
      result[key] = filterObj(obj[key]);
    }
    else if (!R.isNil(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {}, R.keys(objs));
}
