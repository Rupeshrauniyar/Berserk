import React from "react";
import { useUser } from "../context/UserContext";
import SongCard from "../components/SongCard";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const Playlist = () => {
  const { playlist, setSongs, setSelectedIndex, setSelectedSong, fetchData, addToHistory } = useUser();

  const playPlaylistSong = (song, i) => {
    // Overwrite the global songs array so the player's Next/Prev buttons navigate the playlist
    setSongs(playlist);
    addToHistory?.(song);
    setSelectedSong(song);
    setSelectedIndex(i);
    try {
      const videoId = song?.id?.videoId ?? song?.id;
      fetchData(videoId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShufflePlay = () => {
    if (!playlist || playlist.length === 0) return;
    
    // Randomize the items
    const shuffled = [...playlist].sort(() => Math.random() - 0.5);
    setSongs(shuffled);
    
    // Autoplay the first shuffled track
    const first = shuffled[0];
    addToHistory?.(first);
    setSelectedSong(first);
    setSelectedIndex(0);
    const videoId = first?.id?.videoId ?? first?.id;
    fetchData(videoId);
  };

  return (
    <div className="pt-24 lg:pt-8 px-4 pb-24 min-h-screen text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-400">Your Playlist</h1>
        {playlist?.length > 0 && (
          <button 
            onClick={handleShufflePlay}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-full font-bold transition-colors"
          >
            <Play fill="currentColor" stroke="none" className="w-4 h-4" />
            Shuffle Play
          </button>
        )}
      </div>

      {playlist?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-zinc-400 text-center gap-2">
          <p className="font-medium text-lg text-white">Your playlist is empty</p>
          <p className="text-sm">Tap the <span className="text-green-400 font-bold mx-1">+</span> icon on any song to add it here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {playlist?.map((song, i) => (
            <motion.div
              initial={{opacity: 0, y: 15}}
              animate={{opacity: 1, y: 0}}
              transition={{ delay: i * 0.05 }}
              key={i}
              className="cursor-pointer"
              onClick={() => playPlaylistSong(song, i)}
            >
              <SongCard song={song} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;
