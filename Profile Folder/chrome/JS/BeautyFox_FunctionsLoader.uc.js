// ==UserScript==
// @name        BeautyFox - Functions Loader
// @description Loads functions after "load" so no issues arise.
// @author      AngelBruni
// @loadorder   2
// ==/UserScript==

const { ctypes } = ChromeUtils.importESModule("resource://gre/modules/ctypes.sys.mjs");

if (location == "chrome://browser/content/browser.xhtml" || location == "chrome://bfwindows/content/options/index.xhtml") {
	function executeFunctions() {
		// TODO: Change menu entries with IE ones;
		// TODO: Modals to dialogs;
		// TODO: Make Windows-only code execute only in Windows.
		launchBeautyFoxWizard();
		setNavButtonsRadius();
		createFeedbackButton();
		createNewAndEndToolbar();
		fixTabs();
		urlbarContainerBackgroundOnMouseAttrs();
		removeReloadWhenTyping();
		changeUrlbarFakeDropdownStyling();
		addEllipsesSearch();
		insertMSEdgeNewTabButton();
		updateSettingsAppearance();
		createFavouritesSidebarButton();
		updateBookmarkAppearance();
		createAddToBookmarksBarButton();
		moveExtensionsBtn();
		createCommandBar();
		updateCommandbarAppearance();
		createCBHomeButton();
		createCBPrintButton();
		createCBReadMailButton()
		downloadsButton();
		// createFakeTitlebarSpace();
		createTitlebar();
		createStatusbar();
		updateStatusbarAppearance();
		loadLocale();
		initURLBarWidth();
	
		setTimeout(() => { applyTranslations(); }, 1000);
		
		console.info("Functions executed.");
	}
	
	window.addEventListener("load", executeFunctions)
}

