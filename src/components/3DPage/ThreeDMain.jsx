//tutorial video watched: https://www.youtube.com/watch?v=FkowOdMjvYo

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader";
import SpaceModel from "./Models/SpaceStation";
import Spaceman from "./Models/Spaceman";
import Info from "./Models/Info";

function ThreeDMain() {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  //for the screen adjustments as it says
  const adjustStationForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [2, -4, -60];
    let rotation = [0.1, 4, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1.5, 1.5, 1.5];
    }
    return [screenScale, screenPosition, rotation];
  };
  const adjustSpacemanForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  };
  const [spacemanScale, spacemanPosition] = adjustSpacemanForScreenSize();
  const [
    islandScale,
    islandPosition,
    islandRotation,
  ] = adjustStationForScreenSize();

  return (
    <main className="w-full h-screen relative">
      <section className="absolute top-9 left-0 right-0 z-10 flex items-center justify-center">
        {/*this is the pop up what will pop up and i am using tailwind css to be able to style everything in here, REACT IS COOOL! */}
        {currentStage && <Info currentStage={currentStage} />}
      </section>

      {/*Everything starts with a canvas, wether its 3d, d3, three.js canvas is always there when making a net artwork*/}
      <Canvas
        /*this is for the rotation of the canvas*/
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ position: [0, 0, 5], near: 0.1, far: 1000 }}
      >
        {/*Setting up the rendering for the scene*/}
        <Suspense fallback={<Loader />}>
          {/* Add lighting to the scene */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          {/* Render the model */}
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          {/* i wonder why my lightnings are not working? */}
          <Spaceman
            isRotating={isRotating}
            spacemanScale={spacemanScale}
            spacemanPosition={spacemanPosition}
            rotation={[0, 20, 0]}
          />

          <SpaceModel
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>
    </main>
  );
}

export default ThreeDMain;
