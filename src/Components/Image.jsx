/* eslint-disable react/prop-types */
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Switch, Transition } from "@headlessui/react";
import { memo, useState } from "react";
import { HiMiniCheckCircle, HiOutlineStar } from "react-icons/hi2";

const Image = memo((props) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    image,
    className,
    featured,
    isMarked,
    handleMarked,
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
      <img
        className={`aspect-square w-full object-contain transition-transform duration-300 ${
          isHovered && !isDragging ? "scale-105" : ""
        }`}
        src={image?.url}
        alt={image?.url}
      />

      {/* Overlay for buttons */}
      <Transition
        show={isHovered || isMarked}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-0"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`overlay absolute inset-0 grid grid-flow-col place-content-between p-2  ${
            isMarked ? "backdrop-brightness-105 backdrop-contrast-50" : ""
          }`}
        >
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
                className={`fill-current ${
                  isMarked ? "opacity-100" : "opacity-30 hover:opacity-50"
                }`}
              />
            </Switch>
          </div>
        </div>
      </Transition>
    </div>
  );
});
Image.displayName = "Image";
export default Image;
