// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

if (taskInput && addTaskBtn && taskList) {

    const taskCounter = document.getElementById("taskCounter");

    // Store tasks in an array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Display tasks on the page
    function displayTasks() {

        taskList.innerHTML = "";

        tasks.forEach(function(task, index) {

            const li = document.createElement("li");

            const taskText = document.createElement("span");
            taskText.textContent = task.name;

            if (task.completed) {
                li.classList.add("completed");
            }

           

           // Create checkbox
const checkbox = document.createElement("input");

checkbox.type = "checkbox";
checkbox.checked = task.completed;

checkbox.addEventListener("change", function() {
    tasks[index].completed = checkbox.checked;

    saveTasks();
    displayTasks();
});

li.appendChild(checkbox);
 li.appendChild(taskText);

            // Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");

            deleteBtn.addEventListener("click", function(event) {
                event.stopPropagation();

                tasks.splice(index, 1);

                saveTasks();
                displayTasks();
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);

        });

        taskCounter.textContent = "Total tasks: " + tasks.length;
    }

    // Add a new task
    addTaskBtn.addEventListener("click", function() {

        const task = taskInput.value.trim();

        if (task === "") {
            alert("Please enter a task!");
            return;
        }

        tasks.push({
            name: task,
            completed: false
        });

        saveTasks();
        displayTasks();

        taskInput.value = "";
    });

    // Display previously saved tasks
    displayTasks();
}
// Get contact form elements

const contactForm = document.getElementById("contactForm");

const formFeedback = document.getElementById("formFeedback");
if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get user input
        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const message = document.getElementById("message").value.trim();

        // Check for empty fields
        if (name === "" || email === "" || phone === "" || message === "") {

            formFeedback.textContent = "Please fill in all fields.";

            formFeedback.style.color = "red";

            return;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formFeedback.textContent = "Please enter a valid email address.";

            formFeedback.style.color = "red";

            return;
        }

        // Validate phone number
        const phonePattern = /^\d+$/;

        if (!phonePattern.test(phone)) {

            formFeedback.textContent = "Phone number must contain digits only.";

            formFeedback.style.color = "red";

            return;
        }

        // Successful validation
        formFeedback.textContent = "Thank you for reaching out! I'll get in touch with you soon.";
        
        formFeedback.style.color = "green";

        contactForm.reset();

    });

}