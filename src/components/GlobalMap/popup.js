import { RouteEquipmentPage } from "../../routes/constants";

// that function returns Leaflet.Popup
export default function getStringPopup(
  item,
  serial = "нет данных",
  network = "нет данных",
  point = "нет данных",
  refill = "нет данных"
) {
  return `
    <div>
      <b>Торговое оборудование № ${serial} </b>
      <p>Сеть: ${network}</p>
      <p>Торговая точка: ${point}</p>
      <p>Наполнение: ${refill}</p>
      <p><a href=${RouteEquipmentPage}:${item.url}>Подробная информация</a></p>
    </div>
  `;
}
