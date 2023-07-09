const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username
        FROM playlists
        LEFT JOIN users ON users.id = playlists.owner
        WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT s.id, s.title, s.performer
        FROM playlist_songs ps
        LEFT JOIN songs s ON ps.song_id = s.id
        WHERE playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistSongsService;
