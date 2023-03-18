// src/components/VRScene.js
import React, { useEffect, useState } from 'react';
import 'aframe';

const VRScene = () => {
  const [isInVRMode, setIsInVRMode] = useState(false);

  const enterVR = () => {
    const scene = document.querySelector('a-scene');
    scene.enterVR();
    setIsInVRMode(true);
  };

  useEffect(() => {
    const playSound = (e) => {
      const sound = e.target.components.sound;
      sound.playSound();
    };

    const objects = document.querySelectorAll('.interactive-object');
    objects.forEach((object) => {
      object.addEventListener('click', playSound);
    });

    const sceneEl = document.querySelector('a-scene');
    const onExitVR = () => setIsInVRMode(false);
    sceneEl.addEventListener('exit-vr', onExitVR);

    return () => {
      objects.forEach((object) => {
        object.removeEventListener('click', playSound);
      });
      sceneEl.removeEventListener('exit-vr', onExitVR);
    };
  }, []);

  return (
    <div>
      {
        !isInVRMode && (
          <button
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              zIndex: '1000',
            }}
            onClick={enterVR}
          >
            Enter VR
          </button>
        )
      }
      <a-scene>
        <a-assets>
          <audio id="sound1" src="public/yeahh.mp3"></audio>
          <audio id="sound2" src="public/yeahh.mp3"></audio>
          <audio id="sound3" src="public/yeahh.mp3"></audio>
          <audio id="sound4" src="public/yeahh.mp3"></audio>
        </a-assets>

        <a-camera>
          <a-cursor color="yellow"></a-cursor>
        </a-camera>

        <a-box
          class="interactive-object"
          position="-1 1 -3"
          color="red"
          sound="src: #sound1"
        ></a-box>

        <a-sphere
          class="interactive-object"
          position="0 1.25 -4"
          color="blue"
          sound="src: #sound2"
        ></a-sphere>

        <a-cylinder
          class="interactive-object"
          position="1 1 -3"
          color="green"
          sound="src: #sound3"
        ></a-cylinder>

        <a-cone
          class="interactive-object"
          position="0 1.5 -2"
          color="yellow"
          sound="src: #sound4"
        ></a-cone>

        <a-sky color="lightblue"></a-sky>
      </a-scene>
    </div>
  );
};

export default VRScene;
