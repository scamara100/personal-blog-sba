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
list.addEventListener("click", function (event) {

    if (event.target.closest(".editBtn")) {
        editItem(event);
    }

    if (event.target.closest(".deleteBtn")) {
        deleteItem(event);
    }

});


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
    event.preventDefault();

    if (!titleInput.validity.valid) {
        titleInput.setCustomValidity("Please enter the title");
        titleSpan.textContent = titleInput.validationMessage;
        titleInput.focus();
        return;
    }

    if (!contentInput.validity.valid) {
        contentInput.setCustomValidity("Please enter content");
        contentSpan.textContent = contentInput.validationMessage;
        contentInput.focus();
        return;
    }

    if (currentItemId !== null) {

        // ✏️ EDIT MODE
        cart = cart.map(post =>
            post.id === currentItemId
                ? {
                    ...post,
                    title: titleInput.value.trim(),
                    content: contentInput.value.trim()
                }
                : post
        );

        currentItemId = null;
        buttonSend.innerText = "Send";

    } else {

        // ➕ ADD MODE
        const newPost = {
            id: id++,
            title: titleInput.value.trim(),
            content: contentInput.value.trim(),
            timestamp: new Date().toISOString()
        };

        cart.push(newPost);
    }
    // console.log("Form submitted");
    saveContent();
    render();
    clearInputs();
}

contentInput.addEventListener("input", (event) => {
    const Input = event.target;
    if (Input.validity.typeMismatch) {
        Input.setCustomValidity('Please enter a valid conten, minimum lenght it is 100 words');
    } else if (Input.validity.valueMissing) {
        Input.setCustomValidity('Field is required');
    }
    else {
        Input.setCustomValidity(''); // Clear custom error if valid
    }
    // Display the custom message or clear it
    contentSpan.textContent = contentInput.validationMessage;
})

function render() {
    list.innerHTML = "";

    cart.forEach(post => {
        const li = document.createElement("li");
        li.dataset.id = post.id;

        li.innerHTML = `
            <p>ID: ${post.id}</p>
            <h3>Title: ${post.title}</h3>
            <p>Message: ${post.content}</p>
            <p>timestamp: ${post.timestamp}</p>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;

        list.appendChild(li);
    });
}

function deleteItem(event) {

    const deleteBtn = event.target.closest(".deleteBtn");
    if (!deleteBtn) return;

    const li = deleteBtn.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    //Remove from array
    cart = cart.filter(post => post.id !== id);

    //Update localStorage
    saveContent();

    //Re-render UI
    render();

}



function editItem(event) {

    const editBtn = event.target.closest(".editBtn");
    if (!editBtn) return;

    const li = editBtn.closest("li");
    if (!li) return;

    currentItemId = Number(li.dataset.id);

    const item = cart.find(post => post.id === currentItemId);
    if (!item) return;

    titleInput.value = item.title;
    contentInput.value = item.content;

    buttonSend.innerText = "Save";
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