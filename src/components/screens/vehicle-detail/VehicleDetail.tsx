import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { VehicleService } from "../../../services/vehicle.service";
import VehicleItem from "../home/vehicle-item/VehicleItem";
import type { IVehicle } from "../../../types/vehicle.interface";
import { YandexMap } from "../../YandexMap";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<IVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await VehicleService.getById(Number(id));
        setVehicle(data);
      } catch (err) {
        setError("Failed to fetch vehicle details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!vehicle) return <p>Vehicle not found</p>;

  return (
    <div>
      <Link className="btn" to="/">
        Back
      </Link>
      <VehicleItem vehicle={vehicle} isDetailView={true} />
      <YandexMap
        center={[vehicle.latitude, vehicle.longitude]}
        markerText={`${vehicle.name} ${vehicle.model}`}
      />
    </div>
  );
};

export default VehicleDetail;
