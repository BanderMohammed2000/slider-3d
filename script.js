console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
  prev: document.querySelector(".btn--left"),
  next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
  const currentCardEl = cardsContainerEl.querySelector(".current--card");
  const previousCardEl = cardsContainerEl.querySelector(".previous--card");
  const nextCardEl = cardsContainerEl.querySelector(".next--card");
  const lastPreviousCardEl = cardsContainerEl.querySelector(
    ".last--previous--card"
  );
  const lastNextCardEl = cardsContainerEl.querySelector(".last--next--card");

  const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
  const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
  const nextBgImageEl = appBgContainerEl.querySelector(".next--image");
  const lastNextBgImageEl =
    appBgContainerEl.querySelector(".last--next--image");
  const lastPreviousBgImageEl = appBgContainerEl.querySelector(
    ".last--previous--image"
  );

  changeInfo(direction);
  swapCardsClass();

  removeCardEvents(currentCardEl);

  function swapCardsClass() {
    currentCardEl.classList.remove("current--card");
    previousCardEl.classList.remove("previous--card");
    nextCardEl.classList.remove("next--card");
    lastPreviousCardEl.classList.remove("last--previous--card");
    lastNextCardEl.classList.remove("last--next--card");

    currentBgImageEl.classList.remove("current--image");
    previousBgImageEl.classList.remove("previous--image");
    nextBgImageEl.classList.remove("next--image");
    lastPreviousBgImageEl.classList.remove("last--previous--image");
    lastNextBgImageEl.classList.remove("last--next--image");

    currentCardEl.style.zIndex = "50";
    currentBgImageEl.style.zIndex = "-2";

    if (direction === "right") {
      lastPreviousCardEl.style.zIndex = "10";
      lastNextCardEl.style.zIndex = "15";

      previousCardEl.style.zIndex = "20";
      nextCardEl.style.zIndex = "30";

      nextBgImageEl.style.zIndex = "-1";

      //   currentCardEl.classList.add("previous--card");
      //   previousCardEl.classList.add("next--card");
      //   nextCardEl.classList.add("current--card");

      currentCardEl.classList.add("previous--card");
      previousCardEl.classList.add("last--previous--card");
      nextCardEl.classList.add("current--card");
      lastNextCardEl.classList.add("next--card");
      lastPreviousCardEl.classList.add("last--next--card");

      currentBgImageEl.classList.add("previous--image");
      previousBgImageEl.classList.add("last--previous--image");
      nextBgImageEl.classList.add("current--image");
      lastNextBgImageEl.classList.add("next--image");
      lastPreviousBgImageEl.classList.add("last--next--image");
    } else if (direction === "left") {
      lastPreviousCardEl.style.zIndex = "15";
      lastNextCardEl.style.zIndex = "10";

      previousCardEl.style.zIndex = "30";
      nextCardEl.style.zIndex = "20";

      previousBgImageEl.style.zIndex = "-1";

      //   currentCardEl.classList.add("next--card");
      //   previousCardEl.classList.add("current--card");
      //   nextCardEl.classList.add("previous--card");

      currentCardEl.classList.add("next--card");
      previousCardEl.classList.add("current--card");
      nextCardEl.classList.add("last--next--card");
      lastNextCardEl.classList.add("last--previous--card");
      lastPreviousCardEl.classList.add("previous--card");

      //   currentBgImageEl.classList.add("next--image");
      //   previousBgImageEl.classList.add("current--image");
      //   nextBgImageEl.classList.add("previous--image");

      currentBgImageEl.classList.add("next--image");
      previousBgImageEl.classList.add("current--image");
      nextBgImageEl.classList.add("last--next--image");
      lastNextBgImageEl.classList.add("last--previous--image");
      lastPreviousBgImageEl.classList.add("previous--image");
    }
  }
}

