import { useEffect, useState } from "react";
import Image from "./Image";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import AddNewImage from "./AddNewImage";
import Navbar from "./Navbar";
import images from "../assets/imglinks.json";
import EditModal from "./EditModal";
const Gallery = () => {
  const [imageFiles, setImageFiles] = useState(images);
  const [marked, setMarked] = useState([]);
  const [activeElm, setActiveElm] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  // functions
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFeatured = (id) => {
    setImageFiles((imageFiles) => {
      const elm = imageFiles.find((img) => img.id === id);
      return imageFiles
        .toSpliced(
          imageFiles.findIndex((img) => img.id === id),
          1
        )
        .toSpliced(0, 0, elm);
    });
  };

  const handleMarked = (id, bool) => {
    if (bool) {
      setMarked([...marked, id]);
    } else {
      setMarked(marked.filter((item) => item !== id));
    }
  };
  useEffect(() => {
    if (selectAll) {
      setMarked(imageFiles.map((img) => img.id));
    } else {
      setMarked([]);
    }
  }, [imageFiles, selectAll]);

  const handleDelete = () => {
    if (!marked.length) return;
    setImageFiles(imageFiles.filter((img) => !marked.includes(img.id)));
    setMarked([]);
  };

  const handleDragStart = (data) => {
    setActiveElm(imageFiles.find((img) => img.id === data.active.id));
  };

  const handleDragEnd = (data) => {
    // console.log(data)
    // eslint-disable-next-line no-unused-vars
    const { active, over, ...rest } = data;
    if (!over) return;
    if (active.id === over.id) return;

    setImageFiles((imageFiles) => {
      const activeObj = imageFiles.find((img) => img.id === active.id);
      return imageFiles
        .toSpliced(
          imageFiles.findIndex((img) => img.id === active.id),
          1
        )
        .toSpliced(
          imageFiles.findIndex((img) => img.id === over.id),
          0,
          activeObj
        );
    });
    setActiveElm(null);
  };

  const handleDragCancel = () => setActiveElm(null);

  const [selectedImg, setSelectedImg] = useState(null);

  const openModal = (img) => {
    setSelectedImg(img);
    document.getElementById("my_modal_3").showModal();
  };
  return (
    <>
      <div className="relative mx-auto max-w-[72rem] rounded-xl border bg-gray-100 ">
        {/* title portion */}
        <Navbar
          marked={marked}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          handleDelete={handleDelete}
        />

        {/* body portion */}
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          collisionDetection={closestCenter}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
        >
          <SortableContext items={imageFiles} strategy={rectSortingStrategy}>
            <div
              className={`grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-5 `}
            >
              {imageFiles.map((img, i) => (
                <Image
                  key={img.id}
                  image={img}
                  featured={i === 0}
                  className="relative overflow-hidden rounded-lg border-2 bg-white"
                  isMarked={marked.includes(img.id)}
                  handleMarked={handleMarked}
                  handleFeatured={handleFeatured}
                  openModal={() => openModal(img)}
                  setModalClose={setModalClose}
                />
              ))}

              {/* floating abstract element to show on drag */}
              <DragOverlay
                adjustScale={true}
                modifiers={[restrictToWindowEdges]}
                zIndex={10}
                className="cursor-grabbing overflow-hidden rounded-lg border bg-white shadow-md"
              >
                {!!activeElm && (
                  <img
                    className="aspect-square w-full object-contain"
                    src={activeElm.url}
                    alt={activeElm.id}
                  />
                )}
              </DragOverlay>

              {/* when there is no image */}
              {!imageFiles.length && (
                <h3 className="grid aspect-square w-full place-items-center rounded-lg p-4 text-center">
                  No images available
                </h3>
              )}

              <AddNewImage
                className={!imageFiles.length ? "" : ""}
                setImageFiles={setImageFiles}
              />
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <EditModal
        setModalClose={setModalClose}
        modalClose={modalClose}
        image={selectedImg}
      />
    </>
  );
};

export default Gallery;
