import { RouteEquipmentPage } from "../../routes/constants";

// that function returns Leaflet.Popup
export default function getStringPopup(fridge) {
  const { Serialnumber, commercialNetwork, tradePoint, remain, id } = fridge;
  return `
    <div>
      <b>Торговое оборудование № ${Serialnumber} </b>
      <p>Сеть: ${commercialNetwork}</p>
      <p>Торговая точка: ${tradePoint}</p>
      <p>Наполнение: ${remain}%</p>
      <p><a href=${RouteEquipmentPage}:${id}>Подробная информация</a></p>
    </div>
  `;
}