function changeInfo(direction) {
  let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
  let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
  let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");
  let lastPreviousInfoEl = cardInfosContainerEl.querySelector(
    ".last--previous--info"
  );
  let lastNextInfoEl = cardInfosContainerEl.querySelector(".last--next--info");

  gsap
    .timeline()
    .to([buttons.prev, buttons.next], {
      duration: 0.2,
      opacity: 0.5,
      pointerEvents: "none",
    })
    .to(
      currentInfoEl.querySelectorAll(".text"),
      {
        duration: 0.4,
        stagger: 0.1,
        translateY: "-120px",
        opacity: 0,
      },
      "-="
    )
    .call(() => {
      swapInfosClass(direction);
    })
    .call(() => initCardEvents())
    .fromTo(
      direction === "right"
        ? nextInfoEl.querySelectorAll(".text")
        : previousInfoEl.querySelectorAll(".text"),
      {
        opacity: 0,
        translateY: "40px",
      },
      {
        duration: 0.4,
        stagger: 0.1,
        translateY: "0px",
        opacity: 1,
      }
    )
    .to([buttons.prev, buttons.next], {
      duration: 0.2,
      opacity: 1,
      pointerEvents: "all",
    });

  function swapInfosClass() {
    currentInfoEl.classList.remove("current--info");
    previousInfoEl.classList.remove("previous--info");
    nextInfoEl.classList.remove("next--info");
    lastPreviousInfoEl.classList.remove("last--previous--info");
    lastNextInfoEl.classList.remove("last--next--info");

    if (direction === "right") {
      currentInfoEl.classList.add("previous--info");
      previousInfoEl.classList.add("last--previous--info");
      nextInfoEl.classList.add("current--info");
      lastNextInfoEl.classList.add("next--info");
      lastPreviousInfoEl.classList.add("last--next--info");
    } else if (direction === "left") {
      currentInfoEl.classList.add("next--info");
      previousInfoEl.classList.add("current--info");
      nextInfoEl.classList.add("last--next--info");
      lastNextInfoEl.classList.add("last--previous--info");
      lastPreviousInfoEl.classList.add("previous--info");
    }
  }
}

function updateCard(e) {
  const card = e.currentTarget;
  const box = card.getBoundingClientRect();
  const centerPosition = {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
  };
  let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
  gsap.set(card, {
    "--current-card-rotation-offset": `${angle}deg`,
  });
  const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
  gsap.set(currentInfoEl, {
    rotateY: `${angle}deg`,
  });
}

function resetCardTransforms(e) {
  const card = e.currentTarget;
  const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
  gsap.set(card, {
    "--current-card-rotation-offset": 0,
  });
  gsap.set(currentInfoEl, {
    rotateY: 0,
  });
}

function initCardEvents() {
  const currentCardEl = cardsContainerEl.querySelector(".current--card");
  currentCardEl.addEventListener("pointermove", updateCard);
  currentCardEl.addEventListener("pointerout", (e) => {
    resetCardTransforms(e);
  });
}

initCardEvents();

function removeCardEvents(card) {
  card.removeEventListener("pointermove", updateCard);
}

function init() {
  let tl = gsap.timeline();

  tl.to(cardsContainerEl.children, {
    delay: 0.15,
    duration: 0.5,
    stagger: {
      ease: "power4.inOut",
      from: "right",
      amount: 0.1,
    },
    "--card-translateY-offset": "0%",
  })
    .to(
      cardInfosContainerEl
        .querySelector(".current--info")
        .querySelectorAll(".text"),
      {
        delay: 0.5,
        duration: 0.4,
        stagger: 0.1,
        opacity: 1,
        translateY: 0,
      }
    )
    .to(
      [buttons.prev, buttons.next],
      {
        duration: 0.4,
        opacity: 1,
        pointerEvents: "all",
      },
      "-=0.4"
    );
}

const waitForImages = () => {
  const images = [...document.querySelectorAll("img")];
  const totalImages = images.length;
  let loadedImages = 0;
  const loaderEl = document.querySelector(".loader span");

  gsap.set(cardsContainerEl.children, {
    "--card-translateY-offset": "100vh",
  });
  gsap.set(
    cardInfosContainerEl
      .querySelector(".current--info")
      .querySelectorAll(".text"),
    {
      translateY: "40px",
      opacity: 0,
    }
  );
  gsap.set([buttons.prev, buttons.next], {
    pointerEvents: "none",
    opacity: "0",
  });

  images.forEach((image) => {
    imagesLoaded(image, (instance) => {
      if (instance.isComplete) {
        loadedImages++;
        let loadProgress = loadedImages / totalImages;

        gsap.to(loaderEl, {
          duration: 1,
          scaleX: loadProgress,
          backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
        });

        if (totalImages == loadedImages) {
          gsap
            .timeline()
            .to(".loading__wrapper", {
              duration: 0.8,
              opacity: 0,
              pointerEvents: "none",
            })
            .call(() => init());
        }
      }
    });
  });
};

waitForImages();
