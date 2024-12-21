import { SwipeButton } from "./SwipeButton";

export function WelcomeScreen({ onStart }) {
  return (
    <div className="text-center flex flex-col justify-between h-[90vh] mx-4 items-center">
      <div className="mt-10">
        <h1 className="text-[3.5rem] font-bold text-primary mb-4 font-lobster text-white">
          Secret Santa
        </h1>
        <p className="text-sm font-light text-white">
          Bienvenue dans l'application Secret Santa ! Organisez facilement votre
          échange de cadeaux entre amis ou collègues.
        </p>
      </div>
      <div
        className="w-full absolute top-[35%] overflow-visible flex justify-center"
        style={{ filter: "drop-shadow(0 0 30px #791409)" }}
      >
        <img src="cadeau-rouge.svg" alt="" className="w-[50%] " />
      </div>
      <div className="w-full mx-auto mb-10 z-0">
        <SwipeButton onConfirm={onStart} text="Glissez" />
      </div>
    </div>
  );
}
