/* eslint-disable react/prop-types */
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
        {marked?.length ? (
          <div>
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
              className="text-lg text-red-400 font-semibold ml-3"
            >
              <div className="flex items-center justify-center">
                <AiOutlineDelete /> Delete
              </div>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Title;
