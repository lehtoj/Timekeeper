function toggleTimesheetsDiv() {
    const projectTable = document.getElementById('projectTable');
    const timesheetsDiv = document.getElementById('timesheetsDiv');
    const projectRows = projectTable.getElementsByTagName('tr').length;

    // Hide timesheets div if there are no projects and show if there are
    if (projectRows > 1) {
        timesheetsDiv.style.display = 'block';
    } else {
        timesheetsDiv.style.display = 'none';
    }
}

function addTimesheet() {
    // Get the project number and time spent from the input fields
    let dropdown = document.getElementById("selectProject");
    let projectName = dropdown.options[dropdown.selectedIndex].text;
    let projectNumber = dropdown.options[dropdown.selectedIndex].value;
    let timeSpent = document.getElementById("timeSpent").value;
    let timeSpentInt = parseInt(timeSpent, 10);
    let description = document.getElementById("description").value;

    // Reset warnings
    document.getElementById("projectError").innerHTML = "";
    document.getElementById("selectProject").style.borderColor = ""
    document.getElementById("timeSpent").style.borderColor = ""
    document.getElementById("description").style.borderColor = ""

    // Validate input
    if (projectNumber == "") {
        document.getElementById("timesheetError").innerHTML = "Project number must be filled";
        document.getElementById("selectProject").style.borderColor = "red"
        return;
    }
    else if (timeSpent == "") {
        document.getElementById("timesheetError").innerHTML = "Time spent must be filled";
        document.getElementById("timeSpent").style.borderColor = "red"
        return;
    }
    else if (description == "") {
        document.getElementById("timesheetError").innerHTML = "Description must be filled";
        document.getElementById("description").style.borderColor = "red"
        return;
    }
    else if (timeSpentInt < 1 || timeSpentInt > 1440) {
        document.getElementById("timesheetError").innerHTML = "Time spent must be between 1 and 1440 minutes (24 hours)";
        document.getElementById("timeSpent").style.borderColor = "red"
        return;
    }

    // Sanitize input
    description = sanitize(description);

    // Get all saved projects
    let projects = document.getElementsByClassName("project");

    // Check if the project number exists
    let projectExists = false;
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id == "p:" + projectNumber) {
            projectExists = true;
            break;
        }
    }
    if (!projectExists) {
        document.getElementById("timesheetError").innerHTML = "Project number does not exist";
        return;
    }
    else {
        document.getElementById("timesheetError").innerHTML = "";
    }

    // Create new timesheet
    let timesheetTable = document.getElementById("timesheetTable");
    let newRow = timesheetTable.insertRow(-1);
    newRow.className = "timesheet";
    newRow.id = "ts:" + projectNumber;
    let nameCell = newRow.insertCell(0);
    let timeCell = newRow.insertCell(1);
    let descriptionCell = newRow.insertCell(2);
    nameCell.innerHTML = projectName;
    timeCell.innerHTML = timeSpent;
    descriptionCell.innerHTML = description;

    // Update statistics
    updateStatistics();

    // Save timesheets to local storage
    saveTimeSheetsToLocalStorage();
}