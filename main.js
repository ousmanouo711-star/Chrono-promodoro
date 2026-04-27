const start = document.getElementById('start')
const stopp = document.querySelector('#stop')
const reset = document.getElementById('reset')
const minElt = document.querySelector('span.minutes')
const secElt = document.querySelector('span.secondes')

let minutes = 25
let seconds = 0
let pause = false
stopp.disabled = true
let intervalId = undefined
let curentime = {min: minutes, sec: seconds}

printime(minutes, seconds)
start.addEventListener('click', ()=>{
    if (intervalId !== undefined)
        return 
    stopp.disabled = false  
    min(minutes - 1)
})
stopp.addEventListener('click', ()=>{
    if(pause){
        pause = false
        start.disabled = false
        reset.disabled = false
        minElt.parentElement.classList.remove('red')
        min(curentime.min, curentime.sec)  
    } else {
        clearInterval(intervalId)
        intervalId = undefined 
        pause = true
        minElt.parentElement.classList.add('red')
        start.disabled = true
        reset.disabled = true
    }
    
    
})
reset.addEventListener('click', ()=>{
    minutes = 25
    seconds = 0
    stopp.disabled = true
    clearInterval(intervalId)
    intervalId = undefined
    printime(minutes, seconds)
})

/**
 * compte 60s
 * @param {number} time 
 */
async function count(time){

    for (let i = time; i>=0; i--) {
        printime(undefined, i)
        curentime.sec = i
        await wait(1000)       
    }

}
function wait(a) {
    return new Promise( r => {
        intervalId = setTimeout(r, a)
    })
}
async function min(min, second = 59) {
    
    for(let i = min; i >= 0; i--){
        printime(i, undefined)
        curentime.min = i
        console.log(i)
        await count(second)
    }
    alert('Temps ecoulé!')
    return
}
/**
 * affiche le temps
 * @param {number} a minute
 * @param {number} b second
 */
function printime(a, b){
    if(a === undefined){
        secElt.innerText = b < 10 ? `0${b}`:b
    }else if(b === undefined){
        minElt.innerText = a < 10 ? `0${a}`:a
    }else if(a !== undefined && b !== undefined){
        minElt.innerText = a < 10 ? `0${a}`:a
        secElt.innerText = b < 10 ? `0${b}`:b
    }
}