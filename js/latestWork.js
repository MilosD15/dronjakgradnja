// DOM elements
const latestWork = document.querySelector('[data-latest-work]');
const latestWorkTitle = document.querySelector('[data-latest-work-title]');
const latestWorkParagraph = document.querySelector('[data-latest-work-paragraph]');
const latestWorkGrid = document.querySelector('[data-latest-work-grid]');
const latestWorkPopup = latestWork.querySelector('[data-latest-work-read-more-popup]');
const latestWorkPopupCloseButton = latestWork.querySelector('[data-latest-work-read-more-popup-close-btn]');
const latestWorkReadMorePopupLargeImg = latestWork.querySelector("[data-latest-work-read-more-popup-large-img]");
const latestWorkReadMorePopupEnlargeLargeImageModal = latestWork.querySelector("[data-latest-work-read-more-popup-enlarge-large-picture]");
const latestWorkReadMorePopupEnlargeLargeImageModalCloseBtn = latestWork.querySelector("[data-latest-work-read-more-popup-enlarge-large-picture-close-btn]");
const latestWorkReadMorePopupEnlargeLargeImageModalImg = latestWork.querySelector("[data-latest-work-read-more-popup-enlarge-large-picture-img]");
const latestWorkGridItemTemplate = latestWork.querySelector('[data-latest-work-grid-item-template]');
const latestWorkGridColumns = [...latestWork.querySelectorAll("[data-latest-work-grid-column]")];
const latestWorkPopupAdditionalImgTemplate = latestWork.querySelector("[data-latest-work-read-more-popup-additional-img-template]");

// animate elements in when they are in the viewport
const latestWorkTitleObserver = new IntersectionObserver(entries => {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  latestWorkTitle.classList.add("animate-in");
  latestWorkParagraph.classList.add("animate-in");
  latestWorkGrid.classList.add("animate-in");
  
  latestWorkTitleObserver.unobserve(entry.target);
}, { threshold: 0 });
latestWorkTitleObserver.observe(latestWork);

// variables
const GRID_IMAGES_URL_PREFIX = "\\images\\works";
let latestWorkGridImages, latestWorkReadMoreGridItems, latestWorkReadMorePopupAdditionalImages;
const documentLanguage = document.querySelector("html").lang;

// load the actual data from the json file
let projectsData;
pullDataFromJson("../latestWorks.json").then(data => {
  projectsData = data;

  projectsData.forEach((projectData, projectIndex) => {
    renderLatestWorkGridItem(projectData, projectIndex);
  });

  latestWorkReadMoreGridItems = document.querySelectorAll("[data-latest-work-grid-item]");
  latestWorkReadMoreGridItems.forEach(gridItem => {
    gridItem.addEventListener("click", () => {
      const gridItemId = gridItem.closest("[data-latest-work-grid-item]").dataset.latestWorkGridItemId;

      // save the current scroll position in localStorage
      localStorage.setItem("scrollTop", window.scrollY);
      openReadMorePopup(gridItemId);
    });
  });

  // lazy load images
  latestWorkGridImages = document.querySelectorAll('[data-latest-work-grid-image]');
  lazyLoadLatestWorkImages(latestWorkGridImages);

  // when there is scrollTop in localStorage, scroll to that position
  localStorage.getItem("scrollTop") && window.scrollTo(0, parseInt(localStorage.getItem("scrollTop")));
  localStorage.removeItem("scrollTop");
});

async function pullDataFromJson(fileURL) {
  const response = await fetch(fileURL);
  const data = await response.json();
  return data;
}

function renderLatestWorkGridItem(projectData, projectIndex) {
  const { id, showcase_img, project_type } = projectData;
  const gridItemModel = latestWorkGridItemTemplate.content.cloneNode(true);

  const gridItem = gridItemModel.querySelector("[data-latest-work-grid-item]");
  gridItem.dataset.latestWorkGridItemId = id;

  const gridItemImg = gridItemModel.querySelector("[data-latest-work-grid-image]");
  gridItemImg.dataset.src = GRID_IMAGES_URL_PREFIX + showcase_img.url;
  gridItemImg.alt = showcase_img.alt_text[documentLanguage];

  const gridItemBlurredImg = gridItemModel.querySelector("[data-latest-work-grid-blurred-image]");
  gridItemBlurredImg.src = GRID_IMAGES_URL_PREFIX + generateSmallImgUrl(showcase_img.url);
  gridItemBlurredImg.alt = showcase_img.alt_text[documentLanguage];

  const correspondingGridColumn = getCorrespondingGridColumn(project_type.flag);
  correspondingGridColumn.appendChild(gridItemModel);
}

function getCorrespondingGridColumn(projectFlag) {
  const correspondingGridColumn = latestWorkGridColumns.find(column => {
    return column.dataset.latestWorkGridColumnFlag === projectFlag;
  });

  return correspondingGridColumn;
}

function generateSmallImgUrl(imgUrl) {
  if (imgUrl.includes(".jpg")) return imgUrl.replace(".jpg", "-small.jpg");
  if (imgUrl.includes(".png")) return imgUrl.replace(".png", "-small.png");
  if (imgUrl.includes(".jpeg")) return imgUrl.replace(".jpeg", "-small.jpeg");
}

// functions
function lazyLoadLatestWorkImages(images) {
  images.forEach(image => {
    if (image.classList.contains('loaded')) return;

    image.src = image.dataset.src;

    image.addEventListener('load', () => {
      if (image.classList.contains('loaded')) return;

      image.classList.add('loaded');
    });
  }); 
}

