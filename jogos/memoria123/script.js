
(function () {

	var Memory = {

		init: function (cards) {
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function (cardsArray) {
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function () {
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
			this.guess = null;
			this.binding();
		},

		binding: function () {
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function () {
			var _ = Memory;
			var $card = $(this);
			if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
				$card.find(".inside").addClass("picked");
				$card.find(".titulocarta").addClass("textopicado");
				if (!_.guess) {
					_.guess = $(this).attr("data-id");
				} else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function () {
						$(".picked").removeClass("picked");
						$(".titulocarta").removeClass("textopicado");
						Memory.paused = false;
					}, 600);
					
					
				}
				if ($(".matched").length == $(".card").length) {
					_.win();
				}
			}
		},

		win: function () {
			this.paused = true;
			setTimeout(function () {
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function () {
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function () {
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function () {
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function (array) {
			var counter = array.length, temp, index;
			// While there are elements in the array
			while (counter > 0) {
				// Pick a random index
				index = Math.floor(Math.random() * counter);
				// Decrease counter by 1
				counter--;
				// And swap the last element with it
				temp = array[counter];
				array[counter] = array[index];
				array[index] = temp;
			}
			return array;
		},
		buildHTML: function () {
			var frag = '';
			var jafoi = [];
			var cont = 1;
			this.$cards.each(function (k, v) {
				if (!jafoi.includes(v.id)) {
					frag += '<div class="card" data-id="' + v.id + '"><div class="inside"><p class="titulocarta"> Carta: '+cont+'</p>\
				<div class="front"><img src="'+ v.img + '"\
				alt="'+ v.name + '" /></div>\
				<div class="back"><img src="frentecard/1.png" id="centro"\
				alt="Codepen" /></div></div>\
				</div>';
					jafoi.push(v.id);
				} else {
					var imgsrc = v.img;
					imgsrc = imgsrc.replace('.png','par.png');
					frag += '<div class="card" data-id="' + v.id + '"><div class="inside"><p class="titulocarta">Carta: '+cont+'</p>\
				<div class="front"><img src="'+ imgsrc + '"\
				alt="'+ v.name + '" /></div>\
				<div class="back"><img src="frentecard/1.png" id="centro"\
				alt="Codepen" /></div></div>\
				</div>';
				}
				cont+=1;

			});
			return frag;
		}
	};
	var cards = [
		{
			name: "php",
			img: "imagens/1.png",
			id: 1,
		},
		{
			name: "css3",
			img: "imagens/2.png",
			id: 2
		},
		{
			name: "html5",
			img: "imagens/3.png",
			id: 3
		},
		{
			name: "jquery",
			img: "imagens/4.png",
			id: 4
		},
		{
			name: "javascript",
			img: "imagens/5.png",
			id: 5
		},
		{
			name: "node",
			img: "imagens/6.png",
			id: 6
		},
		{
			name: "photoshop",
			img: "imagens/7.png",
			id: 7
		},
		{
			name: "python",
			img: "imagens/8.png",
			id: 8
		},
		{
			name: "rails",
			img: "imagens/9.png",
			id: 9
		},
		{
			name: "sass",
			img: "imagens/10.png",
			id: 10
		},
		{
			name: "sublime",
			img: "imagens/11.png",
			id: 11
		},
		{
			name: "wordpress",
			img: "imagens/12.png",
			id: 12
		},
	];

	Memory.init(cards);


})();