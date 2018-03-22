function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		var $column = $(`<div id=${self.id}>`).addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
		var $editColumn = $('<button>').addClass('btn-edit').text('Edit name column');

		$columnDelete.click(function() {
			self.removeColumn();
		});

		
		$editColumn.click(function() {
            self.columnEdit();
        });
		$columnAddCard.click(function(event) {
			var cardName = prompt('Enter the name of the card');
			event.preventDefault();
			if (cardName != null) {
				$.ajax({
					url: baseUrl + '/card/',
					method: 'POST',
					data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
					},
					success: function(response) {
						var card = new Card(response.id, cardName, self.id);
							self.addCard(card);		
					}
				});
			}
		});
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		$column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList)
			.append($editColumn);
		return $column;
		}
	}
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			var self = this;
			$.ajax({
			  url: baseUrl + '/column/' + self.id,
			  method: 'DELETE',
			  success: function(response){
				self.$element.remove();
			  }
			});
		},
		columnEdit: function() {
			var self = this;
			var newName = prompt('Enter new name of this column');
			if (newName !== null) {
				$.ajax({
					url: baseUrl + '/column/' + self.id,
					method: 'PUT',
					data: {
						name: newName
					},
					success: function(response) {
						self.$element.children('.column-title').text(newName);
						self.name = newName;
					}
				});
			} else this.name;	
		}
		
	};

