import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// https://endorsements-app-d8cd2-default-rtdb.firebaseio.com/
// Database variables:
const appSettings = {
    databaseURL: "https://endorsements-app-d8cd2-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsementsList")
// ----------------------------------------------------------

const addcommentEl = document.getElementById("add-comment")
const publishbuttonEl = document.getElementById("publish-button")
const endorsementSectionEl = document.getElementById("endorsement-section")


onValue(endorsementsInDB, function(snapshot) {
    
    if(snapshot.exists()) { // ---------
        let itemsInDB = Object.entries(snapshot.val())
    
        //clear the endorsement section div before rendering the items again
        endorsementSectionEl.innerHTML = '' 
        
        for(let i = 0; i < itemsInDB.length; i++) {
            let keyInDB = itemsInDB[i][0]
            let valueInDB = itemsInDB[i][1]
            
            appendCommentsToEndorsementSectionEl(valueInDB)
        }
    } // -----------
    
})

publishbuttonEl.addEventListener("click", function() {
    
    let inputVal = addcommentEl.value
    
    push(endorsementsInDB, inputVal)
    
    clearInputField(addcommentEl)
})

function clearInputField(input) {
    input.value = ''
}

function appendCommentsToEndorsementSectionEl(itemVal) {
    let newTextBox = document.createElement("p")
    newTextBox.className = "comment-box"
    newTextBox.textContent = itemVal
    endorsementSectionEl.appendChild(newTextBox)
}

