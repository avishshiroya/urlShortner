module.exports = {
  uniqueID: () => {
    const timestamp = Date.now().toString();
    // console.log(timestamp);
    const randomNum = Math.random().toString(36).substring(2, 10);
    // console.log(randomNum);
    const uniueId = timestamp
      .slice(Math.floor(7, Math.random() * 10) + 1)
      .concat(randomNum);
    //   console.log(uniueId);
    //   console.log(uniueId.substring(2, 10));
    return uniueId.substring(2, 10);
  },
};
