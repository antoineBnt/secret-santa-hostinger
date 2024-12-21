export function AssignmentDisplay({ assignments }) {
  return (
    <ul className="space-y-2 flex flex-col items-center gap-4">
      {assignments.map((assignment, index) => (
        <li
          key={index}
          className=" w-full px-10 text-black font-extralight bg-gray-300 py-4 rounded-3xl"
        >
          <span className="font-bold text-black text-2xl">
            {assignment.giver}
          </span>{" "}
          offre un beau cadeau à{" "}
          <span className="font-bold text-black text-2xl">
            {assignment.receiver}
          </span>
        </li>
      ))}
    </ul>
  );
}
