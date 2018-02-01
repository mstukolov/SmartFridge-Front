import { EQUIPMEN_PAGE } from "../../routes/constants";

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
      <p><a href=${EQUIPMEN_PAGE}:${id}>Подробная информация</a></p>
    </div>
  `;
}
