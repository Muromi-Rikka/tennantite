import { ModScissorList } from "./index";

export function ModScissorListDemo() {
  return (
    <div className="relative h-24 w-32">
      <ModScissorList height={40} left={8} scroll={16} top={8} width={60}>
        {[0, 1, 2].map(index => (
          <div
            className="absolute h-4 bg-mc-green"
            key={index}
            style={{ left: 8, top: 8 + index * 16, width: 40 }}
          />
        ))}
      </ModScissorList>
    </div>
  );
}
