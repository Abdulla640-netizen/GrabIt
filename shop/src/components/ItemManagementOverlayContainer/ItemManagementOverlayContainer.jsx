import { FaTrashAlt } from "react-icons/fa";
import "./ItemManagementOverlayContainer.css";

function ItemManagementOverlayContainer(props) {
  return (
    <div>
      <div className="container">
        <img src={props.image } onClick={()=>props.delete()} alt="" />
        <div className="overlay">
          <div className="images-delete">
            <FaTrashAlt size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemManagementOverlayContainer;
