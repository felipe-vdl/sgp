import Group from "./Group";
export default function Sidebar() {
  const groups = [
    { id: 1, name: "Desenvolvimento" },
    { id: 2, name: "Infraestrutura" },
    { id: 2, name: "Suporte" },
  ]
  return (
    <div className="bg-mesquita flex text-indigo-50">
      <ul className="flex flex-col bg-yellow-700/30 border-r min-w-[14rem]">
        {groups.map(group => (
          <Group group={group} />
        ))}
      </ul>
    </div>
  );
}