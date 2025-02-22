window.addEventListener('resize',checkWindowSize)

function checkWindowSize(){
    let bigNavBar = document.getElementById('bigNavBar')
    let menuIcon = document.getElementById('menuIcon')
    let smallNavBar = document.getElementById('smallNavBar')
    if(window.innerWidth < 900){
        bigNavBar.style.display = 'none'
        menuIcon.style.display = 'block'
    }
    else{
        bigNavBar.style.display = 'block'
        menuIcon.style.display = 'none'
        smallNavBar.style.display = 'none'
    }
}

function openSmallNavBar(){
    let smallNavBar = document.getElementById('smallNavBar')
    if(smallNavBar.style.display !== 'block')
        smallNavBar.style.display = 'block'
    else
        smallNavBar.style.display = 'none'
}

(() =>{
    checkWindowSize()
})()
