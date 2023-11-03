/* eslint-disable react/prop-types */
import { Transition } from "@headlessui/react";
import { HiMiniCheckCircle } from "react-icons/hi2";

const Title = ({ marked, handleDelete, handleMarkAll, handleUnmarkAll }) => {
  return (
    <div className="sticky top-0 z-[1] flex min-h-[2.5rem] items-center gap-4 overflow-hidden border-b bg-gray-100 px-4 [&_*]:leading-6">
      <div>
        {!marked.length && <h5>Image Gallery</h5>}
        {!!marked.length && (
          <h6>
            <HiMiniCheckCircle className="-mt-1 me-1 inline-block text-2xl text-accent" />
            {marked.length} files selected
          </h6>
        )}
      </div>

      <div className="ms-auto">
        <Transition
          show={!!marked.length}
          enter="transition transform duration-75"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="transition transform duration-75 "
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
          className="flex gap-2 xl:gap-4"
        >
          <button onClick={handleMarkAll}>
            <small className="font-semibold hover:underline">Select All</small>
          </button>
          <button onClick={handleUnmarkAll}>
            <small className="font-semibold hover:underline">Select None</small>
          </button>
          <button
            onClick={handleDelete}
            className="font-semibold text-danger hover:text-danger-hover hover:underline"
          >
            <small>Delete files</small>
          </button>
        </Transition>
      </div>
    </div>
  );
};

export default Title;
