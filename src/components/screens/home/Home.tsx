import styles from "./Home.module.css";
import VehicleItem from "./vehicle-item/VehicleItem.tsx";
import { useEffect, useMemo, useState } from "react";
import { VehicleService } from "../../../services/vehicle.service.ts";
import type { IVehicle } from "../../../types/vehicle.interface.ts";

function Home() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<"year" | "price" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const resetSorting = () => {
    setSortField(null);
    setSortDirection("asc");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await VehicleService.getAll();
        setVehicles(data);
      } catch (err) {
        setError("Failed to fetch vehicles");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот автомобиль?")) {
      try {
        await VehicleService.delete(id);
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
      } catch (err) {
        console.error("Ошибка при удалении автомобиля:", err);
        setError("Не удалось удалить автомобиль");
      }
    }
  };

  const handleUpdate = async (updatedVehicle: IVehicle) => {
    try {
      await VehicleService.update(updatedVehicle.id, updatedVehicle);
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
        )
      );
    } catch (err) {
      console.error("Ошибка при обновлении автомобиля:", err);
      setError("Не удалось обновить автомобиль");
    }
  };

  const sortedVehicles = useMemo(() => {
    if (!sortField) return vehicles;

    return [...vehicles].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [vehicles, sortField, sortDirection]);

  const toggleSort = (field: "year" | "price") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <>
      <div>
        <h1>Vehicles catalog</h1>

        <div className={styles.sortControls}>
          <button
            onClick={() => toggleSort("year")}
            className={`${styles.sortButton} ${
              sortField === "year" ? styles.active : ""
            }`}
          >
            Sort by Year{" "}
            {sortField === "year" && (sortDirection === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => toggleSort("price")}
            className={`${styles.sortButton} ${
              sortField === "price" ? styles.active : ""
            }`}
          >
            Sort by Price{" "}
            {sortField === "price" && (sortDirection === "asc" ? "↑" : "↓")}
          </button>
          {sortField && (
            <button onClick={resetSorting} className={styles.sortButton}>
              Reset Sort
            </button>
          )}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : sortedVehicles.length ? (
          sortedVehicles.map((vehicle: IVehicle) => (
            <VehicleItem
              key={vehicle.id}
              vehicle={vehicle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p>There are no vehicles</p>
        )}
      </div>
    </>
  );
}

export default Home;
