'use strict';

define(['storage/chromeStorage'], (ChromeStorage) => {
	const options = ChromeStorage.getLocalStorage('Options');

	/**
	 * Object that stores default option values.
	 * @type {Object}
	 */
	const defaultOptionsMap = {
		/**
		 * Array of disabled connectors.
		 * @type {Array}
		 */
		disabledConnectors: [],
		/**
		 * Disable Google Analytics.
		 * @type {Boolean}
		 */
		disableGa: false,
		/**
		 * Force song recognition.
		 * @type {Boolean}
		 */
		forceRecognize: false,
		/**
		 * Use autocorrection when retrieving song info from Last.fm.
		 * @type {Boolean}
		 */
		useAutocorrect: false,
		/**
		 * Use now playing notifications.
		 * @type {Boolean}
		 */
		useNotifications: true
	};

	/**
	 * Setup default options values.
	 * This function is called on module init.
	 */
	function setupDefaultConfigValues() {
		options.get().then((data) => {
			for (let key in defaultOptionsMap) {
				if (data[key] === undefined) {
					data[key] = defaultOptionsMap[key];
				}
			}
			options.set(data).then(() => {
				options.debugLog();
			});
		});
	}

	/**
	 * Check if connector is enabled.
	 * @param  {String}  label Connector label
	 * @return {Promise} Promise that will be resolved with result value
	 */
	function isConnectorEnabled(label) {
		return options.get().then((data) => {
			return data.disabledConnectors.indexOf(label) === -1;
		});
	}

	/**
	 * Enable or disable connector.
	 * @param  {String}  label Connector label
	 * @param  {Boolean} state True if connector is enabled; false otherwise
	 */
	function setConnectorEnabled(label, state) {
		options.get().then((data) => {
			let index = data.disabledConnectors.indexOf(label);
			if (index === -1 && !state) {
				data.disabledConnectors.push(label);
			} else if (state) {
				data.disabledConnectors.splice(index, 1);
			}

			options.set(data);
		});
	}

	setupDefaultConfigValues();

	return {
		isConnectorEnabled, setConnectorEnabled
	};
});
