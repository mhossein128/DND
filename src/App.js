import {  useState } from "react";
import Header from './header'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import {v4 as uuid} from 'uuid'

const items = [
  { id: "i-1", title: "فیلم 1", time: 30 ,start : 0, end :30 },
  { id: "i-2", title: "فیلم 2", time: 90 ,start : 30, end :120 },
  { id: "i-3", title: "فیلم 3", time: 140 ,start : 120, end :260 },
];
// const items2 = [
//   { id: "i-1", title: "فیلم 4", time: 50 ,start : 0, end :50 },
//   { id: "i-2", title: "فیلم 5", time: 90 ,start : 50, end :140 },
//   { id: "i-3", title: "فیلم 6", time: 140 ,start : 140, end :280 },
// ];
const columnFromBackEnd = {
  c_1: {
    name: "first column",
    items,
  }
  // ,
  // c_2: {
  //   name: "second column",
  //   items : items2,
  // },
};


const dragHandler = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  const column = columns[source.droppableId];
  const copiedItems = [...column.items];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);



  let arr = [];
  // let cloneState = {...column}
  copiedItems.forEach((item, index) => {
    if (index === 0) {
      arr.push({ ...item, start: 0, end: item.time });
    } else {
      arr.push({
        ...item,
        start: arr[arr.length - 1].end,
        end: arr[arr.length - 1].end + item.time,
      });
    }
  });
  // setColumns((prvs) => {
  //   let clone = {...prvs};
  //   clone.c_1.items = [...arr];
  //   return clone;
  // });
  setColumns({
    ...columns,
    [source.droppableId]: {
      ...column,
      items: arr,
    },
  });
  console.log(source, destination);
};

const convertTime = (minutes) => `${Math.floor(minutes / 60)} : ${minutes % 60}`

function App() {
  const [Columns, setColumns] = useState(columnFromBackEnd);
  
  console.log("Columns : ", Columns);
  return (
    <div className="bg-gray-300 min-h-screen p-3">
      <Header />
      <DragDropContext
        onDragEnd={(result) => dragHandler(result, Columns, setColumns)}
      >
        {Object.entries(Columns).map(([id, column]) => (
          <Droppable key={id} droppableId={id}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`w-full h-full p-5 ${
                  snapshot.isDraggingOver ? "bg-slate-400" : "bg-slate-700"
                }`}
              >
                {column.items.map((item, index, couft) => (
                  <Draggable key={item.id} index={index} draggableId={item.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={`${
                          snapshot.isDragging
                            ? "bg-purple-400"
                            : "bg-purple-600"
                        } min-h-[100px] p-5 divide-x-2 grid grid-cols-4 mt-3`}
                      >
                        <span className="grid place-content-center">
                          {convertTime(item.end)}
                        </span>
                        <span className="grid place-content-center">
                          {convertTime(item.start)}
                        </span>
                        <span className="grid place-content-center">
                          {convertTime(item.time)}
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
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
