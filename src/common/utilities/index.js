export const formatDate = inputDate => {
  let date = new Date(inputDate);
  return `${appendZero(date.getDate())}/${appendZero(
    date.getMonth()
  )}/${date.getFullYear()} ${appendZero(date.getHours())}:${appendZero(
    date.getMinutes()
  )}:${appendZero(date.getSeconds())}`;
};

export const appendZero = number => {
  return number > 9 ? number : `0${number}`;
};

export const mockResponse = response => {
  return response.map(item => {
    if (!item.hashtags) {
      item.hashtags = ["upskill", "greatpeople", "transformation"];
    }
    if (!item.caption) {
      item.caption = "No caption added";
    }

    if (!item.comments) {
      item.comments = [];
    }
    if (!item.likes) {
      item.likes = Math.floor(Math.random() * 10);
    }

    return item;
  });
};
