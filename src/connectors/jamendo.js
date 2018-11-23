'use strict';

Connector.playerSelector = '#skeleton-player';

Connector.artistSelector = '.player-mini_track_information_artist';

Connector.trackSelector = '.player-mini_track_information_title';

Connector.currentTimeSelector = '.hidden-xs > .js-player-position';

Connector.durationSelector = '.hidden-xs > .js-player-duration';

Connector.isPlaying = () => {
	return $('.js-player-play-pause > .icon-pause').length !== 0;
};

Connector.getTrackArt = () => {
	return `${$('.hero-cover').find('img').attr('src')}`;
};
