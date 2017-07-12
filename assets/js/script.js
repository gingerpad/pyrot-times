$(function(){

	var timezones = {
		people: []
		, init: function() {
			var me = this;

			me.PopulatePeople();

			me.DisplayPeople();
		}

		, PopulatePeople: function() {
			var me = this;

			me.people = [
				{ name: '',	IGN: 'GAME TIME', location: 'USA', timezone: 'US/Pacific' },
				{ name: 'Ray',	IGN: 'Rekon19', location: '??, USA', timezone: 'US/Mountain' },
				{ name: 'Elan',	IGN: 'es128', location: 'Miami, USA', timezone: 'US/Eastern' },
				{ name: '??', 	IGN: 'evolkill', location: '??, USA', timezone: 'US/Eastern' },
				{ name: '??',	IGN: 'jlewis8227', location: 'Kentucky, USA', timezone: 'US/Eastern' },
				{ name: 'Noel',	IGN: 'nellob', location: 'Washingto, D.C., USA', timezone: 'US/Eastern' },
				{ name: 'Nate',	IGN: 'Thatguy345', location: 'New York, USA', timezone: 'US/Eastern' },
				{ name: '??',	IGN: 'Light Magicians', location: 'Trinidad', timezone: 'America/Port_of_Spain' },
				{ name: 'Andy', 	IGN: 'Card64', location: 'Ipswich, UK', timezone: 'Europe/London' },
				{ name: '??', 	IGN: 'Frodo2801', location: '??', timezone: 'Europe/London' },
				{ name: 'Paddy', 	IGN: 'Gingerpad', location: 'Nottingham, UK', timezone: 'Europe/London' },
				{ name: '??', 	IGN: 'judgey43', location: 'Essex, UK', timezone: 'Europe/London' },
				{ name: '??', 	IGN: 'Karolis91', location: 'London, UK', timezone: 'Europe/London' },
				{ name: 'Kaylee', 	IGN: 'kaylee88', location: 'Nottingham, UK', timezone: 'Europe/London' },
				{ name: 'Matt', 	IGN: 'Morton666', location: 'Nottingham, UK', timezone: 'Europe/London' },
				{ name: 'Simon', 	IGN: 'SimonTheGoat', location: 'Derby, UK', timezone: 'Europe/London' },
				{ name: '??', 	IGN: 'Smivverz', location: 'Ipswich, UK', timezone: 'Europe/London' },
				{ name: '??', 	IGN: 'Spartan-AROO', location: 'UK', timezone: 'Europe/London' },
				{ name: '??', 	IGN: 'Stuart36', location: 'UK', timezone: 'Europe/London' },
				{ name: '??', 	IGN: 'The Slimline', location: 'UK', timezone: 'Europe/London' },
				{ name: '??', 	IGN: 'Toc.', location: 'Scotland, UK', timezone: 'Europe/London' },
				{ name: 'Stephen', 	IGN: 'Stephen Brady', location: 'Dublin, Ireland', timezone: 'Europe/Dublin' },
				{ name: '??', 	IGN: 'E.S.3', location: 'Albania', timezone: 'Europe/Tirane' },
				{ name: '??', 	IGN: 'Mister_K', location: 'Belgium', timezone: 'Europe/Brussels' },
				{ name: '??', 	IGN: 'Holm_1924', location: 'Denmark', timezone: 'Europe/Copenhagen' },
				{ name: '??', 	IGN: 'SamiTheGreat81', location: 'Finland', timezone: 'Europe/Helsinki' },
				{ name: '??', 	IGN: 'Dearh Avenger', location: 'Norway', timezone: 'Europe/Oslo' },
				{ name: 'Casper', 	IGN: 'Sathanas', location: 'Sweden', timezone: 'Europe/Stockholm' },
				{ name: 'Maheshin', 	IGN: 'KILLER_PLAYER', location: 'South Africa', timezone: 'Africa/Johannesburg' },
				{ name: 'Hiep', 	IGN: 'Rocky Cop', location: 'Singapore', timezone: 'Singapore' },
				{ name: '??', 	IGN: 'Virgin69', location: 'Philippines', timezone: 'Asia/Manila' }
				
			]
		}

		, DisplayPeople: function() {
			var me = this;

			for (var i = 0; i < me.people.length; i++) {
				var person = me.people[i];

				var container = $('<div class="person" data-timezone="' + person.timezone + '"></div>');

				var detailsContainer = $('<div class="details"></div>');

				var nameString = person.IGN;
				if(person.name != '') {
					nameString += ' (' + person.name + ')';
				}

				var name = $('<h1>' + nameString + '</h1>');
				var location = $('<p>' + person.location + '</p>');

				detailsContainer.append(name).append(location);
				
				var timeContainer = $('<div class="time"></div>');

				var clock = $('<div class="clock light"></div>');
				var display = $('<div class="display"></div>');
				var weekdays = $('<div class="weekdays"></div>');
				var ampm = $('<div class="ampm"></div>');
				var digitsCont = $('<div class="digits"></div>');

				var weekday_names = 'MON TUE WED THU FRI SAT SUN'.split(' ')

				$.each(weekday_names, function(){
					weekdays.append('<span>' + this + '</span>');
				});

				var digits = {};

				var positions = ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'];

				$.each(positions, function(){

					if(this == ':'){
						digitsCont.append('<div class="dots">');
					}
					else{

						var pos = $('<div>');

						for(var i=1; i<8; i++){
							pos.append('<span class="d' + i + '">');
						}

						// Set the digits as key:value pairs in the digits object
						//digits[this] = pos;

						// Add the digit elements to the page
						digitsCont.append(pos);
					}

				});

				display.append(weekdays).append(ampm).append(digitsCont);
				clock.append(display);

				timeContainer.append(clock);

				var weekdaysSpan = weekdays.find('.weekdays span');

				container.append(detailsContainer).append(timeContainer);

				$('.people').append(container);

				
			}

			me.SetupTimeticker();
		}

		, SetupTimeticker: function() {
			var me = this;

			setInterval(function() {
				me.UpdateTimes();
			}, 1000);
		}

		, UpdateTimes: function() {
			var me = this;

			//console.log('time update');

			var baseTime = new Date().toISOString();

			$('.person').each(function() {
				//$(this).find('.digits').empty();

				var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

				// Use moment.js to output the current time as a string
				// hh is for the hours in 12-hour format,
				// mm - minutes, ss-seconds (all with leading zeroes),
				// d is for day of week and A is for AM/PM

				var timezone = $(this).attr('data-timezone');
				//console.log(timezone);

				var now = moment.tz(baseTime, timezone).format("hhmmssdA");
				//console.log(now);

				var counter = 0;
				$(this).find('.digits div').not('.dots').each(function() {
					$(this).removeAttr('class').addClass(digit_to_name[now[counter]]);
					counter++;
				});

				// The library returns Sunday as the first day of the week.
				// Stupid, I know. Lets shift all the days one position down, 
				// and make Sunday last

				var dow = now[6];
				dow--;
				
				// Sunday!
				if(dow < 0){
					// Make it last
					dow = 6;
				}

				// Mark the active day of the week
				$(this).find('.weekdays span').removeClass('active').eq(dow).addClass('active');

				// Set the am/pm text:
				$(this).find('.ampm').text(now[7]+now[8]);
			});
		}

	}

	timezones.init();





	//console.log(moment.tz.names())
	//var nowISO = new Date().toISOString();
	//console.log(moment.tz(nowISO, 'Europe/London').format())



});