function updateStatistics() {
    let timesheets = document.getElementsByClassName("timesheet");
    let totalTimeSpent = 0;
    let totalTimeSpentOnProject = {};

    // Calculate total time spent on all projects
    for (let i = 0; i < timesheets.length; i++) {
        let projectNumber = parseInt(timesheets[i].id.split(":")[1], 10);
        let projectNameCell = timesheets[i].getElementsByTagName("td")[0];
        let minutesCell = timesheets[i].getElementsByTagName("td")[1];
        
        let projectName = projectNameCell.innerHTML;
        let minutesInt = parseInt(minutesCell.innerHTML, 10);
        totalTimeSpent += minutesInt

        if (!(projectNumber in totalTimeSpentOnProject)) {
            // Create a new object for the project
            totalTimeSpentOnProject[projectNumber] = { ProjectName: projectName, TotalMinutesSpent: 0, PercentageOfTotal: 0, TotalTimeSpent: "" }
        }

        // Add the total minutes spent on the project
        totalTimeSpentOnProject[projectNumber].TotalMinutesSpent += minutesInt
    }

    // Calculate the percentage of total time spent on each project
    for (const project of Object.keys(totalTimeSpentOnProject).sort()) {
        let percentage = Math.round((totalTimeSpentOnProject[project].TotalMinutesSpent / totalTimeSpent) * 100)
        let days = Math.floor(totalTimeSpentOnProject[project].TotalMinutesSpent / 1440)
        let hours = Math.floor((totalTimeSpentOnProject[project].TotalMinutesSpent % 1440) / 60)
        let minutes = totalTimeSpentOnProject[project].TotalMinutesSpent % 60
        totalTimeSpentOnProject[project].PercentageOfTotal = percentage
        totalTimeSpentOnProject[project].TotalTimeSpent = `${days}d ${hours}h ${minutes}m`
    }

    // Delete old rows from the statistics table
    let statistics = document.getElementById("statisticsTable");
    let rows = statistics.getElementsByClassName("statistics");
    while (rows.length > 0) {
        statistics.deleteRow(1);
    }

    // Add new rows with update statistics
    for (const project of Object.keys(totalTimeSpentOnProject)) {
        let row = statistics.insertRow(-1);
        row.className = "statistics";
        row.setAttribute("data-minutes", totalTimeSpentOnProject[project].TotalMinutesSpent);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = totalTimeSpentOnProject[project].ProjectName;
        cell2.innerHTML = totalTimeSpentOnProject[project].TotalTimeSpent;
        cell3.innerHTML = `${totalTimeSpentOnProject[project].PercentageOfTotal}%`;
    }

    // Update total time spent
    let totalTimeSpentCell = document.getElementById("totalTimeSpent");
    let days = Math.floor(totalTimeSpent / 1440)
    let hours = Math.floor((totalTimeSpent % 1440) / 60)
    let minutes = totalTimeSpent % 60
    totalTimeSpentCell.innerHTML = `${days}d ${hours}h ${minutes}m`
    
    // Save statistics to local storage
    saveStatisticsToLocalStorage();
}