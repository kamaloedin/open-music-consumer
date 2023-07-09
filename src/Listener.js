class Listener {
  constructor(playlistSongsService, mailSender) {
    this._playlistSongsService = playlistSongsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = await this._playlistSongsService.getPlaylistById(playlistId);
      const songs = await this._playlistSongsService.getSongsByPlaylistId(playlistId);
      const playlistSongs = {
        playlist: {
          ...playlists,
          songs,
        },
      };
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistSongs));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
