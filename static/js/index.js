// Get All Necessary Definitions
let Questions = [""]
let que = document.querySelector("#que")
let ans = document.querySelector("#ans")
let create = document.querySelector("#create")
let local = JSON.parse(localStorage.getItem("Questions"))
let localTest = JSON.parse(localStorage.getItem("QuestionsTest"))
let localAns = JSON.parse(localStorage.getItem("Answers"))
let listQue = document.querySelector("#listQue")
let delBtn = document.querySelector("#deleteAll")
let showBtn = document.querySelector("#showBtn")
let closeBtn = document.querySelector("#closeBtn")
showBtn.style.display = "none"
closeBtn.style.display = "none"
//

// LocalWork
if (local){
    Questions = local
    Render()
}
//

// Create Definition
create.addEventListener("click", () => {
    // Check || If All Fields are Empty
    if (que.value === "" || ans.value === ""){
        Render()
    }
    else {
        // Add all Parameters in Arrays
        Questions.push(`${que.value} ==> ${ans.value}`)
        // Get Zero Inf in Input Field
        que.value = ""
        ans.value = ""
        // Set all Arrays in LocalStorage
        localStorage.setItem('Questions', JSON.stringify(Questions))

        Render()
        renderTest()
    }
})
//

// This Fucntion Shows all Changes on the Page
function Render() {
    QueLength = Questions.length
    // Create empty List
    let list = ""
    // To check Every Question
    Questions.map((x)=> {
        if (x !== "") {
            // Add every <li> At <ul>
            list += `
            <li>
                ${x}
                <button id="delbtn">
                    <img src="static/imgs/delete-icon.png" alt="">
                </button>
            </li>`
        }
    })

    // Shows the list on WebPage
    listQue.innerHTML = list
    // If there will be to many Questions on the Page
    if (Questions.length > 5){
        // Hide list of Questions
        listQue.innerHTML = ""
        // Then reveal ShowBtn
        showBtn.style.display = "block"
        document.querySelector("h3").style.display = "none"
    }
    showBtn.addEventListener("click", () => {
        // If Show button has been Clicked, we Shows the ListQue
        listQue.innerHTML = list
        // Add the CloseBtn
        closeBtn.style.display = "block"
        // And hide ShowBtn
        showBtn.style.display = "none"
        document.querySelector("h3").style.display = "block"

    })
    closeBtn.addEventListener("click", () => {
        // If Close button has been clicked, We Hide list
        listQue.innerHTML = ""
        // Hide the CloseBtn
        closeBtn.style.display = "none"
        // And Reveal ShowBtn
        showBtn.style.display = "block"
        document.querySelector("h3").style.display = "none"
    })
    document.querySelectorAll("#delbtn").forEach(el => el.addEventListener("click", deleteItem))
}
//

// Button to Clear all Parametres and Questions
delBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    Questions = [""]
    showBtn.style.display = "none"
    closeBtn.style.display = "none"
    document.querySelector("h3").style.display = "block"
    Render()
    renderTest()
})

// Delete Item Button
function deleteItem() {
    let index = Questions.indexOf(this.closest("li").innerText.split(" ").slice(0,3).join(" "))
    Questions.splice(index, 1)
    this.closest("li").remove()
    localStorage.setItem("Questions",JSON.stringify(Questions))
}
