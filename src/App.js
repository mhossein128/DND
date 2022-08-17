import { useState } from "react";
import TableHead from "./features/header";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { timeConvertor } from "./utils/timeConvertor";
import { items } from "./features/tableData";

const handleSortableTime = (copiedItems) => {
  let sortedData = [];
  copiedItems.forEach((item, index) => {
    if (index === 0) {
      sortedData.push({ ...item, start: 0, end: item.time });
    } else {
      sortedData.push({
        ...item,
        start: sortedData[sortedData.length - 1].end,
        end: sortedData[sortedData.length - 1].end + item.time,
      });
    }
  });
  return sortedData;
};
const dragHandler = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  const copiedItems = [...columns];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
  
  const newData = handleSortableTime(copiedItems);
  setColumns([...newData]);
};

function App() {
  const [Columns, setColumns] = useState(items);

  return (
    <div className="bg-gray-300 min-h-screen p-3">
      <TableHead />
      <DragDropContext
        onDragEnd={(result) => dragHandler(result, Columns, setColumns)}
      >
        {/* {Object.entries(Columns).map(([id, column]) => ( */}
        <Droppable key={5} droppableId={"5"}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`w-full h-full p-5 ${
                snapshot.isDraggingOver ? "bg-slate-400" : "bg-slate-700"
              }`}
            >
              {Columns.map((item, index) => (
                <Draggable key={item.id} index={index} draggableId={item.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className={`${
                        snapshot.isDragging ? "bg-purple-400" : "bg-purple-600"
                      } min-h-[100px] p-5 divide-x-2 grid grid-cols-4 mt-3`}
                    >
                      <span className="grid place-content-center">
                        {timeConvertor(item.end)}
                      </span>
                      <span className="grid place-content-center">
                        {timeConvertor(item.time)}
                      </span>
                      <span className="grid place-content-center">
                        {timeConvertor(item.start)}
                      </span>
                      <span className="grid place-content-center">
                        {item.title}
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* ))} */}
      </DragDropContext>
    </div>
  );
}

export default App;
