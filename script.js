// Carousel

let slideIndex = 4;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
let timer;


function showSlides() {

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
    timer = setTimeout(showSlides, 5000); // Change image every 5 seconds
}

function clickDotMoveSlides(index) {
    slideIndex = index - 1;
    clearTimeout(timer);
    showSlides();
}

//Kovacspet Topmenu begin//
function mobil() {
    var x = document.getElementById("myMenu");
    if (x.className === "menuTop") {
        x.className += " responsive";
    } else {
        x.className = "menuTop";
    }
}
//Kovacspet Topmenu end//

//Animation starts when on screen //

function animation() {

    const startAnimation = (entries, observer) => {
        entries.forEach(entry => {
            entry.target.classList.toggle("slide", entry.isIntersecting);
        });
    };

    const observer = new IntersectionObserver(startAnimation);
    const options = { root: null, rootMargin: '0px', threshold: 1 };
    const elements = document.querySelectorAll('.slide');
    elements.forEach(el => {
        observer.observe(el, options);
    });

}



// EPIC JS INCOMING //

let dummyData;
let filteredArr;
let index = 0;

function getDummyData() {
    fetch("./data.json").then(response => response.json()).then(json => {
        dummyData = json.data;
        handleSearchClick();
    });

}


function getfilterredArr() {
    const array = document.querySelectorAll('input[class=checkboxClass]:checked');
    let filterObj = {};
    index = 0;

    for (let i = 0; i < array.length; i++) {
        filterObj[array[i].name] ? filterObj[array[i].name].push(array[i].defaultValue) : filterObj[array[i].name] = [array[i].defaultValue];
    }

    filterObj["size"] ? '' : filterObj["size"] = ["kicsi", "közepes", "nagy"];
    filterObj["gender"] ? '' : filterObj["gender"] = ["fiú", "lány"];
    filterObj["age"] ? '' : filterObj["age"] = ["kölyök", "felnőtt"];

    filteredArr = dummyData.filter(data => {
        if (filterObj.size.includes(data.size) && filterObj.gender.includes(data.gender) && (data.age > 1 && filterObj.age.includes("felnőtt") || data.age <= 1 && filterObj.age.includes("kölyök"))) {
            return data;
        }
    });
    /*console.log(filteredArr);
    console.log(filterObj);*/
}


function showData() {
    const howManyDogs = 2;
    document.querySelector(".how-many-dog").innerHTML = 'Jelenleg ' + filteredArr.length + ' kutya vár gazdira: ';

    for (let i = 0; i < howManyDogs; i++) {

        let goodIndex = index + i;
        if (index + i >= filteredArr.length) {
            goodIndex = index + i - filteredArr.length;
        }

        document.querySelector(`#show-card-name-${i+1}`).innerHTML = (filteredArr.length > 0 ? filteredArr[goodIndex].name : 'nincs találat');
        document.querySelector(`#show-card-gender-${i+1}`).innerHTML = filteredArr.length > 0 ? filteredArr[goodIndex].gender : '';
        document.querySelector(`#show-card-size-${i+1}`).innerHTML = filteredArr.length > 0 ? filteredArr[goodIndex].size : '';
        document.querySelector(`#show-card-age-${i+1}`).innerHTML = filteredArr.length > 0 ? filteredArr[goodIndex].age < 1 ? Math.floor(filteredArr[goodIndex].age * 12) + ' hónapos' : filteredArr[goodIndex].age + ' éves' : '';
        document.querySelector(`#show-card-img-${i+1}`).src = filteredArr.length > 0 ? filteredArr[goodIndex].photo : '';
    }



}


function handleSearchClick() {
    getfilterredArr();
    showData();
}


function handleLeftRightClick(string) {
    if (filteredArr.length > 0) {
        if (string === 'right') {
            index === filteredArr.length - 1 ? index = 0 : index++;

        } else if (string === 'left') {
            index === 0 ? index = filteredArr.length - 1 : index--;
        }
        showData();
    }

}

function scrollFunction(string) {
    //console.log(string);

    const id = string;
    const yOffset = -100;
    const element = document.getElementById(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
}

function copyFunction() {
    navigator.clipboard.writeText('info@bogancsotthon.hu');

    let tooltip = document.getElementById("tooltip");
    tooltip.style.visibility = "visible";

    setTimeout(() => tooltip.style.visibility = "hidden", 750);


}

// EPIC JS ENDS HERE //



//Footer start by Kubi//

//Footer end by Kubi//

function init() {
    showSlides();
    animation();
    getDummyData();
}

window.addEventListener("load", init);