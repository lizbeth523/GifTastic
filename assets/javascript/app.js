$(document).ready (function() {
	var apiKey = "c95c3ef03aa746f3b6ab73ddf5b85bd6";
	var gifUrl;
	var index = 0;
	var newGifDiv;
	var resultQty = 10;
	var topic;
	var topics = ["skydiving", "snorkeling", "eating", "fishing", "falling", "skateboarding", "dancing"];

	$(document).on("click", ".gif-finder-btn", function() {
		$("#gif-div").empty();
		topic = $(this).attr("data-topic");
		displayTopicInfo();
	});

	function displayTopicInfo() {
		$.ajax({
			url: "https://api.giphy.com/v1/gifs/search?q=" + topic +  "&api_key=" + apiKey + "&limit=" + resultQty,
			method: "GET"
		}).done( function(response) {
			console.log(response);
			for (var i = 0; i < resultQty; i++) {
				gifUrl = response.data[i].images.original_mp4.mp4;
				$("#gif-div-all").append("<video class='gif' loop><source src=" + gifUrl + " type='video/mp4'></video>");
			}
			$(".gif").on("click", function () {
				if (this.paused) {
					this.play();
				} 
				else {
					this.pause();
				}
			});
		});
	}

	function renderButtons() {
		while (index < topics.length) {
			$("#button-div").append("<button class='gif-finder-btn' data-topic='" + topics[index] + "'>" + topics[index] + "</button>");
			index++;
		}
	}

	// Calling the renderButtons function to display the initial list of movies
    renderButtons();
});