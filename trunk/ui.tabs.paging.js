/*
Copyright (c) 2008, http://seyfertdesign.com/jquery/ui-tabs-paging.html

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var initialized = false;
$.extend($.ui.tabs.prototype, {
	paging: function(options) {
		var opts = {
			tabsPerPage: 0,
			nextButton: '&#187;',
			prevButton: '&#171;',
			follow: false,
			cycle: false
		};
		
		opts = jQuery.extend(opts, options);

		var self = this, initialized = false, currentPage, totalPages, 
			buttonWidth, containerWidth, allTabsWidth, tabWidths, 
			maxPageWidth, pages,  selectedTabPadding, 
			windowHeight = $(window).height(), 
			windowWidth = $(window).width(), 
			resizeTimer = null;
				
		function init() {
			allTabsWidth = 0, currentPage = 0, maxPageWidth = 0, buttonWidth = 0,
				pages = new Array(), tabWidths = new Array(), selectedTabPadding = 0;
		
			createButtons();
			
			containerWidth = $('ul:first',self.element).width();
				
			self.$lis.each(function(i) {
				tabWidths[i] = $(this).outerWidth({ margin: true });
				allTabsWidth += tabWidths[i];
				
				// determine if selected tab is larger than non-selected tab.
				if (i == self.options.selected) {
					selectedTabPadding = tabWidths[i] - self.$lis.eq(self.options.selected).removeClass('ui-tabs-selected').outerWidth({ margin: true }) + 1;
					if (selectedTabPadding < 0) selectedTabPadding = 0;
					self.$lis.eq(self.options.selected).addClass('ui-tabs-selected');					
				}
			});

			if (allTabsWidth > containerWidth) {
				var pageIndex = 0, pageWidth = 0;

				for (var i = 0; i < tabWidths.length; i++) {
					if (pages[pageIndex] == null) {
						pages[pageIndex] = { start: i };
					} else if ((i > 0 && (i % opts.tabsPerPage) == 0) || (tabWidths[i] + pageWidth + buttonWidth + 12) > containerWidth) {
						setMaxPageWidth(pageWidth, pageIndex);
						pageIndex++;
						pages[pageIndex] = { start: i };
											
						pageWidth = 0;
					}
					pages[pageIndex].end = i+1;
										
					if (i == self.options.selected) {
						selectedWidth = self.$lis.eq(self.options.selected).outerWidth({ margin: true })
						currentPage = pageIndex;
					}				
					pageWidth += tabWidths[i];
				}
				setMaxPageWidth(pageWidth, pageIndex);				
			}
			
			totalPages = pages.length;
			
			if (totalPages > 0) {
			    // hide all tabs then show tabs for current page
				self.$lis.hide().slice(pages[currentPage].start, pages[currentPage].end).show();
				if (currentPage == (totalPages - 1) && !opts.cycle) 
					disableButton('next');			
				if (currentPage == 0 && !opts.cycle) 
					disableButton('prev');
				
				buttonPadding = (containerWidth - maxPageWidth - buttonWidth) - 2;	
				if ($.browser.msie) buttonPadding -= 10;
 
				if (buttonPadding > 0) 
					$('.ui-tabs-paging-next', self.element).css({ paddingRight: buttonPadding + 'px' });
				initialized = true;
			} else {
				destroy();
			}
			
			$(window).bind('resize', handleResize);
		}
		
		function setMaxPageWidth(pageWidth, pageIndex) {
			// add different of selectedTab and unselect tab to 
			// total page width if tab is not selected in current page
			if (currentPage != pageIndex) 
				pageWidth += selectedTabPadding;
			
			if (pageWidth > maxPageWidth)
				maxPageWidth = pageWidth;
		}
		
		function page(direction) {					
			currentPage = currentPage + (direction == 'prev'?-1:1);
			
			if (direction == 'prev' && currentPage < 0 && opts.cycle)
				currentPage = totalPages-1;
			else if ((direction == 'prev' && currentPage < 0) || 
			         (direction == 'next' && currentPage >= totalPages))
				currentPage = 0;
			
			var start = pages[currentPage].start;
			var end = pages[currentPage].end;
			self.$lis.hide().slice(pages[currentPage].start, pages[currentPage].end).show();
			
			if (direction == 'prev') {
				enableButton('next');
				if (opts.follow && (self.options.selected < start || self.options.selected > (end-1))) self.select(end-1);
				if (!opts.cycle && start <= 0) disableButton('prev');
			} else {
				enableButton('prev');
				if (opts.follow && (self.options.selected < start || self.options.selected > (end-1))) self.select(start);
				if (!opts.cycle && end >= self.length()) disableButton('next');
			}
		}
		
		function createButtons() {
			$li = $('<li></li>')
				.addClass('ui-tabs-paging-next');
			$a = $('<a href="#"></a>')
				.click(function() { page('next'); return false; })
				.html(opts.nextButton);
			$li.append($a);
			
			self.$lis.eq(self.length()-1).after($li);
			buttonWidth = $li.outerWidth({ margin: true });
			
			$li = $('<li></li>')
				.addClass('ui-tabs-paging-prev');
			$a = $('<a href="#"></a>')
				.click(function() { page('prev'); return false; })
				.html(opts.prevButton);
			$li.append($a);
			
			self.$lis.eq(0).before($li);
			buttonWidth += $li.outerWidth({ margin: true });
		}
		
		function disableButton(direction) {
			$('.ui-tabs-paging-'+direction, self.element).addClass('ui-tabs-paging-disabled');
		}
		
		function enableButton(direction) {
			$('.ui-tabs-paging-'+direction, self.element).removeClass('ui-tabs-paging-disabled');
		}
		
		// special function defined to handle IE6 and IE7 resize issues
		function handleResize() {
			if (resizeTimer) clearTimeout(resizeTimer);
			
			if (windowHeight != $(window).height() || windowWidth != $(window).width()) 
				resizeTimer = setTimeout(reinit, 100);
		}
		
		function reinit() {	
			windowHeight = $(window).height();
			windowWidth = $(window).width();
			destroy();
			init();
		}
		
		function destroy() {	
			// remove buttons
			$('.ui-tabs-paging-next', self.element).remove();
			$('.ui-tabs-paging-prev', self.element).remove();
			
			// show all tabs
			self.$lis.show();
			
			initialized = false;

			$(window).unbind('resize', handleResize);
		}
		
		init();
		
		$.extend($.ui.tabs.prototype, {	
			pagingAdd: function(url, label, index) {
				if (initialized) {
					destroy();
					this.add(url, label, index);
					init();
				} else {
					this.add(url, label, index);
				}
			},
			pagingRemove: function(index) {
				if (initialized) {
					destroy();
					this.remove(index);
					init();
				} else 
					this.remove(index);
			},
			pagingDestroy: function() {
				destroy();
			}
		});

	}
});
