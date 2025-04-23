export interface Player {
    addListener(event: string, callback: (state: PlayerState | null) => void): void;
    getCurrentState(): Promise<PlayerState | null>;
    nextTrack(): void;
    previousTrack(): void;
    togglePlay(): void;
  }
  
export interface PlayerState {
  paused: boolean;
  track_window: {
    current_track: Track;
  };
}
  
  export interface Track {
  name: string;
  album: {
    name: string;
    images: { url: string }[];
  };
  artists: { name: string }[];
}