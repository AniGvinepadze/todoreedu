"use client";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Draggable from "./draganddrop/Draggable"; // Draggable component

type InputData = {
  id: string;
  color: string;
  text: string;
};

const colors = ["#0000FF", "#00FF00", "#FF0000", "#FFFF00", "#FF00FF"];

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<InputData[]>([]);
  const [colorInput, setColorInput] = useState<string>("");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setColorInput(""); // Clear the input field when a color is selected
    setShowColorPicker(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorInput(e.target.value);
  };

  const addInput = () => {
    if (colorInput.trim()) {
      const newInput = {
        id: Date.now().toString(),
        color: selectedColor || "",
        text: colorInput,
      };
      setInputValues((prev) => [...prev, newInput]);
      setColorInput(""); // Clear input field after adding
    }
  };

  const updateInput = (id: string, newText: string) => {
    setInputValues((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, text: newText } : input
      )
    );
  };

  const deleteInput = (id: string) => {
    setInputValues((prev) => prev.filter((input) => input.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setInputValues((prev) => {
        const oldIndex = prev.findIndex((input) => input.id === active.id);
        const newIndex = prev.findIndex((input) => input.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <button onClick={() => setShowColorPicker(!showColorPicker)}>
        {selectedColor ? "Color Selected" : "Select a Color"}
      </button>

      {showColorPicker && (
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              style={{
                backgroundColor: color,
                width: "30px",
                height: "30px",
                margin: "5px",
                border: selectedColor === color ? "2px solid black" : "none",
              }}
            />
          ))}
        </div>
      )}

      {selectedColor && (
        <div>
          <input
            type="text"
            placeholder="Enter your text"
            value={colorInput}
            onChange={handleInputChange}
            style={{ borderColor: selectedColor }}
          />
          <button onClick={addInput}>Add Input</button>
        </div>
      )}

      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={inputValues.map((input) => input.id)}
          strategy={verticalListSortingStrategy}
        >
          <div style={{ marginTop: "20px" }}>
            {inputValues.map((input) => (
              <Draggable key={input.id} id={input.id}>
                <div
                  style={{
                    backgroundColor: input.color,
                    color: "white",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <span>{input.text}</span>
                    <button
                      onClick={() =>
                        updateInput(
                          input.id,
                          prompt("Update text", input.text) || input.text
                        )
                      }
                    >
                      Update
                    </button>
                    <button onClick={() => deleteInput(input.id)}>
                      Delete
                    </button>
                </div>
                  </div>
              </Draggable>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}


// npm install @dnd-kit/core @dnd-kit/sortable
