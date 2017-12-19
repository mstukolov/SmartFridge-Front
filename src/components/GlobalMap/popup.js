import { RouteEquipmentPage } from "../routes/constants";

// that function returns Leaflet.Popup
export default function getStringPopup(url) {
  return `
    <div>
      <b>Холодильник</b>
      <p><a href=${RouteEquipmentPage}:${url}>Подробная информация</p>
    </div>
  `;
}
