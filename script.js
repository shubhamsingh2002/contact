// For Hamburger Menu
const hamburgerIcon = document.querySelector("#hamburger .icon");

hamburgerIcon.addEventListener("click", () => {
  const firstHamTxt = document.querySelector(
    "#hamburger .ham_txt:nth-child(1)"
  );
  const secondHamTxt = document.querySelector(
    "#hamburger .ham_txt:nth-child(2)"
  );
  const HeaderNav = document.querySelector("nav");

  if (secondHamTxt.style.display !== "block") {
    firstHamTxt.style.display = "none";
    secondHamTxt.style.display = "block";
    hamburgerIcon.classList.add("animate_icon");
    HeaderNav.classList.add("showNav");
  } else {
    firstHamTxt.style.display = "block";
    secondHamTxt.style.display = "none";
    hamburgerIcon.classList.remove("animate_icon");
    HeaderNav.classList.remove("showNav");
  }
});

// Dot Canvas Javascript
// Variables
const width = 500;
const height = 500;
count = 19;
const rowsize = 25;
dotsize = 6;
dotmin = 3;
dotsizebase = 6;

// Calc
var canvases = document.querySelectorAll(".CanvasDots");
canvases.forEach((canvas) => {
  var ctx = canvas.getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  mouseOver(canvas, ctx, false);
  canvas.addEventListener("mousemove", function () {
    mouseOver(canvas, ctx, true);
  });
  canvas.addEventListener("mouseleave", function () {
    mouseOver(canvas, ctx, false);
  });
});

function mouseOver(canvas, ctx, cursor) {
  if (cursor) {
    PosX = getPositionX(event);
    PosY = getPositionY(event);
  } else {
    PosX = -100;
    PosY = -100;
  }

  LocX = canvas.getBoundingClientRect().left;
  LocY = canvas.getBoundingClientRect().top;

  GlobalX = PosX - LocX;
  GlobalY = PosY - LocY;

  var ctx = canvas.getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  // The counter is used to calculate the color (fake random) if u want to have multiple canvas grids with a different color order just increase or decrease the value
  $counter = 5.56;
  for ($ix = 4; $ix <= count - 3; $ix++) {
    for ($iy = 4; $iy <= count - 3; $iy++) {
      ctx.beginPath();
      $scaler = Math.hypot(GlobalX / rowsize - $ix, GlobalY / rowsize - $iy);
      dotsize = dotsizebase - $scaler * 1.05;
      if (dotsize < dotmin) {
        dotsize = dotmin;
      }
      ctx.arc(rowsize * $ix, rowsize * $iy, dotsize, 0, 2 * Math.PI);
      $counter = $counter * 1.18;
      $nr = String($counter).charAt(2);
      if ($nr <= 3) {
        ctx.strokeStyle = "#f05c2c";
      } else if ($nr <= 6) {
        ctx.strokeStyle = "#1daeea";
      } else {
        ctx.strokeStyle = "#FFFFFF";
      }

      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

//
function getPositionX(event) {
  CursorX = event.clientX;
  return CursorX;
}

function getPositionY(event) {
  CursorY = event.clientY;
  return CursorY;
}
//popupwindow
(() => {
  let popupWindow = null;
  let previousURL;
  let windowSize = "width=800,height=600,left=0,top=0";
  let windowName = "singleWindow";

  const OpenPopupSingleTab = (url) => {
      if (popupWindow === null || popupWindow.closed) {
          popupWindow = window.open(url, windowName, windowSize);
      } else if (previousURL !== url) {
          popupWindow = window.open(url, windowName, windowSize);
          popupWindow.focus();
      } else {
          // If the URL is already open, focus the window without reloading
          popupWindow.focus();
      }
      previousURL = url;
  };

  const links = document.querySelectorAll("a[target='popupWindow']");
  for (const link of links) {
      link.addEventListener("click", function(event) {
          OpenPopupSingleTab(this.href);
          event.preventDefault();
      }, false);
  }
})();