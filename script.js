const personalBlogForm = document.getElementById("personalBlogForm")
const titleInput = document.getElementById("title")
const contentInput = document.getElementById("content")
const titleSpan = document.getElementById("titleSpan")
const contentSpan = document.getElementById("contentSpan")
const list = document.getElementById("list")
const buttonSend = document.getElementById("buttonSend")
let removeButton;
let currentItemId = null;

// localStorage.removeItem(key);
// even listeners
personalBlogForm.addEventListener("submit", formSubnit)
list.addEventListener('click', editItem)
buttonSend.addEventListener('click', updateItem)


// state
let key = "STORAGE_KEY"
let cart = loadContent() //restore saved tasks from LocalStorage when the page reloads.
let id = 1

// Restore id after reload
if (cart.length > 0) {
    id = Math.max(...cart.map(post => post.id)) + 1; //This extracts only the IDs from the cart array
}

saveContent()
render()

function formSubnit(event) {
    event.preventDefault()
    const post = {
        id: id++,
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
        const editButton = document.createElement("button")
        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = "delete"
        editButton.innerHTML = "edit"
        li.dataset.id = post.id;
        li.innerHTML = `
            <p>ID: ${post.id}</p>
            <h3>Title: ${post.title}</h3>
            <p>Message: ${post.content}</p>`

        li.appendChild(editButton)
        li.appendChild(deleteButton)
        list.appendChild(li)
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation()
            list.removeChild(e.target.parentElement)
        })
    })
}

function editItem(event) {
    const li = event.target.closest('li');

    if (li) {
        currentItemId = Number(li.dataset.id);

        const item = cart.find(post => post.id === currentItemId);

        titleInput.value = item.title;
        contentInput.value = item.content;

        buttonSend.innerText = "Save";
    }
}

function updateItem() {

    if (currentItemId) {

        // Update in cart array
        cart = cart.map(post =>
            post.id === currentItemId ? { ...post, title: titleInput.value, content: contentInput.value } : post
        );

        saveContent();
        render();

        currentItemId = null;
        buttonSend.innerText = "Send";

    } else {

        // Create new item
        const newItem = {
            id: id++,
            title: titleInput.value,
            description: contentInput.value
        };

        cart.push(newItem);

        saveToLocalStorage();
        renderList();
    }

    clearInputs();
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