import styles from "../Home.module.css";
import { Link } from "react-router-dom";
import Price from "./Price";
import type { IVehicle } from "../../../../types/vehicle.interface";
import Year from "./Year";
import { useState } from "react";
import { VehicleService } from "../../../../services/vehicle.service";

interface VehicleItemProps {
  vehicle: IVehicle;
  onDelete?: (id: number) => void;
  onUpdate?: (vehicle: IVehicle) => void;
  isDetailView?: boolean;
}

function VehicleItem({
  vehicle,
  onDelete,
  onUpdate,
  isDetailView = false,
}: VehicleItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<IVehicle>>({ ...vehicle });

  const handleSave = async () => {
    try {
      const updatedVehicle = await VehicleService.update(vehicle.id, editData);
      if (onUpdate) {
        onUpdate(updatedVehicle as IVehicle);
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update vehicle", err);
    }
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(vehicle.id);
    }
  };

  return (
    <div key={vehicle.id} className={styles.item}>
      <div className={styles.info}>
        {isEditing ? (
          <div className={styles.editForm}>
            <input
              value={editData.name || ""}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <input
              type="number"
              value={editData.price || ""}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
            />
            <div className={styles.buttons}>
              <button onClick={handleSave} className="btn">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2>
              {vehicle.name} {vehicle.model}
            </h2>
            <Year year={vehicle.year} />
            <Price price={vehicle.price} />
            <div className={styles.buttons}>
              {!isDetailView && (
                <Link className="btn" to={`/vehicle/${vehicle.id}`}>
                  Read more
                </Link>
              )}
              <button onClick={() => setIsEditing(true)} className="btn">
                Edit
              </button>
              <button onClick={handleDeleteClick} className="btn">
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VehicleItem;
