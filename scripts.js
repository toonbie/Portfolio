function addAnimation(scrollers){
    scrollers.forEach((scroller) => {
        //plays animation only if the person has reduced motion off 
        scroller.setAttribute("data-animated", true);
        scroller.setAttribute("data-animation", "play");
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item =>{
            const duplicatedItem = item.cloneNode(true);
            //stoppers screen reader from constantly reading out the list
            duplicatedItem.setAttribute("aria-hidden",true);
            scrollerInner.appendChild(duplicatedItem);
        });
        scrollerContent.forEach(item =>{
            const duplicatedItem = item.cloneNode(true);
            //stoppers screen reader from constantly reading out the list
            duplicatedItem.setAttribute("aria-hidden",true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}
function scroller(){
        const scrollers = document.querySelectorAll(".scroller");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation(scrollers);
    }

}

function portfolio(project){
    const portfolio = document.querySelector(".portfolio")
    portfolio.innerHTML += 
    `
    <div class="flex flex-col">
        <h1>${project.title}</h1>
        <img src="${project.image}" height=150px width=200px>
        <p>${project.description}</p>
        <div>
            <button class="moreInfo border bg-gray-500 p-1 info">More Info</button>
            <a class="ml-24 text-right" href="${project.github}"><i class="fa-brands fa-github"></i></a>
            <a class="text-right" href="${project.link}"><i class="fa-regular fa-file"></i></a><br>
        </div>
        <p class="toggle hidden">Contributors:${project.contributors}</p>
        <p class="toggle hidden">Dependencies:${project.dependencies}</p>
    </div>
    `

}
function setPortfolioButton(){
    const buttons = document.querySelectorAll(".moreInfo")
    buttons.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const alertField = button.parentElement.parentElement.querySelectorAll(".toggle")
            alertField.forEach((field)=>{
                field.classList.toggle("hidden")
            })

        })
    });
}

function getJson(){
    fetch('portfolio.json').then((res)=>{
        return res.json()
    }).then((data)=>{
        data.projects.forEach((project)=>{
            portfolio(project)
            
        })
        scroller()
        setPortfolioButton()
    })
}

function navButton(){
    const navButton = document.querySelector(".navchange")
    const mobileHome = document.querySelector(".home2")
    const navClose = document.querySelector(".navClose")
    const menu = document.querySelector(".floatingNav")
    navButton.addEventListener("click",(e)=>{
        menu.classList.toggle("hidden")
    })
    mobileHome.addEventListener("click",(e)=>{
        menu.classList.toggle("hidden")
    })
    navClose.addEventListener("click",(e)=>{
        menu.classList.toggle("hidden")
    })
}

function videoControl(){
    const videoControl = document.querySelectorAll(".videoPause")
    videoControl.forEach((control)=>{
        control.addEventListener("click",(e)=>{
            const video = control.parentElement.querySelector("video")
            if (control.classList.contains("pause")){
                video.pause()
                control.classList.toggle("pause")
                control.classList.toggle("play")
                control.innerHTML = `<i class="fa-solid fa-pause"></i>`
            }
            else if(control.classList.contains("play")){
                video.play()
                control.classList.toggle("pause")
                control.classList.toggle("play")
                control.innerHTML = `<i class="fa-solid fa-play"></i>`
            }
        });

    });
}

function scrollerButtons(){
    const leftArrow = document.querySelector(".leftScroll")
    const rightArrow = document.querySelector(".rightScroll")
    const scrollerControl = document.querySelector(".control")
    const animation = document.querySelector(".scroller")
    scrollerControl.addEventListener("click",(e)=>{
        if(animation.dataset.animation==="play"){
            animation.dataset.animation = "stop"
            scrollerControl.innerHTML = `<i class="fa-solid fa-pause"></i>`

        }
        else if (animation.dataset.animation==="stop"){
            animation.dataset.animation = "play"
            scrollerControl.innerHTML = `<i class="fa-solid fa-play"></i>`
        }
    });
}

getJson()
navButton()
videoControl()
scrollerButtons()