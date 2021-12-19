import React, { useRef, useEffect, useState } from "react";
import { Recording } from "../models/types";
// @ts-ignore
import WaveSurfer from "wavesurfer.js";

import audio from "./audio.module.scss";

export default function Audio({ recording }: { recording: Recording }) {
  const waveformRef = useRef(null);
  const [wavesurfer, setWavesurfer] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        barWidth: 2,
        barHeight: 1,
        barRadius: 1,
      });
      wavesurfer.load(recording.path);
      setWavesurfer(wavesurfer);
    }
  }, [recording.path]);

  const togglePlay = () => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  };

  return (
    <div className={audio.container}>
      <div>
        <button onClick={togglePlay}>Play / Pause</button>
        <div ref={waveformRef}></div>
      </div>
      <div className={audio.meta}>
        <ul className={audio.tags}>
          {recording.tags?.map((tag: string) => {
            <li className={audio.tagItem} key={tag}>
              {tag}
            </li>;
          })}
        </ul>
        <span className={audio.tagItem}>{recording.voting}</span>
      </div>
    </div>
  );
}
