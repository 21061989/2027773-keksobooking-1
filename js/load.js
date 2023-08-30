// const loaderData = () =>
fetch('https://28.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((response) => {
    console.log(response.location);
  });

export {};
