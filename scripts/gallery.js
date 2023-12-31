
//==========  Section ===========

//==== HOVER EFFECT ON IMAGES========

const optionImg = document.querySelectorAll(".option_img"),
    covers = document.querySelectorAll(".cover"),
    galleryImgs = document.querySelectorAll(".gallery_img"),
    galleryImgBlock = document.querySelectorAll(".gallery_img_block");

//      ZOOM-IN
covers.forEach((cover, ind) => {
    cover.addEventListener("mouseover", () => {
        optionImg[ind].classList.add("photoHover");
        cover.style.fontWeight = "700";
    });
});

//    ZOOM-OUT
covers.forEach((cover, ind) => {
    cover.addEventListener("mouseout", () => {
        optionImg[ind].classList.remove("photoHover");
        cover.style.fontWeight = "300";
    });
});

//===========galery imges hover========
//ZOOM-IN
galleryImgs.forEach((img) => {
    img.addEventListener("mouseover", () => {
        img.classList.add("galleryPhotoHover");
    });
});

//    ZOOM-OUT
galleryImgs.forEach((img) => {
    img.addEventListener("mouseout", () => {
        img.classList.remove("galleryPhotoHover");
    });
});

//===================  Clicked on gallery imge =============
const popUp = document.querySelector(".popUp");

//====popUp
galleryImgs.forEach((img, ind) => {
    img.addEventListener("click", () => {
        const popUpBlock = document.createElement("div");
        const leftArrow = document.createElement("div");
        leftArrow.innerHTML = `
               <div class="left-arrow-line-one"> </div>
               <div class="left-arrow-line-two"> </div>
               `;
        if (ind == 0) {
            leftArrow.classList.add("hide-opacity");
        }
        leftArrow.classList.add("left-arrow");

        popUpBlock.append(leftArrow);
        popUpBlock.classList.add("popUp-close-icon-block");
        const popUpImg = document.createElement("img");
        popUpImg.classList.add("popUp-img");
        popUpImg.src = img.src;
        popUp.classList.remove("hide");
        popUpBlock.append(popUpImg);
        const icon = document.createElement("div");
        icon.innerHTML = `
                  <div class="close-icon-wrapper">
                      <div class="close-icon">
                         <div class="close-line-one close-lines"></div>
                         <div class="close-line-two close-lines"></div>
                      </div>  
                 </div>
                  <div class="right-arrow"> 
               <div class="right-arrow-line-one"> </div>
               <div class="right-arrow-line-two"> </div>
                </div>
                 
`;
        popUpBlock.append(icon);
        popUp.append(popUpBlock);
        document.body.style.overflow = "hidden";
        if (ind == galleryImgs.length - 1) {
            document.querySelector(".right-arrow").classList.add("hide-opacity");
        }
        arrows(galleryImgs, ind);
        popUpClose();
    });
});

//====popUp Close
function popUpClose() {
    const icon = document.querySelector(".close-icon");
    icon.addEventListener("click", () => {
        popUp.classList.add("hide");
        document.body.style.overflow = "scroll";
        popUp.innerHTML = "";
    });
}

//=============== galery slider ===========
function arrows(imgArray, ind) {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const popUpImg = document.querySelector(".popUp-img");

    if (leftArrow) {
        leftArrow.addEventListener("click", () => {
            popUpImg.src = imgArray[ind - 1].src;
            ind -= 1;
            if (ind == 0) {
                leftArrow.classList.add("hide-opacity");
            }
            if (ind < imgArray.length - 1) {
                rightArrow.classList.remove("hide-opacity");
            }
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener("click", () => {
            popUpImg.src = imgArray[ind + 1].src;
            ind += 1;
            if (ind == imgArray.length - 1) {
                rightArrow.classList.add("hide-opacity");
            }
            if (ind > 0) {
                leftArrow.classList.remove("hide-opacity");
            }
        });
    }
}
