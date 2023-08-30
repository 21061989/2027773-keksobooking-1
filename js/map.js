import { unlocksForm } from './form.js';
import { createCard } from './card.js';

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinInnerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const INPUT_ADDRESS = document.querySelector('#address');
const DEFAULT_LAT = 35.68951;
const DEFAULT_LNG = 139.69212;
const ZOOM_DEFAULT = 12;
const TITLE_DEFAULT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUT_TILE_DEFAULT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';


const map = L.map('map-canvas');

const renderInnerMarker = (offer) => {
  const {location} = offer;
  const innerMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinInnerIcon,
    }
  );
  innerMarker
    .addTo(map)
    .bindPopup(createCard(offer));
};

const renderMarkers = (markers) => {

  markers.forEach ((marker) => {
    renderInnerMarker(marker);
  });
};

const mainMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const onMainMarkerMove = (evt) => {
  const coords = evt.target.getLatLng();
  INPUT_ADDRESS.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
};


const initMap = (markers) => {
  map.on('load', () => {
    unlocksForm();
  })
    .setView(
      {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG,
      }, ZOOM_DEFAULT);

  L.tileLayer(
    TITLE_DEFAULT,
    {
      attribution: ATTRIBUT_TILE_DEFAULT,
    },
  ).addTo(map);

  INPUT_ADDRESS.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;

  renderMarkers(markers);
  mainMarker.addTo(map);
  mainMarker.on('move', onMainMarkerMove);
};

export { initMap };