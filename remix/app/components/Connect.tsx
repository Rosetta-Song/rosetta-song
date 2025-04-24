import { useState, useContext } from 'react';
import { Player, Track } from '../interfaces/PlayerState';
import styles from '../styles/connect.module.css';
import { PlayerContext } from './Player';
import { Loader } from './Loader';



interface Props {
  player: Player;
}

const View = ({ player }: Props) => {
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setTrack] = useState<Track | undefined>(undefined);

  player.addListener('player_state_changed', async (state) => {
    if (!state) {
      return;
    }

    setTrack(state.track_window.current_track);
    setPaused(state.paused);

    const currentState = await player.getCurrentState();
    if (currentState) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  if (!isActive) {
    return (
      <div className={styles.container}>
        <b>
          Instance not active. Transfer your playback using your Spotify app.
        </b>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {currentTrack && (
        <img
          className={styles.nowPlayingCover}
          src={currentTrack.album.images[0].url}
          alt={`cover art for ${currentTrack.album.name}`}
        />
      )}
      <div className={styles.nowPlayingSide}>
        <div className={styles.nowPlayingName}>{currentTrack?.name}</div>
        <div>{currentTrack?.artists[0].name}</div>
        <div className={styles.controlsContainer}>
          <button
            className={styles.button}
            onClick={() => {
              player.previousTrack();
            }}
          >
            ⏮️
          </button>

          <button
            className={styles.playPause}
            onClick={() => {
              player.togglePlay();
            }}
          >
            {isPaused ? '▶️' : '⏸️'}
          </button>

          <button
            className={styles.button}
            onClick={() => {
              player.nextTrack();
            }}
          >
            ⏭️
          </button>
        </div>
      </div>
    </div>
  );
};
export const Connect = () => {
  const player = useContext(PlayerContext);
  if (player) {
    return <View player={player} />;
  } else {
    return <Loader />;
  }
};
