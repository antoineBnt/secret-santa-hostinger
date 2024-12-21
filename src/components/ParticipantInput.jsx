import { useState } from "react";

export function ParticipantInput({
  participants,
  onAddParticipant,
  onRemoveParticipant,
}) {
  const [currentName, setCurrentName] = useState("");
  const [participantGifts, setParticipantGifts] = useState([]); // État pour stocker les cadeaux associés

  const giftImages = [
    "cadeau-rouge.svg",
    "cadeau-orange.svg",
    "cadeau-vert.svg",
  ];

  const addParticipant = () => {
    if (currentName.trim() !== "") {
      const trimmedName = currentName.trim();
      const randomImage =
        giftImages[Math.floor(Math.random() * giftImages.length)];

      // Ajoute le participant avec son cadeau
      setParticipantGifts([
        ...participantGifts,
        { name: trimmedName, gift: randomImage },
      ]);
      onAddParticipant(trimmedName);
      setCurrentName("");
    }
  };

  const removeParticipant = (index) => {
    setParticipantGifts(participantGifts.filter((_, i) => i !== index));
    onRemoveParticipant(index);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 border-white border p-4 rounded-lg">
        <input
          type="text"
          className="input flex-grow text-white"
          placeholder="Entrez un nom"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addParticipant()}
        />
        <button className="button text-white" onClick={addParticipant}>
          Ajouter
        </button>
      </div>
      <ul className="space-y-2">
        {participantGifts.map((participant, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-white border p-2 rounded-lg"
          >
            <span className="text-white">{participant.name}</span>
            <img src={participant.gift} alt="Cadeau" className="w-10" />
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeParticipant(index)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
