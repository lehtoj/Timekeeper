// https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortHtmlTable(tableId, columnNumber) {
    // Initialize variables
    var table, rows, switching, i, x, y, shouldSwitch;
    
    // Get the table
    table = document.getElementById(tableId);
    
    // Set the switching flag to true
    switching = true;

    // Loop until no more switching is needed
    while (switching) {
        switching = false;
        
        // Loop through all rows in the table except the first and last
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            
            // Get current and next row to compare
            x = rows[i].getElementsByTagName("td")[columnNumber];
            y = rows[i + 1].getElementsByTagName("td")[columnNumber];
            
            // Check if the two rows should switch places
            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        
        // If a switch is needed, switch the rows and continue the loop
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

// https://stackoverflow.com/questions/2794137/sanitizing-user-input-before-adding-it-to-the-dom-in-javascript
function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
 }

 function toggleHelp() {
    const helpDiv = document.getElementById('helpDiv');
    if (helpDiv.style.display === 'none' || helpDiv.style.display === '') {
        helpDiv.style.display = 'block';
    } else {
        helpDiv.style.display = 'none';
    }
}

window.onload = function() {
    loadProjectsFromLocalStorage();
    loadTimeSheetsFromLocalStorage();
    loadStatisticsFromLocalStorage();
    loadTimerFromLocalStorage();
    loadTimerFromLocalStorage();
    toggleTimesheetsDiv();
};