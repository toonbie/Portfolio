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
        <button class="newPage hover:underline">
        <h1 class="title">${project.title}</h1>
        <img src="${project.image}" height=150px width=200px>
        <p>${project.description}</p>
        </button>
        <div>
            <button class="moreInfo border bg-gray-500 p-1 info">More Info</button>
            <a class="ml-24 text-right" href="${project.github}"><i class="text-right fa-brands fa-github"></i></a>
            <a class="text-right" href="${project.link}"><i class="text-right fa-regular fa-file"></i></a><br>
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

function setNewPageButton(projects){
    const buttons = document.querySelectorAll(".newPage")
    buttons.forEach((button)=>{
        const jsonTitle = button.parentElement.querySelector(".title").textContent
        var projectMatch = NaN
        projects.forEach((project)=>{
            if(project.title === jsonTitle){
                projectMatch = project
                console.log(projectMatch)
            }
        })
        const head = document.head.innerHTML
        head.title = projectMatch.title
        refreshers = document.body.querySelectorAll(".home")
        refreshers.forEach((button)=>{
            console.log(button);
            button.href="javascript:location.reload(true)";
        });
        const header = document.body.querySelector("header").innerHTML
        refreshers = document.body.querySelectorAll(".home")
        button.addEventListener("click",(e)=>{
            var opened = window.open("",target="_parent");
            opened.document.write(
                `
                ${head}
                ${header}
                <body class="bg-cover bg-gradient-to-b from-black to-gray-900">
                <div class="flex flex-col gap-8 mt-16 items-center content-center mx-8">
                    <h1 class="w-screen title text-5xl text-center">${projectMatch.title}</h1>
                    <img class="w-screen" src="${projectMatch.image} ">
                        <p class="text-2xl">${projectMatch.description}</p>
                    <div class=" grid grid-cols-2 items-center gap-2 text-2xl justify-items-center m-8">
                        <p>Contributors:${projectMatch.contributors}</p>
                        <a class=" text-center w-fit" href="${projectMatch.github}"><i class="text-right fa-brands fa-github"></i></a>
                        <p>Dependencies:${projectMatch.dependencies}</p>
                        <a class=" text-center w-fit" href="${projectMatch.link}"><i class="text-right fa-regular fa-file"></i></a><br>
                    </div>
                </div>
                </body>
                `
                
            );
            navButton()
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
        setNewPageButton(data.projects)
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
    leftArrow.addEventListener("click",(e)=>{
        animation.dataset.direction="left"
    })
    rightArrow.addEventListener("click",(e)=>{
        animation.dataset.direction="right"
    })
}

getJson()
navButton()
videoControl()
scrollerButtons()