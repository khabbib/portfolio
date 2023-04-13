function checkScroll() {
  const app = document.querySelector("cn-app");
  const { btnWraper, btn } = getSpecialButton(app);
  document.addEventListener("scroll", () => {
    

    if (window.pageYOffset > 100) {
      if (!btnWraper.classList.contains("transferBtn")) {
        btnWraper.classList.add("transferBtn");
        setTimeout(() => {
          btnWraper.style.cssText = "left: 28%;";
        }, 1000);
        btn.style.cssText = "border-radius: 50px";
      }
    } else if (window.pageYOffset <= 100) {
      if (btnWraper.classList.contains("transferBtn")) {
        btnWraper.classList.remove("transferBtn");
        btn.style.cssText = "border-radius: 5px;";
      }
    }
  });
}

checkScroll();

/**
 *
 * @param {Element} app
 */
function getWorkSection(app) {
  const overview = app.shadowRoot.querySelector("cn-overview");
  const works = overview.shadowRoot.querySelector("cn-works");
  const workSection = works.shadowRoot.getElementById("works");
  return workSection;
}

/**
 *
 * @param {Element} app
 */
function getSpecialButton(app) {
  const overview = app.shadowRoot.querySelector("cn-overview");
  const about = overview.shadowRoot.querySelector("cn-about");
  const spBtn = about.shadowRoot.querySelector("cn-specialbutton");
  const btnWraper = spBtn.shadowRoot.getElementById("btnWraper");
  const btn = spBtn.shadowRoot.getElementById("btn");
  return { btnWraper, btn };
}

