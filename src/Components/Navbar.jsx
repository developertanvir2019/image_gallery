/* eslint-disable react/prop-types */
import { Transition } from "@headlessui/react";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { AiOutlineDelete } from "react-icons/ai";

const Title = ({ marked, handleDelete, selectAll, setSelectAll }) => {
  return (
    <div className="py-3 sticky top-0 z-[1] flex min-h-[2.5rem] items-center gap-4 overflow-hidden border-b bg-gray-100 px-5">
      <div>
        {!marked.length && (
          <h5 className="text-[1.5rem] font-semibold">Image Gallery</h5>
        )}
        {!!marked.length && (
          <h6 className="text-[1.5rem] font-semibold">
            <HiMiniCheckCircle className="-mt-1 me-1 inline-block  text-blue-600" />
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
          <label className="text-lg font-semibold">
            <input
              type="checkbox"
              className="toggle  -mb-1 mr-1"
              checked={selectAll}
              onClick={() => setSelectAll(!selectAll)}
            />
            Select All
          </label>
          <button
            onClick={handleDelete}
            className="text-lg text-red-400 font-semibold"
          >
            <div className="flex items-center justify-center">
              <AiOutlineDelete /> Delete
            </div>
          </button>
        </Transition>
      </div>
    </div>
  );
};

export default Title;
