/* eslint-disable react/prop-types */
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Switch } from "@headlessui/react";
import { memo, useState } from "react";
import { HiMiniCheckCircle, HiOutlineStar } from "react-icons/hi2";
import { GrEdit } from "react-icons/gr";
const Image = memo((props) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    image,
    className,
    featured,
    isMarked,
    handleMarked,
    openModal,
    setModalClose,
    handleFeatured,
    ...sanitizedProps
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
    transition: {
      duration: 300,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
    // Required to animate when sorted by other means except dragging
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({
        ...args,
        wasDragging: true,
      }),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    transformOrigin: "0 0",
    // Required for mobile devices to prevent scroll while trying to drag
    touchAction: "none",
  };

  // Cleaner approach
  const containerClasses = [
    "cursor-grab",
    className ?? "",
    isDragging ? "[&>*]:opacity-30 [&>*]:brightness-75 shadow-inner" : "",
    featured ? "col-span-2 row-span-2" : "",
  ]
    .join(" ")
    .trim();

  return (
    <div
      {...sanitizedProps}
      {...attributes}
      {...listeners}
      className={containerClasses}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={setNodeRef}
      style={style}
    >
      <div className="relative group">
        <img
          className={`aspect-square w-full object-contain transition-transform duration-300 ${
            isHovered && !isDragging ? "scale-105" : ""
          }`}
          src={image?.url}
          alt={image?.url}
        />

        {isMarked ? (
          <div className="absolute inset-0 flex items-center justify-center  opacity-100 bg-black bg-opacity-5 transition-opacity">
            <div
              className={`overlay absolute inset-0 grid grid-flow-col place-content-between p-2  ${
                isMarked ? "backdrop-brightness-105 backdrop-contrast-50" : ""
              }`}
            >
              <div>
                <Switch
                  checked={isMarked}
                  onChange={(bool) => handleMarked(image.id, bool)}
                  name={image.id}
                  className={`${
                    isMarked ? "" : ""
                  } grid place-items-center rounded-full border bg-white text-2xl text-accent`}
                >
                  <span className="sr-only">Mark Image file for deletion</span>
                  <HiMiniCheckCircle
                    className={`fill-current text-blue-500 ${
                      isMarked ? "opacity-100" : "opacity-30 hover:opacity-50"
                    }`}
                  />
                </Switch>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-40 transition-opacity">
            <div
              className={`overlay absolute inset-0 grid grid-flow-col place-content-between p-2  ${
                isMarked ? "backdrop-brightness-105 backdrop-contrast-50" : ""
              }`}
            >
              <div>
                <Switch
                  checked={isMarked}
                  onChange={(bool) => handleMarked(image.id, bool)}
                  name={image.id}
                  className={`${
                    isMarked ? "" : ""
                  } grid place-items-center rounded-full border bg-white text-2xl text-accent`}
                >
                  <span className="sr-only">Mark Image file for deletion</span>
                  <HiMiniCheckCircle
                    className={`fill-current text-blue-500 ${
                      isMarked ? "opacity-100" : "opacity-30 hover:opacity-50"
                    }`}
                  />
                </Switch>
              </div>
              <button
                className=" font-bold bg-yellow-100 rounded-full p-[0.4rem] flex justify-center items-center "
                onClick={() => {
                  openModal(image), setModalClose(true);
                }}
              >
                <GrEdit />
              </button>

              <div>
                {!featured && isHovered && (
                  <button
                    className="rounded-full bg-white fill-none text-2xl text-yellow-400 transition-colors hover:fill-current"
                    onClick={() => {
                      setIsHovered(false);
                      handleFeatured(image.id);
                    }}
                  >
                    <HiOutlineStar className="fill-inherit" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
Image.displayName = "Image";
export default Image;
