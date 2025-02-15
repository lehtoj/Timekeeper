function addProject() {
    // Get the project number and name from the input fields
    let projectNumber = document.getElementById("newProjectNumber").value;
    let projectNumberInt = parseInt(projectNumber, 10);
    let projectName = document.getElementById("newProjectName").value;

    // Reset warnings
    document.getElementById("projectError").innerHTML = "";
    document.getElementById("newProjectNumber").style.borderColor = ""
    document.getElementById("newProjectName").style.borderColor = ""
    
    // Validate input
    if (projectNumber == "") {
        document.getElementById("projectError").innerHTML = "Project number must be filled";
        document.getElementById("newProjectNumber").style.borderColor = "red"
        return;
    }
    if (projectName == "") {
        document.getElementById("projectError").innerHTML = "Project name must be filled";
        document.getElementById("newProjectName").style.borderColor = "red"
        return;
    }
    else if (projectNumberInt < 1 || projectNumberInt > 99999) {
        document.getElementById("projectError").innerHTML = "Project number must be between 1 and 99999";
        document.getElementById("newProjectNumber").style.borderColor = "red"
        return;
    }
    else if (projectName.length < 8 || projectName.length > 128) {
        document.getElementById("projectError").innerHTML = "Project name must be between 8 and 128 characters";
        document.getElementById("newProjectName").style.borderColor = "red"
        return;
    }

    // Sanitize input
    projectName = sanitize(projectName);

    // Get all the projects from the project list
    let projects = document.getElementsByClassName("project");

    // Check if the project number or name already exists
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id == "p:" + projectNumber) {
            document.getElementById("projectError").innerHTML = "Project number already exists";
            document.getElementById("newProjectNumber").style.borderColor = "red"
            return;
        }
        else if (projects[i].getAttribute("data-name").toLowerCase() == projectName.toLowerCase()) {
            document.getElementById("projectError").innerHTML = "Project name already exists";
            document.getElementById("newProjectName").style.borderColor = "red"
            return;
        }
    }
    
    // Get current table
    let projectTable = document.getElementById("projectTable");
    
    // Create new project
    let newProject = projectTable.insertRow(-1);
    newProject.className = "project";
    newProject.id = "p:" + projectNumber;
    newProject.setAttribute("data-name", projectName);
    let deleteProjectButton = newProject.insertCell(0);
    let newProjectNumber = newProject.insertCell(1);
    let newProjectName = newProject.insertCell(2);
    deleteProjectButton.innerHTML = "<button onclick='removeProject(" + projectNumber + ")'>Delete</button>";
    newProjectNumber.innerHTML = projectNumber;
    newProjectName.innerHTML = projectName;

    sortHtmlTable("projectTable", 1);
    addProjectToDropdown(projectNumber, projectName);
    toggleTimesheetsDiv();
    saveProjectsToLocalStorage();
}

function addProjectToDropdown(projectNumber, projectName) {
    // Get dropdown menu
    let selectProject = document.getElementById("selectProject");
    
    // Create new option into the menu
    let newOption = document.createElement("option");
    newOption.value = projectNumber;
    newOption.text = projectName;
    selectProject.add(newOption);
}

function removeProject(projectNumber) {
    // Get the project from the project list
    let project = document.getElementById("p:" + projectNumber);
    let projectName = project.getAttribute("data-name");
    
    // Confirm the delete
    confirmation = confirm("Are you sure you want to delete project " + projectName + "? Deletion is irreversible.");

    // If confirmed, remove the project
    if (confirmation) {
        // Remove the project from the project list
        project.remove();

        removeProjectFromDropdown(projectNumber);
        toggleTimesheetsDiv();
        saveProjectsToLocalStorage();
    }
}

function removeProjectFromDropdown(projectNumber) {
    // Get dropdown menu
    let selectProject = document.getElementById("selectProject");
    
    // Remove the option from the menu
    for (let i = 0; i < selectProject.length; i++) {
        if (selectProject.options[i].value == projectNumber) {
            selectProject.remove(i);
            break;
        }
    }
}