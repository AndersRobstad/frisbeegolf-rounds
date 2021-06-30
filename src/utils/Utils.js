const getReadableDate = (unreadableDate) => {
  const year = unreadableDate.substring(0, 4);
  const month = unreadableDate.substring(5, 7);
  const date = unreadableDate.substring(8, unreadableDate.indexOf("T"));
  let hour =
    parseInt(
      unreadableDate.substring(
        unreadableDate.indexOf("T") + 1,
        unreadableDate.indexOf(":")
      )
    ) + 2;
  hour = hour < 24 ? hour : hour - 24;
  const minute = unreadableDate.substring(
    unreadableDate.indexOf(":") + 1,
    unreadableDate.lastIndexOf(":")
  );

  return `${date}/${month}/${year} ${hour}:${minute}`;
};

export { getReadableDate };