latestWorkReadMorePopupLargeImg.addEventListener("click", e => {
  latestWorkReadMorePopupEnlargeLargeImageModal.showModal();
  latestWorkReadMorePopupEnlargeLargeImageModalImg.src = e.target.src;
});

latestWorkReadMorePopupEnlargeLargeImageModalCloseBtn.addEventListener("click", () => {
  latestWorkReadMorePopupEnlargeLargeImageModal.dataset.closed = true;

  setTimeout(() => {
    latestWorkReadMorePopupEnlargeLargeImageModal.dataset.closed = false;
    latestWorkReadMorePopupEnlargeLargeImageModal.close();
  }, 300);
});

latestWorkPopupCloseButton.addEventListener("click", () => {
  closeReadMorePopup();

  // when there is scrollTop in localStorage, scroll to that position
  document.querySelector(":root").style.scrollBehavior = "initial";
  localStorage.getItem("scrollTop") && window.scrollTo(0, parseInt(localStorage.getItem("scrollTop")));
  document.querySelector(":root").style.scrollBehavior = "smooth";
  localStorage.removeItem("scrollTop");
});

function openReadMorePopup(gridItemId) {
  latestWorkPopup.showModal();
  document.body.classList.add("overflow-hidden");
  document.querySelector("html").classList.add("overflow-hidden");

  const projectData = projectsData.find(project => project.id == gridItemId);
  updateProjectData(projectData);

  latestWorkReadMorePopupAdditionalImages = document.querySelectorAll("[data-latest-work-read-more-popup-additional-img]");
  latestWorkReadMorePopupAdditionalImages.forEach(image => {
    image.addEventListener("click", (e) => {
      if (e.target.tagName !== "IMG") return;
    
      latestWorkReadMorePopupLargeImg.src = e.target.src;
      scrollToElement("[data-latest-work-read-more-popup-notice-above-image]");
    });
  });

  setTimeout(() => {
    const latestWorkReadMorePopupImages = document.querySelectorAll("[data-latest-work-read-more-popup-img]");
    lazyLoadLatestWorkImages(latestWorkReadMorePopupImages);
  }, 300);
}

function updateProjectData(projectData) {
  const { title, description, showcase_img, additional_imgs, project_type } = projectData;

  const latestWorkReadMorePopupTitle = document.querySelector("[data-latest-work-read-more-popup-title]");
  latestWorkReadMorePopupTitle.textContent = title[documentLanguage];

  const latestWorkReadMorePopupDescription = document.querySelector("[data-latest-work-read-more-popup-description]");
  latestWorkReadMorePopupDescription.textContent = description[documentLanguage];

  const latestWorkReadMorePopupLargeImg = document.querySelector("[data-latest-work-read-more-popup-large-img]");
  latestWorkReadMorePopupLargeImg.dataset.src = GRID_IMAGES_URL_PREFIX + showcase_img.url;
  latestWorkReadMorePopupLargeImg.alt = showcase_img.alt_text[documentLanguage];

  const latestWorkReadMorePopupLargeBlurredImg = document.querySelector("[data-latest-work-read-more-popup-large-blurred-img]");
  latestWorkReadMorePopupLargeBlurredImg.src = GRID_IMAGES_URL_PREFIX + generateSmallImgUrl(showcase_img.url);
  latestWorkReadMorePopupLargeBlurredImg.alt = showcase_img.alt_text[documentLanguage];

  const latestWorkReadMorePopupCategory = document.querySelector("[data-latest-work-read-more-popup-category]");
  latestWorkReadMorePopupCategory.textContent = capitalizeFirstLetter(project_type.category_name[documentLanguage]);

  const latestWorkReadMorePopupAdditionalImagesContainer = document.querySelector("[data-latest-work-read-more-popup-additional-images-grid]");
  latestWorkReadMorePopupAdditionalImagesContainer.innerHTML = "";

  [...additional_imgs, showcase_img].forEach(img => {
    const additionalImgModel = latestWorkPopupAdditionalImgTemplate.content.cloneNode(true);

    const additionalImg = additionalImgModel.querySelector("[data-latest-work-read-more-popup-additional-img]");
    additionalImg.dataset.src = GRID_IMAGES_URL_PREFIX + img.url;
    additionalImg.alt = img.alt_text[documentLanguage];

    const additionalImgBlurred = additionalImgModel.querySelector("[data-latest-work-read-more-popup-additional-blurred-img]");
    additionalImgBlurred.src = GRID_IMAGES_URL_PREFIX + generateSmallImgUrl(img.url);
    additionalImgBlurred.alt = img.alt_text[documentLanguage];

    latestWorkReadMorePopupAdditionalImagesContainer.appendChild(additionalImgModel);
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function closeReadMorePopup() {
  latestWorkPopup.dataset.closed = true;
  document.body.classList.remove("overflow-hidden");
  document.querySelector("html").classList.remove("overflow-hidden");

  setTimeout(() => {
    removeLoadedClassesOnImages(latestWorkPopup);
    latestWorkPopup.dataset.closed = false;
    latestWorkPopup.close();
  }, 300);
}

function removeLoadedClassesOnImages(container) {
  const images = container.querySelectorAll("img");
  images.forEach(image => {
    image.classList.remove("loaded");
  });
}

function scrollToElement(selector) {
  let element = document.querySelector(selector);
  if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
  } else {
      console.error("Element not found for selector:", selector);
  }
}