const set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

const get = key => {
  try {
    const transactions = localStorage.getItem(key);
    return transactions ? JSON.parse(transactions) : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default {
  set,
  get,
};
