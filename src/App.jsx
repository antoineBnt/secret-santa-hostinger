import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ParticipantInput } from "./components/ParticipantInput";
import { AssignmentDisplay } from "./components/AssignmentDisplay";
import { SwipeButton } from "./components/SwipeButton";

export default function App() {
  const [participants, setParticipants] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [currentScreen, setCurrentScreen] = useState("welcome");

  const addParticipant = (name) => {
    setParticipants([...participants, name]);
  };

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const distributeGifts = () => {
    if (participants.length < 2) {
      alert("Il faut au moins 2 participants pour faire un Secret Santa !");
      return;
    }

    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const newAssignments = shuffled.map((giver, index) => ({
      giver,
      receiver: shuffled[(index + 1) % shuffled.length],
    }));

    setAssignments(newAssignments);
    setCurrentScreen("assignments");
  };

  const resetApp = () => {
    setParticipants([]);
    setAssignments([]);
    setCurrentScreen("welcome");
  };

  return (
    <div className="relative w-screen h-screen bg-[#101010]">
      {/* Conteneur des flocons pleine page, affiché seulement sur l'écran "assignments" */}
      {currentScreen === "assignments" && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 50 }).map((_, i) => {
            const topPosition = Math.random() * 100;
            const leftPosition = Math.random() * 100;
            const delay = Math.random() * 5;
            const size = Math.floor(Math.random() * 2) + 1;

            return (
              <div
                key={i}
                className="absolute top-0 animate-snowflake text-white select-none"
                style={{
                  left: `${leftPosition}%`,
                  top: `${topPosition}%`,
                  animationDelay: `${delay}s`,
                  fontSize: `${size}rem`,
                }}
              >
                ❄
              </div>
            );
          })}
        </div>
      )}

      {/* Contenu principal */}
      <div className="w-full h-[90vh] flex flex-col">
        {currentScreen === "welcome" && (
          <WelcomeScreen onStart={() => setCurrentScreen("input")} />
        )}

        {currentScreen === "input" && (
          <div className="text-center flex flex-col justify-between h-full mx-4 items-center">
            <h2 className="font-bold mb-6 text-center font-lobster text-[3.5rem] text-white">
              Ajoutez les participants
            </h2>
            <ParticipantInput
              onAddParticipant={addParticipant}
              participants={participants}
              onRemoveParticipant={removeParticipant}
            />
            <div className="mb-10 w-full mx-auto">
              <SwipeButton
                onConfirm={distributeGifts}
                text="Glissez pour finir"
              />
            </div>
          </div>
        )}

        {currentScreen === "assignments" && (
          <div className="relative px-4 flex flex-col justify-between items-center pt-20 overflow-hidden h-[90vh] w-full">
            <h2 className="text-[3.5rem] font-bold text-primary mb-4 font-lobster text-white">
              Attributions des cadeaux
            </h2>
            <AssignmentDisplay assignments={assignments} />
            <div className="w-full mx-auto mb-10">
              <SwipeButton
                onConfirm={resetApp}
                text="Glissez pour recommencer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
