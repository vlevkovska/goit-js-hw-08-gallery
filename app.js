const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];
const refs = {
  openGallery: document.querySelector(".js-gallery"),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightbox: document.querySelector(".js-lightbox"),
  image: document.querySelector(".lightbox__image"),
  closeOverlay: document.querySelector(".lightbox__overlay"),
};
const cardsMarkup = createImages(galleryItems);

refs.openGallery.innerHTML = cardsMarkup;
refs.openGallery.addEventListener("click", onOpenGallery);
refs.closeBtn.addEventListener("click", onCloseGallery);
refs.closeOverlay.addEventListener("click", onCloseGallery);

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

lazyImages.forEach((image) => {
  image.addEventListener("load", onImageLoaded);
});
function onImageLoaded(event) {
  // console.log('картинка завантажилась');
  // console.log(event.target);
}
function createImages(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href = '${original}';
  >
    <img
    loading="lazy"
      class="gallery__image"
     src="${preview}"
  data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

function onOpenGallery(event) {
  const nextActiveImg = event.target;
  const isGalleryImage = nextActiveImg.classList.contains("gallery__image");
  if (!isGalleryImage) {
    return;
  }
  refs.lightbox.classList.add("is-open");
  refs.image.src = nextActiveImg.dataset.source;
  event.preventDefault();
  window.addEventListener("keydown", onEsc);
  window.addEventListener("keydown", onArrowRight);
  window.addEventListener("keydown", onArrowLeft);
}
function onCloseGallery() {
  refs.lightbox.classList.remove("is-open");
  refs.image.src = "";
  window.removeEventListener("keydown", onEsc);
  window.removeEventListener("keydown", onArrowRight);
  window.addEventListener("keydown", onArrowLeft);
}
// закриваємо по ESC
function onEsc(evn) {
  const ESC_KEY_CODE = "Escape";
  const isEscKey = evn.code === ESC_KEY_CODE;
  if (isEscKey) {
    onCloseGallery();
  }
}

// переключаем стрелочками тик тидик)
const findImageIndex = () => {
  const src = document.querySelector(".lightbox__image").src;
  return galleryItems.findIndex((image) => image.original === src);
};
const changeImg = (imageIndex) => {
  const elem = galleryItems.find(function (value, index) {
    if (imageIndex === index) return value;
  });
  console.log("elem", elem.original);
  document.querySelector(".lightbox__image").src = elem.original;
};
const maxLength = galleryItems.length;
const previousImg = () => {
  let imageIndex = findImageIndex();
  imageIndex <= 0 ? (imageIndex = maxLength - 1) : imageIndex--;
  changeImg(imageIndex);
};
const nextImg = () => {
  let imageIndex = findImageIndex();
  let nextImageIndex = imageIndex + 1;
  nextImageIndex >= maxLength ? (imageIndex = 0) : imageIndex++;
  changeImg(imageIndex);
};
function onArrowRight(evn) {
  if (evn.code === "ArrowRight") {
    nextImg();
  }
}
function onArrowLeft(evn) {
  if (evn.code === "ArrowLeft") {
    previousImg();
  }
}
