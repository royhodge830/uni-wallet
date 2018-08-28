$(document).ready(function(){
	$('.selectBgImg').click(function(e) { 
		dialog.showOpenDialog((fileNames) => {
		// fileNames is an array that contains all the selected
		if(fileNames === undefined){
			console.log("No file selected");
			return;
		}

		fs.readFile(filepath, 'utf-8', (err, data) => {
			if(err){
				alert("An error ocurred reading the file :" + err.message);
				return;
			}

			// Change how to handle the file content
			console.log("The file content is : " + data);
			});
		});
		 

		// Note that the previous example will handle only 1 file, if you want that the dialog accepts multiple files, then change the settings:
		// And obviously , loop through the fileNames and read every file manually
		dialog.showOpenDialog({ 
			properties: [ 
				'openFile', 'multiSelections', (fileNames) => {
					console.log(fileNames);
				}
			]
		});

	});
	$('.changeBgImg').click(function(e) { 
		e.preventDefault();
		document.body.style.backgroundColor = "#fff";
	});
});