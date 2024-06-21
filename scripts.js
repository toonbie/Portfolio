function addAnimation(scrollers){
    scrollers.forEach((scroller) => {
        //plays animation only if the person has reduced motion off 
        scroller.setAttribute("data-animated", true);
        scroller.setAttribute("data-animation", "play");
        scroller.setAttribute("data-duration","normal");
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

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
    <div class="flex flex-col h-[300px]">
        <button class="newPage hover:underline" aria-label="Put portfolio onto new page">
        <h1 class="title">${project.title}</h1>
        <div>
        <img class="transition-transform hover:scale-125 duration-700" src="${project.image}  height=150px width=200px alt="Screenshot of portfolio">
        </div>
        <p>${project.description}</p>
        </button>
        <div>
            <button class="moreInfo border bg-gray-500 hover:bg-gray-300 p-1 info" aria-label="more information">More Info</button>
            <a class="text-right float-right hover:text-sky-500" href="${project.github}" target="_blank" aria-label="github Link"><i class="text-right fa-brands fa-github"alt="github icon"></i></a>
            <a class="text-right  float-right mx-2 hover:text-sky-500" href="${project.link}" target="_blank" aria-label="Project link"> <i class="text-right fa-regular fa-file" alt="page icon"></i></a><br>
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
            }
        })
        const head = document.head.innerHTML
        head.title = projectMatch.title
        const footer = document.body.querySelector("footer").innerHTML
        button.addEventListener("click",(e)=>{
            refreshers = document.body.querySelectorAll(".home")
            refreshers.forEach((button)=>{
                button.href="javascript:location.reload(true)";
            })
            const header = document.body.querySelector("header").innerHTML
            var opened = window.open("",target="_parent");

            opened.document.write(
                `
                ${head}
                ${header}
                <body class="bg-cover bg-gradient-to-b from-black to-gray-900">
                <div class="flex flex-col gap-8 mt-16 items-center mx-8">
                    <h1 class="w-screen title text-5xl text-center">${projectMatch.title}</h1>
                    <img class="w-screen" src="${projectMatch.image} ">
                        <p class="text-2xl">${projectMatch.description}</p>
                    <div class="w-screen grid grid-cols-3 items-center gap-2 sm:text-2xl justify-items-center sm:m-8">
                        <p class="">Contributors:</p>
                        <p class="">${projectMatch.contributors}</p>
                        <a class=" text-center w-fit hover:text-sky-500" href="${projectMatch.github}" target="_blank"> Github <i class="text-right fa-brands fa-github"></i></a>
                        <p class="">Dependencies:</p>
                        <p class="">${projectMatch.dependencies}</p>
                        <a class=" text-center w-fit hover:text-sky-500" href="${projectMatch.link}" target="_blank"> Direct Link <i class="text-right fa-regular fa-file"></i></a><br>
                    </div>
                </div>
                </body>
                <footer class="w-full h-[50px] border-t bg-cover bg-gray-700">
                    ${footer}
                </footer>
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
    const downloads = document.querySelectorAll(".download")
    const logo = document.querySelector(".logo")
    navButton.addEventListener("click",(e)=>{
        menu.classList.toggle("hidden")

    })
    mobileHome.addEventListener("click",(e)=>{
        menu.classList.toggle("hidden")

    })
    navClose.addEventListener("click",(e)=>{
        menu.classList.toggle("hidden")

    })
    logo.addEventListener("click",(e)=>{
        menu.classList.toggle("hidden")

    })
    downloads.forEach((download)=>{
        download.addEventListener("click",(e)=>{
            if (confirm("Are you sure you want to download? ")){
                window.location.href ="https://docs.google.com/document/d/1NIwV-LoZozqXWVzZdNX5I7DG3yiQwx_x/edit?usp=sharing&ouid=106698212685993672604&rtpof=true&sd=true"
            }else{
            }
        })
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
                control.innerHTML = `<i class="fa-solid fa-pause"></i> Play`
            }
            else if(control.classList.contains("play")){
                video.play()
                control.classList.toggle("pause")
                control.classList.toggle("play")
                control.innerHTML = `<i class="fa-solid fa-play"></i> Pause`
            }
        });

    });
}

function scrollerButtons(){
    const slowArrow = document.querySelector(".slowScroll")
    const fastArrow = document.querySelector(".fastScroll")
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
    slowArrow.addEventListener("click",(e)=>{
        if (animation.dataset.duration==="normal"){
            animation.dataset.duration="slow"
        }else if(animation.dataset.duration==="fast"){
            animation.dataset.duration="normal"
        }
    })
    fastArrow.addEventListener("click",(e)=>{
        if (animation.dataset.duration==="normal"){
            animation.dataset.duration="fast"
        }else if(animation.dataset.duration==="slow"){
            animation.dataset.duration="normal"
        }
    })
}

function scrollTextAnimate(){
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting){
                entry.target.classList.add("show")
            }
        })
    });
    const hiddenElement= document.querySelectorAll(".scrollHide");
    hiddenElement.forEach((element)=> observer.observe(element));
}



function formValidate(){
    const firstName = document.getElementById("firstName")
    const lastName = document.getElementById("lastName")
    const subject = document.getElementById("subject")
    const message = document.getElementById("message")
    const error = document.querySelector(".error")
    const form = document.querySelector("form")
    form.addEventListener(`submit`,(e)=>{
        let errors = []
        if(firstName.value=== '' || firstName.value === null ){
            errors.push("First name is required")
        }

        if(lastName.value=== '' || lastName.value === null ){
            errors.push("Last name is required")
        }

        if (subject.value ==='' || subject.value=== null){
            errors.push("Subject is required")
        }
        if (subject.value ==='' || subject.value=== null){
            errors.push("Subject is required")
        }else if(subject.value.length >= 100){
            errors.push(`Subject needs to be less than 100 characters ${subject.value.length} characters`)
        }
        else if(subject.value.length <= 5){
            errors.push(`Subject needs to be longer than 5 characters ${subject.value.length} characters`)
        }

        if (message.value ==='' || message.value=== null){
            errors.push('Message is required')
        }else if(message.value.length >= 500){
            errors.push(`Message needs to be less than 500 characters ${message.value.length}`)
        }

        if (errors.length>0){
            e.preventDefault()
            error.textContent = errors.join(', ')
        }
    })
}

videoControl()
scrollTextAnimate()
navButton()
if (document.URL.includes("index.html")){
    getJson()
    scrollerButtons()
}
if (document.URL.includes("contact.html")){
    formValidate()
}

