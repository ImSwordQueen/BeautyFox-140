// ==UserScript==
// @name        BeautyFox - Menu Creator
// @author      AngelBruni
// @loadorder   1
// ==/UserScript==

// ATTENTION: Most of this code is TERRIBLE, no worries, Geckium will bring a better one.

function dispatchCommand(cmd) {
	const dispatch = {
		'BrowserDownloadsUI();':                                            () => BrowserDownloadsUI(),
		'BrowserFullScreen();':                                             () => BrowserFullScreen(),
		'BrowserOffline.toggleOfflineStatus();':                            () => BrowserOffline.toggleOfflineStatus(),
		'BrowserOpenAddonsMgr();':                                          () => BrowserOpenAddonsMgr(),
		'BrowserPageInfo();':                                               () => BrowserPageInfo(),
		'BrowserViewSource(window.gBrowser.selectedBrowser)':              () => BrowserViewSource(window.gBrowser.selectedBrowser),
		'FullZoom.enlarge()':                                               () => FullZoom.enlarge(),
		'FullZoom.reduce()':                                                () => FullZoom.reduce(),
		'FullZoom.setZoom(.5)':                                             () => FullZoom.setZoom(.5),
		'FullZoom.setZoom(.75)':                                            () => FullZoom.setZoom(.75),
		'FullZoom.setZoom(1)':                                              () => FullZoom.setZoom(1),
		'FullZoom.setZoom(1.25)':                                           () => FullZoom.setZoom(1.25),
		'FullZoom.setZoom(1.5)':                                            () => FullZoom.setZoom(1.5),
		'FullZoom.setZoom(2)':                                              () => FullZoom.setZoom(2),
		'FullZoom.setZoom(4)':                                              () => FullZoom.setZoom(4),
		'MailIntegration.sendLinkForBrowser(gBrowser.selectedBrowser);':   () => MailIntegration.sendLinkForBrowser(gBrowser.selectedBrowser),
		'OpenBrowserWindow();':                                             () => OpenBrowserWindow(),
		'OpenBrowserWindow({private: true});':                              () => OpenBrowserWindow({private: true}),
		'PrintUtils.togglePrintPreview(gBrowser.selectedBrowser.browsingContext);': () => PrintUtils.togglePrintPreview(gBrowser.selectedBrowser.browsingContext),
		'Sanitizer.showUI(window);':                                        () => Sanitizer.showUI(window),
		'SessionStore.restoreLastSession();':                               () => SessionStore.restoreLastSession(),
		'findMoreAccelerators();':                                          () => findMoreAccelerators(),
		'gBrowser.toggleCaretBrowsing()':                                   () => gBrowser.toggleCaretBrowsing(),
		'gCustomizeMode.enter();':                                          () => gCustomizeMode.enter(),
		'gLazyFindCommand(\'onFindCommand\')':                              () => gLazyFindCommand('onFindCommand'),
		'gPageStyleMenu.disableStyle();':                                   () => gPageStyleMenu.disableStyle(),
		'gPageStyleMenu.switchStyleSheet(null);':                           () => gPageStyleMenu.switchStyleSheet(null),
		'gProtectionsHandler.openPreferences()':                            () => gProtectionsHandler.openPreferences(),
		'goDoCommand(\'cmd_cut\')':                                         () => goDoCommand('cmd_cut'),
		'goDoCommand(\'cmd_copy\')':                                        () => goDoCommand('cmd_copy'),
		'goDoCommand(\'cmd_paste\')':                                       () => goDoCommand('cmd_paste'),
		'mailWithWindowsLive()':                                            () => mailWithWindowsLive(),
		'openAboutIE();':                                                   () => openAboutIE(),
		'openBeautyFoxOptionsDialog();':                                    () => openBeautyFoxOptionsDialog(),
		'openHelpLink(\'firefox-help\');':                                  () => openHelpLink('firefox-help'),
		'openInternetOptions();':                                           () => openInternetOptions(),
		'openWhatsNewIE();':                                                () => openWhatsNewIE(),
		'openWindowsUpdate()':                                              () => openWindowsUpdate(),
		'reportUnsafeWebsite();':                                           () => reportUnsafeWebsite(),
		'runFile("msdt.exe", "-skip TRUE -path C:\\\\Windows\\\\diagnostics\\\\system\\\\networking -ep NetworkDiagnosticsConnectivity")': () => runFile("msdt.exe", "-skip TRUE -path C:\\Windows\\diagnostics\\system\\networking -ep NetworkDiagnosticsConnectivity"),
		'saveBrowser(gBrowser.selectedBrowser);':                           () => saveBrowser(gBrowser.selectedBrowser),
		'sendFeedbackLink();':                                              () => sendFeedbackLink(),
		'translatePage()':                                                  () => translatePage(),
		'toggleToolbar(\'toolbar-menubar\');':                              () => toggleToolbar('toolbar-menubar'),
		'toggleToolbar(\'commandBar\');':                                   () => toggleToolbar('commandBar'),
		'BookmarkingUI.toggleBookmarksToolbar(\'shortcut\');':              () => BookmarkingUI.toggleBookmarksToolbar('shortcut'),
		'SidebarUI.toggle(\'viewBookmarksSidebar\');':                      () => SidebarUI.toggle('viewBookmarksSidebar'),
		'SidebarUI.toggle(\'viewHistorySidebar\')':                         () => SidebarUI.toggle('viewHistorySidebar'),
		'SidebarUI.toggle(\'viewTabsSidebar\');':                           () => SidebarUI.toggle('viewTabsSidebar'),
		'_ucUtils.loadURI(window,{url: \'chrome://userchrome/content/temppages/changelogs/ob-1.0.2.html\', where: \'tab\'});': () => _ucUtils.loadURI(window, {url: 'chrome://userchrome/content/temppages/changelogs/ob-1.0.2.html', where: 'tab'}),
	};
	const fn = dispatch[cmd.trim()];
	if (fn) { fn(); }
	else { console.warn('BeautyFox menuCreator: unknown command:', cmd); }
}

