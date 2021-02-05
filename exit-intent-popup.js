ExitIntentPopup = {
	init: function(){
		ExitIntentPopup.addEvent(document, "mouseout", function(e) {
			e = e ? e : window.event;

			// If this is an autocomplete element.
			if(e.target.tagName.toLowerCase() == "input")
			{
				return;
			}


			// Get the current viewport width.
			let vpWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

			// If the current mouse X position is within 50px of the right edge
			// of the viewport, return.
			if(e.clientX >= (vpWidth - 50))
			{
				return;
			}

			// If the current mouse Y position is not within 50px of the top
			// edge of the viewport, return.
			if(e.clientY >= 50)
			{
				return;
			}

			// Reliable, works on mouse exiting window and
			// user switching active program
			let from = e.relatedTarget || e.toElement;

			let modalWidth = 200;
			let modalHeight = 200;
			if (from)
			{
				return;
			}
			let cookie = ExitIntentPopup.getCookie("ExitIntentPopup");
			if (cookie === "")
			{
				ExitIntentPopup.setCookie("ExitIntentPopup", '1', 'none', 0);

				$.blockUI.defaults.css = {};
				$.blockUI({
					message       : "<div style='width: " + modalWidth + "px; height: " + modalHeight + "px;background-color: crimson; color: white;padding: 5px;text-align: center;'>Exit Intent Popup</div>",
					css           : {
						left: parseInt(($(window).width() / 2)),
						top : modalHeight
					},
					onOverlayClick: $.unblockUI,
				});
			}
		});
	},
	addEvent: function(obj, evt, fn) {
		if (obj.addEventListener)
		{
			obj.addEventListener(evt, fn, false);
		}
		else if (obj.attachEvent)
		{
			obj.attachEvent("on" + evt, fn);
		}
	},
	getCookie: function(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++)
		{
			let c = ca[i];
			while (c.charAt(0) == ' ')
			{
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0)
			{
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	setCookie: function(cname, cvalue, type, val) {
		if (type == 'minute')
		{
			let d = new Date();
			d.setTime(d.getTime() + (val * 60 * 1000));
			let expires = "expires="+ d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		}
		else if (type == 'day')
		{
			let d = new Date();
			d.setTime(d.getTime() + (val * 24 * 60 * 60 * 1000));
			let expires = "expires="+ d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		}
		else if ('none')
		{
			document.cookie = cname + "=" + cvalue + ";path=/";
		}
	}
};
