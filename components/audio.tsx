import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { Recording } from "../models/types";
// @ts-ignore
import WaveSurfer from "wavesurfer.js";

import audio from "./audio.module.scss";
import container from "../assets/styles/Container.module.scss";
import { useRouter } from "next/dist/client/router";

export default function Audio({
  recordings,
  shouldDestroyWavesurfer,
}: {
  recordings: Recording[];
  shouldDestroyWavesurfer: boolean;
}) {
  const waveformRef = useRef(null);
  const [wavesurfer, setWavesurfer] = useState<any | undefined>(undefined);
  const [selectedRecording, setSelectedRecording] = useState<
    Recording | undefined
  >(recordings && recordings.length > 0 ? recordings[0] : undefined);
  const [hasStartedPlaying, setHasStartedPlaying] = useState<boolean>(false);
  const [wavesurferHasLoaded, setWavesurferHasLoaded] =
    useState<boolean>(false);

  const isSafari =
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent || "") ||
    /iPad|iPhone|iPod/i.test(navigator.userAgent || "");

  useEffect(() => {
    if (shouldDestroyWavesurfer && wavesurfer) {
      wavesurfer.destroy();
    }
  }, [shouldDestroyWavesurfer, wavesurfer]);

  useEffect(() => {
    if (recordings && recordings.length > 0) {
      setSelectedRecording(recordings[0]);
    }
  }, [recordings]);

  // STEP 0: Load wavesurfer
  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        backend: isSafari ? "MediaElement" : "WebAudio",
        height: 64,
        barWidth: 3,
        barHeight: 0.2,
        barMinHeight: 10,
        barRadius: 3,
        barGap: 3,
        normalize: true,
        progressColor: "rgba(0, 0, 0, 0.6)",
        waveColor: "rgba(44, 43, 36, 0.4)",
        cursorColor: "transparent",
        cursorWidth: 0,
        interact: false,
      });
      setWavesurfer(wavesurfer);
    }
    setWavesurferHasLoaded(true);
  }, []);

  // STEP 1: Load initial recording
  useEffect(() => {
    if (
      wavesurfer &&
      recordings &&
      recordings.length > 0 &&
      recordings[0]?.path
    ) {
      wavesurfer.load(recordings[0].path);
    }
  }, [wavesurferHasLoaded, recordings, wavesurfer]);

  const findCurrentIndex = useCallback(() => {
    if (!selectedRecording || !recordings) return -1;
    return recordings.findIndex(
      (recording) => recording.path === selectedRecording.path,
    );
  }, [recordings, selectedRecording?.path]);

  const skipToNextRecording = useCallback(() => {
    wavesurfer.un("finish", skipToNextRecording);

    if (recordings[findCurrentIndex() + 1]) {
      // if there is a next recording
      setSelectedRecording(recordings[findCurrentIndex() + 1]);
    } else {
      setSelectedRecording(recordings[0]);
    }
  }, [wavesurfer, findCurrentIndex, recordings]);

  const requestPlay = (shouldStartPlaying: boolean) => {
    if (!selectedRecording || !selectedRecording.path) {
      skipToNextRecording();
      return;
    }

    if (shouldStartPlaying) {
      if (
        recordings &&
        recordings[0] &&
        selectedRecording.path === recordings[0].path
      ) {
        play();
      } else {
        wavesurfer.on("ready", play);
      }

      wavesurfer.on("finish", skipToNextRecording);

      if (
        recordings &&
        recordings[0] &&
        selectedRecording.path !== recordings[0].path
      ) {
        wavesurfer.load(selectedRecording.path);
      }
    }
  };

  useLayoutEffect(() => {
    if (wavesurfer && selectedRecording) {
      requestPlay(hasStartedPlaying);
    }
  }, [selectedRecording?.path, wavesurfer]);

  const play = () => {
    wavesurfer.play();
    wavesurfer.un("ready", play);
  };

  const togglePlay = () => {
    if (!hasStartedPlaying) {
      // this we only need to change the play button to a next button - no effects
      setHasStartedPlaying(true);
    }

    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
    } else {
      if (!hasStartedPlaying) {
        wavesurfer.on("finish", skipToNextRecording);
      }
      play();
    }
  };

  if (!selectedRecording) {
    return (
      <div>
        <div className={audio.container}>
          <div className={audio.player}>
            <div className={audio.playerWaveform}>No recordings available</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={audio.container}>
        <div className={audio.player} onClick={togglePlay}>
          <div ref={waveformRef} className={audio.playerWaveform}></div>
        </div>
        <div className={audio.meta}>
          <ul className={audio.tags}>
            {selectedRecording?.tags?.map((tag: string) => (
              <li className={audio.tagItem} key={tag}>
                {tag}
              </li>
            ))}
          </ul>
          <span className={audio.tagItem}>{selectedRecording?.voting}</span>
        </div>
      </div>
      <div className={audio.playerButtons}>
        <button
          className={
            hasStartedPlaying
              ? audio.playerButtonForward
              : audio.playerButtonPlay
          }
          onClick={() =>
            hasStartedPlaying ? skipToNextRecording() : togglePlay()
          }
        ></button>
      </div>
    </div>
  );
}
