import { RouteEquipmentPage } from "../../routes/constants";

// that function returns Leaflet.Popup
export default function getStringPopup(
  serialNumber = "Нет данных",
  chain = "Нет данных",
  store = "Нет данных",
  filling = "Нет данных",
  id
) {
  return `
    <div>
      <b>Торговое оборудование № ${serialNumber} </b>
      <p>Сеть: ${chain}</p>
      <p>Торговая точка: ${store}</p>
      <p>Наполнение: ${filling}%</p>
      <p><a href=${RouteEquipmentPage}:${id}>Подробная информация</a></p>
    </div>
  `;
}
