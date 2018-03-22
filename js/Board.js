var board = {
	name: 'Kanban Board',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

$('.create-column').click(function() {
	var columnName = prompt('Enter a column name');
	if (columnName !== null) {
		$.ajax({
			url: baseUrl + '/column/',
			method: 'POST',
			data: {
				name: columnName
			},
			success: function(response){
				var column = new Column(response.id, columnName);
				board.addColumn(column);
			}
		});
	}	
});
	
	function initSortable() {
		
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder',
			receive: function(event, ui) {
				console.log('event', event.target.parentElement);
				console.log('ui', ui.item[0]);
				var item = ui.item[0];
				var name = item.querySelector('p').innerText;
				var column = event.target.parentElement;
				console.log('name: ', name);
				$.ajax({
					url: baseUrl + '/card/' + item.id,
					method: 'PUT',
					data: {
						name: name,
						bootcamp_kanban_column_id: column.id 
					},
					success: function(response) {
						console.log('sortable');
					}	
				});
			}		
		}).disableSelection();
		
	}
