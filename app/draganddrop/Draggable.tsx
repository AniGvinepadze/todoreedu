import { useSortable } from "@dnd-kit/sortable";

type DraggableProps = {
  id: string;
  children: React.ReactNode;
};

const Draggable = ({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        marginBottom: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
