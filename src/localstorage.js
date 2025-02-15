function saveProjectsToLocalStorage(){
    // Save projects from projectsTable to local storage
    var projectsTable = document.getElementById("projectTable");
    var projects = projectsTable.getElementsByClassName("project");
    var projectsArray = [];
    
    for (let i = 0; i < projects.length; i++) {
        let projectNumber = projects[i].id.split(":")[1];
        let projectName = projects[i].getAttribute("data-name");
        //console.debug("Saving " + projectName + " from projectTable to local storage");
        projectsArray.push({ ProjectNumber: projectNumber, ProjectName: projectName });
    }
    
    localStorage.setItem("projects", JSON.stringify(projectsArray));
    
    // Save projects from selectProject to local storage
    var selectProject = document.getElementById("selectProject");
    var options = selectProject.getElementsByTagName("option");
    var optionsArray = [];

    for (let i = 0; i < options.length; i++) {
        let projectNumber = options[i].value;
        let projectName = options[i].text;
        //console.debug("Saving " + projectName + " from selectProject to local storage");
        optionsArray.push({ ProjectNumber: projectNumber, ProjectName: projectName });
    }

    localStorage.setItem("selectProject", JSON.stringify(optionsArray));
}

function saveTimeSheetsToLocalStorage() {
    // Save timesheets from timesheetTable to local storage
    var timesheetTable = document.getElementById("timesheetTable");
    var timesheets = timesheetTable.getElementsByClassName("timesheet");
    var timesheetsArray = [];
    
    for (let i = 0; i < timesheets.length; i++) {
        let projectNumber = timesheets[i].id.split(":")[1];
        let projectName = timesheets[i].getElementsByTagName("td")[0].innerHTML;
        let minutes = timesheets[i].getElementsByTagName("td")[1].innerHTML;
        let description = timesheets[i].getElementsByTagName("td")[2].innerHTML;
        //console.debug("Saving " + projectName + " from timesheetTable to local storage");
        timesheetsArray.push({ ProjectNumber: projectNumber, ProjectName: projectName, Minutes: minutes, Description: description });
    }
    
    localStorage.setItem("timesheets", JSON.stringify(timesheetsArray));
}

function saveStatisticsToLocalStorage() {
    // Save statistics from statisticsTable to local storage
    var statisticsTable = document.getElementById("statisticsTable");
    var statistics = statisticsTable.getElementsByClassName("statistics");
    var statisticsArray = [];
    
    for (let i = 0; i < statistics.length; i++) {
        let projectName = statistics[i].getElementsByTagName("td")[0].innerHTML;
        let totalTimeSpent = statistics[i].getElementsByTagName("td")[1].innerHTML;
        let percentageOfTotal = statistics[i].getElementsByTagName("td")[2].innerHTML;
        let minutes = parseInt(statistics[i].getAttribute("data-minutes"), 10);
        //console.debug("Saving " + projectName + " from statisticsTable to local storage");
        statisticsArray.push({ ProjectName: projectName, TotalTimeSpent: totalTimeSpent, PercentageOfTotal: percentageOfTotal, TotalMinutesSpent: minutes });
    }
    
    localStorage.setItem("statistics", JSON.stringify(statisticsArray));

    // Save total time spent to local storage
    var totalTimeSpent = document.getElementById("totalTimeSpent").innerHTML;
    //console.debug("Saving totalTimeSpent from statisticsTable to local storage");
    localStorage.setItem("totalTimeSpent", totalTimeSpent);
}

function loadProjectsFromLocalStorage() {
    // Load projects from local storage to projectsTable
    var projects = JSON.parse(localStorage.getItem("projects"));
    
    if (projects != null) {
        var projectTable = document.getElementById("projectTable");
        for (let i = 0; i < projects.length; i++) {
            let newProject = projectTable.insertRow(-1);
            newProject.className = "project";
            newProject.id = "p:" + projects[i].ProjectNumber;
            newProject.setAttribute("data-name", projects[i].ProjectName);
            newProject.insertCell(0);
            newProject.insertCell(1);
            let deleteButtonCell = newProject.insertCell(0);
            let projectNumberCell = newProject.insertCell(1);
            let projectNameCell = newProject.insertCell(2);
            deleteButtonCell.innerHTML = "<button onclick='removeProject(" + projects[i].ProjectNumber + ")'>Delete</button>";
            projectNumberCell.innerHTML = projects[i].ProjectNumber;
            projectNameCell.innerHTML = projects[i].ProjectName;
            //console.debug("Loaded " + projects[i].ProjectName + " from local storage to projectTable");
        }
    }

    // Load projects from local storage to selectProject
    var selectProject = document.getElementById("selectProject");
    var options = JSON.parse(localStorage.getItem("selectProject"));
    
    if (options != null) {
        for (let i = 0; i < options.length; i++) {
            let newOption = document.createElement("option");
            newOption.value = options[i].ProjectNumber;
            newOption.text = options[i].ProjectName;
            selectProject.add(newOption);
            //console.debug("Loaded " + newOption.text + " from local storage to selectProject");
        }
    }
}

function loadTimeSheetsFromLocalStorage() {
    // Load timesheets from local storage to timesheetTable
    var timesheets = JSON.parse(localStorage.getItem("timesheets"));
    
    if (timesheets != null) {
        var timesheetTable = document.getElementById("timesheetTable");
        for (let i = 0; i < timesheets.length; i++) {
            let newRow = timesheetTable.insertRow(-1);
            newRow.className = "timesheet";
            newRow.id = "ts:" + timesheets[i].ProjectNumber;
            let nameCell = newRow.insertCell(0);
            let timeCell = newRow.insertCell(1);
            let descriptionCell = newRow.insertCell(2);
            nameCell.innerHTML = timesheets[i].ProjectName;
            timeCell.innerHTML = timesheets[i].Minutes;
            descriptionCell.innerHTML = timesheets[i].Description;
            //console.debug("Loaded " + timesheets[i].ProjectName + " from local storage to timesheetTable");
        }
    }
}

function loadStatisticsFromLocalStorage() {
    // Load statistics from local storage to statisticsTable
    var statistics = JSON.parse(localStorage.getItem("statistics"));
    
    if (statistics != null) {
        var statisticsTable = document.getElementById("statisticsTable");
        for (let i = 0; i < statistics.length; i++) {
            let row = statisticsTable.insertRow(-1);
            row.className = "statistics";
            row.setAttribute("data-minutes", statistics[i].TotalMinutesSpent);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = statistics[i].ProjectName;
            cell2.innerHTML = statistics[i].TotalTimeSpent;
            cell3.innerHTML = statistics[i].PercentageOfTotal;
            //console.debug("Loaded " + statistics[i].ProjectName + " from local storage to statisticsTable");
        }
    }
    
    // Load total time spent from local storage
    var totalTimeSpent = localStorage.getItem("totalTimeSpent");
    
    if (totalTimeSpent != null) {
        document.getElementById("totalTimeSpent").innerHTML = totalTimeSpent;
        //console.debug("Loaded totalTimeSpent from local storage to totalTimeSpent");
    }
}

function resetLocalStorage() {
    localStorage.clear();
    location.reload();
    //console.debug("Local storage cleared");
}