/* eslint-disable react/prop-types */
import "@pqina/pintura/pintura.css";
import { getEditorDefaults } from "@pqina/pintura";
import { PinturaEditor } from "@pqina/react-pintura";
const editorConfig = getEditorDefaults();
const EditModal = ({ image, setModalClose, modalClose }) => {
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setModalClose(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div className="mx-5" style={{ height: "500px" }}>
            {modalClose && (
              <PinturaEditor
                {...editorConfig}
                src={image?.url}
                imageCropAspectRatio={1}
              ></PinturaEditor>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditModal;
