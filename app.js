function create_tr(table_id) {
	let table_body = document.getElementById(table_id),
		first_tr = table_body.firstElementChild;
	tr_clone = first_tr.cloneNode(true);

	table_body.append(tr_clone);

	clean_first_tr(table_body.firstElementChild);
}
function clean_first_tr(firstTr) {
	let children = firstTr.children;

	children = Array.isArray(children) ? children : Object.values(children);
	children.forEach((x) => {
		if (x !== firstTr.lastElementChild) {
			x.firstElementChild.value = '';
		}
	});
}

function remove_tr(This) {
	if (This.closest('tbody').childElementCount == 1) {
		alert("You Don't have Permission to Delete This ?");
	} else {
		This.closest('tr').remove();
	}
}

const plus = document.querySelector('.success');
const minus = document.querySelector('.danger');
const num = document.querySelector('.num');
const download = document.querySelector('.download');

let a = 1;

plus.addEventListener('click', () => {
	a++;
	a = a < 10 ? '0' + a : a;
	// num.innerText = a;
});

minus.addEventListener('click', () => {
	if (a > 1) {
		a--;
		a = a < 10 ? '0' + a : a;
		// num.innerText = a;
	}
});

download.addEventListener('click', () => {
	tableToCSV();
});

function tableToCSV() {
	// Variable to store the final csv data
	var csv_data = [];

	// Get each row data
	var rows = document.getElementsByTagName('tr');
	for (var i = 0; i < rows.length; i++) {
		// Get each column data
		var cols = rows[i].querySelectorAll('td,th');

		// Stores each csv row data
		var csvrow = [];
		for (var j = 0; j < cols.length; j++) {
			// Get the text data of each cell
			// of a row and push it to csvrow
			if (cols[j].nodeName === 'TH') {
				if (cols[j].firstElementChild === null) csvrow.push(cols[j].innerHTML);
			} else {
				if (
					cols[j].firstElementChild.nodeName === 'INPUT' ||
					cols[j].firstElementChild.nodeName === 'TEXTAREA'
				) {
					csvrow.push(cols[j].firstElementChild.value);
				}
			}
		}

		// Combine each column value with comma
		csv_data.push(csvrow.join(','));
	}

	// Combine each row data with new line character
	csv_data = csv_data.join('\n');

	// Call this function to download csv file
	downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
	// Create CSV file object and feed
	// our csv_data into it
	CSVFile = new Blob([csv_data], {
		type: 'text/csv'
	});

	// Create to temporary link to initiate
	// download process
	var temp_link = document.createElement('a');

	// Download csv file
	temp_link.download = 'GfG.csv';
	var url = window.URL.createObjectURL(CSVFile);
	temp_link.href = url;

	// This link should not be displayed
	temp_link.style.display = 'none';
	document.body.appendChild(temp_link);

	// Automatically click the link to
	// trigger download
	temp_link.click();
	document.body.removeChild(temp_link);
}

/* function SubForm (){
            $.ajax({
                url:'https://api.apispreadsheets.com/data/410/',
                type:'post',
                data:$("#myForm").serializeArray(),
                success: function(){
                  alert("Form Data Submitted :)")
                },
                error: function(){
                  alert("There was an error :(")
                }
            });
        }*/
