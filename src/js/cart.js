document.addEventListener("DOMContentLoaded", function () {
  const jsQuantityMinus = document.querySelectorAll(".js-quantity__minus");
  const jsQuantityCount = document.querySelectorAll(".js-quantity__count");
  const jsQuantityPlus = document.querySelectorAll(".js-quantity__plus");

  jsQuantityPlus.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      let count = parseInt(jsQuantityCount[index].textContent);
      count++;
      jsQuantityCount[index].textContent = count;
    });
  });

  jsQuantityMinus.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      let count = parseInt(jsQuantityCount[index].textContent);
      if (count > 0) {
        count--;
        jsQuantityCount[index].textContent = count;
      }
    });
  });
});
