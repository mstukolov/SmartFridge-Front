import { RouteEquipmentPage } from "../routes/constants";

// that function returns Leaflet.Popup
export default function getStringPopup(item) {
  console.log("args =======> ", item);
  return `
    <div>
      <b>Торговое оборудование № ${item.serialNumber} </b>
      <p>Сеть: </p>
      <p>Торговая точка: </p>
      <p>Наполнение: %</p>
      <p><a href=${RouteEquipmentPage}:${item.url}>Подробная информация</a></p>
    </div>
  `;
}
