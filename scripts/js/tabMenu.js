function openTab(evt, tabcontentID) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i += 1) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i += 1) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabcontentID).style.display = "block";
    evt.className += " active";
}


$(document).ready(function () {
	var i, tabs = document.getElementsByClassName ("tablinks");
    for (i = 0; i < tabs.length; i += 1) {
		tabs [i].onclick = function() { 
			openTab (this, this.dataset.tab);
        };
		if (tabs [i].dataset.hasOwnProperty ('show')) {
			openTab (tabs [i], tabs [i].dataset.tab);
		}	
	}
});

