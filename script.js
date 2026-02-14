const personalBlogForm = document.getElementById("personalBlogForm")
const titleInput = document.getElementById("title")
const contentInput = document.getElementById("content")
const titleSpan = document.getElementById("titleSpan")
const contentSpan = document.getElementById("contentSpan")
const list = document.getElementById("list")
let removeButton;

// even listeners
personalBlogForm.addEventListener("submit", formSubnit)

// state
let key = "STORAGE_KEY"
let cart = loadContent() //restore saved tasks from LocalStorage when the page reloads.

saveContent()
render()

function formSubnit(event) {
    event.preventDefault()
    const post = {
        title: titleInput.value.trim(),
        content: contentInput.value.trim()
    }

    if (title === "" | content === "") {
        alert("Please fill out all the fields")
        return
    }

    if (!title.validity.valid) {
        title.setCustomValidity("Please enter the title");
        titleSpan.textContent = title.validationMessage
        title.focus()
        return;
    }
    if (!content.validity.valid) {
        content.setCustomValidity("Please enter a content")
        contentSpan.textContent = content.validationMessage
        content.focus()
        return;
    }

    // add new post to the cart 
    cart.push(post)

    saveContent()
    render()
    clearInputs()
}

function render() {
    list.innerHTML = ""

    cart.forEach(post => {
        const li = document.createElement("li")
        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = "delete"

        li.innerHTML = `
            <strong>Title: ${post.title}</strong>
            <p>Message: ${post.content}</p>`

        li.appendChild(deleteButton)
        list.appendChild(li)
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation()
            list.removeChild(e.target.parentElement)
        })
    })
}

function clearInputs() {
    titleInput.value = ""
    contentInput.value = ""
}

// local storage
function saveContent() {
    localStorage.setItem(key, JSON.stringify(cart)) // save under varible key
}

// load data 
function loadContent() {
    const data = localStorage.getItem(key)
    if (!data) return [];

    // prevent crashes and if data is corrupted
    try { return JSON.parse(data); }
    catch { return []; }
}