function createMenu(menuData) {
	try {
		var externalBtn = document.createXULElement('toolbarbutton');
		externalBtn.id = menuData.id + 'Button';
		if (!menuData.locale == "") { externalBtn.setAttribute('locale', menuData.locale); }
		externalBtn.style.listStyleImage = menuData.image;
		setAttributes(externalBtn, {
			'label':     menuData.name,
			'type':      'menu',
			'removable': true
		})
		if (menuData.classes) {
			if (Array.isArray(menuData.classes)) { externalBtn.classList.add(...menuData.classes); }
			else { externalBtn.classList.add(menuData.classes); }
		}
		externalBtn.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			if (event.target === externalBtn) {
				if (event.shiftKey) {
					menuData._externalAppPopup.querySelectorAll('[special="true"]').forEach((item) => {
						item.style.display = 'flex';
					});
				} else {
					menuData._externalAppPopup.querySelectorAll('[special="true"]').forEach((item) => {
						item.style.display = 'none';
					});
				}
			}
		});

		document.getElementById('nav-bar-customization-target').appendChild(externalBtn);

		var externalPopup = document.createXULElement('menupopup');
		setAttributes(externalPopup, {
			'id':       menuData.id + 'PopUp',
			'position': 'bottomright topright'
		})
		externalBtn.appendChild(externalPopup);
		for (var i = 0; i < menuData.items.length; i++) { createMenuItem(externalPopup, menuData.items[i]); }

		menuData._externalAppPopup = externalPopup;
		menuData._isready = false;
		menuData.handleRelativePath = (items) => {
			const { Classes } = Components;
			const { Ci } = Components.interfaces;

			items.forEach((item, i) => {
				if (item.path) {
					item.path = item.path.replace(/\//g, '\\').toLocaleLowerCase();
					const ffdir = Classes['@mozilla.org/file/directory_service;1']
						.getService(Ci.nsIProperties)
						.get('ProfD', Ci.nsIFile).path;
					if (/^(\\)/.test(item.path)) { item.path = ffdir + item.path; }
				}
			})
		};
		menuData.init = function () {
			menuData.handleRelativePath(menuData.getAllApps());
			menuData.onpopupshowing();
		};
		menuData.onpopupshowing = () => {
			if (menuData._isready) return;
			if (menuData._externalAppPopup === null) return;
			// FIXME: Clear existing items before adding them again because this code is being a bitch and adding the entries in the menu twice???
			while (menuData._externalAppPopup.hasChildNodes()) { menuData._externalAppPopup.removeChild(menuData._externalAppPopup.firstChild); }
			menuData.items.forEach((item) => createMenuItem(menuData._externalAppPopup, item));
			menuData._isready = true;
		};
		menuData.getAllApps = function () {
			var apps = [];
			for (var i = 0; i < menuData.items.length; i++) {
				if (menuData.items[i].type === 'app') { apps.push(menuData.items[i]); }
				else if (menuData.items[i].type === 'subdir') { apps = apps.concat(menuData.items[i].items.filter(item => item.type === 'app')); }
			}
			return apps;
		};
		return menuData;
	} catch (e) { console.error(e); }
}

function createMenuItem(parent, item) {
	if (item.type === 'subdir') {
		var subDirItem = parent.appendChild(document.createXULElement('menu'));
		if (!item.locale == "") { subDirItem.setAttribute('locale', item.locale); }
		setAttributes(subDirItem, {
			'class':	'menu-iconic',
			'id':		item.id,
			'label':	item.name,
			'image':	item.image
		})
		if (item.special) { subDirItem.setAttribute('special', item.special); subDirItem.style.display = 'none'; }

		var subDirPopup = document.createXULElement('menupopup');
		for (var j = 0; j < item.items.length; j++) { createMenuItem(subDirPopup, item.items[j]); }
		subDirItem.appendChild(subDirPopup);
	} else if (item.type === 'app') {
		var appsItems = document.createXULElement('menuitem');
		setAttributes(appsItems, {
			'class': 'menuitem-iconic',
			'id':    item.id,
			'label': item.name,
			'image': item.image
		})
		appsItems.addEventListener('command', () => { dispatchCommand(item.command); });
		if (item.special) {
			appsItems.setAttribute('special', item.special);
			appsItems.style.display = 'none';
		}
		if (!item.locale == "") { appsItems.setAttribute('locale', item.locale); }
		if (item.accelText) { appsItems.setAttribute('acceltext', item.accelText); }
		parent.appendChild(appsItems);
	} else if (item.type === 'separator') {
		var separator = document.createXULElement('menuseparator');
		parent.appendChild(separator);

		if (item.special) {
			separator.setAttribute('special', item.special);
			separator.style.display = 'none';
		}
	}
}