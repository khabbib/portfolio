// const rellaxClass = document.getElementsByClassName("rellax");
// if (window.innerWidth <= 600) {
//   for (let i = 0; i < rellaxClass.length; i++) {
//     if (rellaxClass[i].classList.contains("rellax")) {
//       rellaxClass[i].data - rellax - speed == "1";
//     }
//   }
// }
// let rellaxAn = new Rellax(rellaxClass[0]);
// VanillaTilt.init(document.querySelectorAll(".test-project"), {
//   max: 10,
//   speed: 100,
// });
// VanillaTilt.init(document.querySelectorAll(".pfp"), {
//   max: 15,
//   speed: 100,
// });

const app = document.querySelector("cn-app");
function parallexAnimation() {
  const animation = app.shadowRoot.querySelector("cn-animation");
  const shapes = animation.shadowRoot.querySelectorAll(".shapes");
  if(window.innerHeight > 0){
    for(const shape of shapes){
        shape.style.cssText = "animation: none;";
    }
  }
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].classList.contains("shapes")) {
        //const randomNumberBetwwen20AndMinus20 = Math.floor(Math.random() * 40) - 20;
        // shapes[i].getAttribute('data-rellax-speed') == ;
        let rellax = new Rellax(shapes[i]);
    }
  }


  // let rellax = new Rellax(shapes, {
  //     speed: -10,

  // });
}

parallexAnimation();
