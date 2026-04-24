import { useState } from "react";


import { dropHandler, Kanban, type BoardData } from "react-kanban-kit";





const MyKanbanBoard  = () => {

    const [dataSource, setDataSource] = useState<BoardData>({
      root: {
        id: "root",
        title: "Root",
        children: ["col-1", "col-2", "col-3"],
        totalChildrenCount: 3,
        parentId: null,
      },
      "col-1": {
        id: "col-1",
        title: "To Do",
        children: ["task-1", "task-2"],
        totalChildrenCount: 2,
        parentId: "root",
      },
      "col-2": {
        id: "col-2",
        title: "In Progress",
        children: ["task-3"],
        totalChildrenCount: 1,
        parentId: "root",
      },
      "col-3": {
        id: "col-3",
        title: "Done",
        children: ["task-4"],
        totalChildrenCount: 1,
        parentId: "root",
      },
      "task-1": {
        id: "task-1",
        title: "Design Homepage",
        parentId: "col-1",
        children: [],
        totalChildrenCount: 0,
        type: "card",
        content: {
          description: "Create wireframes and mockups for the homepage",
          priority: "high",
        },
      },
      "task-2": {
        id: "task-2",
        title: "Setup Database",
        parentId: "col-1",
        children: [],
        totalChildrenCount: 0,
        type: "card",
      },
      "task-3": {
        id: "task-3",
        title: "Build Auth Flow",
        parentId: "col-2",
        children: [],
        totalChildrenCount: 0,
        type: "card",
      },
      "task-4": {
        id: "task-4",
        title: "Deploy to Production",
        parentId: "col-3",
        children: [],
        totalChildrenCount: 0,
        type: "card",
      },
    });

   const configMap = {
    card: {
      render: ({ data }: {data: any}) => (
        <div className="bg-(--chakra-colors-bg)! border! p-4! rounded-md">
          <h3 className="mb-1!">{data.title}</h3>
          {data.content?.description && <p className="text-(--chakra-colors-fg-subtle)! text-sm!">{data.content.description}</p>}
          {/* {data.content?.priority && (
            <span className={`priority ${data.content.priority}`}>
              {data.content.priority}
            </span>
          )} */}
        </div>
      ),
      isDraggable: true,
    },
  };



  return (
    <>
    
         <div >
            <Kanban
              rootStyle={{ backgroundColor: "red !important", padding: "20px 0" }}
              dataSource={dataSource}
              configMap={configMap}
              onCardMove={(move) => {
                  setDataSource(
                    dropHandler(
                      move,
                      dataSource,
                      () => {},             
                      (targetColumn) => ({  
                        ...targetColumn,
                        totalChildrenCount: targetColumn.totalChildrenCount + 1,
                      }),
                      (sourceColumn) => ({  
                        ...sourceColumn,
                        totalChildrenCount: sourceColumn.totalChildrenCount - 1,
                      })
                    )
                  );
              }}
              renderCardDragIndicator={(_, info) => (
                <div 
                  className="bg-(--chakra-colors-bg-muted)! rounded-md" 
                  style={{ height: info.height }} 
                />
              )}
          />
         </div>
    
    </>
  )
}

export default MyKanbanBoard 


