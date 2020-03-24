import { combineReducers } from 'redux';

// // import types
// import { SONG_SELECT } from '../actions/types'

// const songsReducer = () => {
//     return [
//         { title: 'No Scrubs', duration: '4:05' },
//         { title: 'Macarena', duration: '2:30' },
//         { title: 'All Star', duration: '3:15' }
//     ];
// }

// const selectedSongReducer = (selectedSong = null, action) => {
//     if (action.type === SONG_SELECT) {
//         return action.payload;
//     }

//     return selectedSong;
// }

// export default combineReducers({
//     songs: songsReducer,
//     selectedSong: selectedSongReducer
// });

export default combineReducers({
    replaceMe: () => 'dummy value'
});