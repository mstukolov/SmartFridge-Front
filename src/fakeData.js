function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function randomCommercialNetwork() {
  return commercialNetworks[
    Object.keys(commercialNetworks)[randomInteger(0, 3)]
  ];
}

export const commercialNetworks = {
  Aschan_ID: {
    id: "Aschan_ID",
    name: "Ашан"
  },
  OK_ID: {
    id: "OK_ID",
    name: "ОК"
  },
  "5_ID": {
    id: "5_ID",
    name: "Пятерочка"
  },
  Perekrestok_ID: {
    id: "Perekrestok_ID",
    name: "Перекресток"
  }
};

export const tradePoints = {};

for (let i = 0; i < 20; i++) {
  tradePoints[`point_${i}_ID`] = {
    id: `point_${i}_ID`,
    name: `Торговая точка № ${i}`
  };
}
console.log("tradePoints", tradePoints);

export const equipment = {
  "5499b724-c331-4f29-b25f-55583c0ece34": {
    id: "5499b724-c331-4f29-b25f-55583c0ece34",
    remain: 38,
    sn: "461010892-5",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "175d63ab-c33f-414c-b921-d8ba3f04fec0": {
    id: "175d63ab-c33f-414c-b921-d8ba3f04fec0",
    remain: 3,
    sn: "449926092-2",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "58521d81-37c5-4073-8d32-d2539b1860bd": {
    id: "58521d81-37c5-4073-8d32-d2539b1860bd",
    remain: 31,
    sn: "380860314-3",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "8bacebb5-9a8c-49ff-aab8-7d4134d385a0": {
    id: "8bacebb5-9a8c-49ff-aab8-7d4134d385a0",
    remain: 57,
    sn: "848424591-8",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "68b68f49-ba03-4092-ac74-f70175082d8c": {
    id: "68b68f49-ba03-4092-ac74-f70175082d8c",
    remain: 21,
    sn: "012179295-1",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "9df646ef-f206-4b3d-8029-a2927141ca3e": {
    id: "9df646ef-f206-4b3d-8029-a2927141ca3e",
    remain: 56,
    sn: "714690531-4",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "61c44c95-a3b0-4e99-b2d4-475835f6e2f3": {
    id: "61c44c95-a3b0-4e99-b2d4-475835f6e2f3",
    remain: 34,
    sn: "565636142-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "49303e9a-c1be-47a1-8320-1a08a8e8a3eb": {
    id: "49303e9a-c1be-47a1-8320-1a08a8e8a3eb",
    remain: 6,
    sn: "820492672-3",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "e4bb3a30-04aa-42fa-a83f-188042b7923e": {
    id: "e4bb3a30-04aa-42fa-a83f-188042b7923e",
    remain: 73,
    sn: "625299759-5",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "0bd85e47-b859-46d7-93f8-eff6fbd0d71c": {
    id: "0bd85e47-b859-46d7-93f8-eff6fbd0d71c",
    remain: 8,
    sn: "337299392-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "cc174183-8825-48a7-81a2-18cabcea2baa": {
    id: "cc174183-8825-48a7-81a2-18cabcea2baa",
    remain: 20,
    sn: "797807368-8",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "2385cabc-cafd-4f41-a171-747285b9c540": {
    id: "2385cabc-cafd-4f41-a171-747285b9c540",
    remain: 47,
    sn: "359293071-0",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "4ea44a7c-622d-4c31-8bc1-89de5eceaa23": {
    id: "4ea44a7c-622d-4c31-8bc1-89de5eceaa23",
    remain: 91,
    sn: "402520646-3",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "453f72ff-6f3a-4ec4-86de-5284f8dce435": {
    id: "453f72ff-6f3a-4ec4-86de-5284f8dce435",
    remain: 24,
    sn: "051297382-2",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "4353895b-2b42-4129-acd1-455bcca23ba5": {
    id: "4353895b-2b42-4129-acd1-455bcca23ba5",
    remain: 78,
    sn: "265183934-5",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "b8e5a9cb-eff7-4b90-b64b-8775497e9e4f": {
    id: "b8e5a9cb-eff7-4b90-b64b-8775497e9e4f",
    remain: 78,
    sn: "651586860-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "82d782fb-ee1a-4d08-9c70-9fb329e3058d": {
    id: "82d782fb-ee1a-4d08-9c70-9fb329e3058d",
    remain: 16,
    sn: "956806916-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "9b2f49a6-d18f-4efa-a452-9b04d17a1267": {
    id: "9b2f49a6-d18f-4efa-a452-9b04d17a1267",
    remain: 80,
    sn: "557976179-1",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "77f1159a-c888-42d3-942f-48beadad0854": {
    id: "77f1159a-c888-42d3-942f-48beadad0854",
    remain: 30,
    sn: "471334242-4",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "8f2430c8-eaca-4570-9a75-646bcb3c1fef": {
    id: "8f2430c8-eaca-4570-9a75-646bcb3c1fef",
    remain: 93,
    sn: "277502076-3",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "e02c3e0f-51fe-40aa-a546-4c1bebce9289": {
    id: "e02c3e0f-51fe-40aa-a546-4c1bebce9289",
    remain: 85,
    sn: "132118500-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "518d7dab-3d2a-49f7-924f-d7d5676bbe37": {
    id: "518d7dab-3d2a-49f7-924f-d7d5676bbe37",
    remain: 83,
    sn: "350782029-3",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "41b40a74-4cce-4f9d-9db4-e877ee40302a": {
    id: "41b40a74-4cce-4f9d-9db4-e877ee40302a",
    remain: 33,
    sn: "429642226-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "0c4fc74a-f3c2-4791-be15-644583c4271f": {
    id: "0c4fc74a-f3c2-4791-be15-644583c4271f",
    remain: 16,
    sn: "261072898-0",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "5ffc48b9-4d76-4be8-81db-f2a5c8f19d20": {
    id: "5ffc48b9-4d76-4be8-81db-f2a5c8f19d20",
    remain: 56,
    sn: "293621778-4",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "50b1d9fc-4fed-41c0-b28b-1909f932f3d7": {
    id: "50b1d9fc-4fed-41c0-b28b-1909f932f3d7",
    remain: 34,
    sn: "825100211-7",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "c221cb7d-c2a8-4990-b88e-4a9e3bf723cd": {
    id: "c221cb7d-c2a8-4990-b88e-4a9e3bf723cd",
    remain: 65,
    sn: "203149104-0",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "3ad9bec4-5b08-40a5-97f8-ec09e9ba8953": {
    id: "3ad9bec4-5b08-40a5-97f8-ec09e9ba8953",
    remain: 33,
    sn: "459198388-9",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "d309535b-3165-4ee7-ac66-aaa9c5625145": {
    id: "d309535b-3165-4ee7-ac66-aaa9c5625145",
    remain: 44,
    sn: "992607653-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "560bd852-7055-4dd2-ad70-bff3fea0bd66": {
    id: "560bd852-7055-4dd2-ad70-bff3fea0bd66",
    remain: 3,
    sn: "607372101-3",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "dc27f6f1-d071-4c74-bad2-e51e1eefe6c0": {
    id: "dc27f6f1-d071-4c74-bad2-e51e1eefe6c0",
    remain: 64,
    sn: "319233205-0",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "5cec465a-fbea-4ba9-91a2-46ab899add14": {
    id: "5cec465a-fbea-4ba9-91a2-46ab899add14",
    remain: 47,
    sn: "925805713-9",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "0998c21d-ceed-4a95-bf0f-f6275603e591": {
    id: "0998c21d-ceed-4a95-bf0f-f6275603e591",
    remain: 56,
    sn: "467115596-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "85983733-5c0a-40c2-b414-819f274b39c8": {
    id: "85983733-5c0a-40c2-b414-819f274b39c8",
    remain: 33,
    sn: "589946828-9",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "7a7a2a54-d007-45f5-9fbe-28887bd9555f": {
    id: "7a7a2a54-d007-45f5-9fbe-28887bd9555f",
    remain: 26,
    sn: "003703355-7",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "4eb50c27-d281-4d9b-852d-5e98adc84355": {
    id: "4eb50c27-d281-4d9b-852d-5e98adc84355",
    remain: 92,
    sn: "061168302-4",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "0863083d-df8a-47e1-9cd9-c683e1700b91": {
    id: "0863083d-df8a-47e1-9cd9-c683e1700b91",
    remain: 64,
    sn: "986404822-8",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "a29facd7-3307-4a6d-8d74-8409d849b438": {
    id: "a29facd7-3307-4a6d-8d74-8409d849b438",
    remain: 52,
    sn: "324324451-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "be9b9fc9-b441-46db-ba03-fc9e07bcc4c7": {
    id: "be9b9fc9-b441-46db-ba03-fc9e07bcc4c7",
    remain: 43,
    sn: "871499922-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "d2919b2a-e293-45bd-9153-563e0c3952c2": {
    id: "d2919b2a-e293-45bd-9153-563e0c3952c2",
    remain: 67,
    sn: "059713121-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "61b5e406-c570-4469-8ed5-2a1a031d5bd6": {
    id: "61b5e406-c570-4469-8ed5-2a1a031d5bd6",
    remain: 76,
    sn: "609498152-9",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "19ca7eab-4462-4220-bbb4-3686bed8e9be": {
    id: "19ca7eab-4462-4220-bbb4-3686bed8e9be",
    remain: 46,
    sn: "131854535-8",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "0097d859-6bd1-4e26-adb4-eb82096665f6": {
    id: "0097d859-6bd1-4e26-adb4-eb82096665f6",
    remain: 91,
    sn: "452846781-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "97670215-17ae-49ca-856c-8e39983359e5": {
    id: "97670215-17ae-49ca-856c-8e39983359e5",
    remain: 96,
    sn: "677504107-1",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "9ab253f5-43e7-46ac-a199-4290444bca55": {
    id: "9ab253f5-43e7-46ac-a199-4290444bca55",
    remain: 45,
    sn: "658641242-0",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "23d82f62-f426-42f2-90c2-5207a18cb9a5": {
    id: "23d82f62-f426-42f2-90c2-5207a18cb9a5",
    remain: 75,
    sn: "527809189-4",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "e18963bc-2ec1-4874-824c-a9e71770a1b3": {
    id: "e18963bc-2ec1-4874-824c-a9e71770a1b3",
    remain: 49,
    sn: "688267100-1",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "b20b188c-5711-4e51-b8d2-51103dab95eb": {
    id: "b20b188c-5711-4e51-b8d2-51103dab95eb",
    remain: 60,
    sn: "857770085-2",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "1731f0d4-c036-4514-b856-bd1ef45c15b5": {
    id: "1731f0d4-c036-4514-b856-bd1ef45c15b5",
    remain: 99,
    sn: "917349094-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "b929477a-01f5-400f-bd7b-e0bace3e3b47": {
    id: "b929477a-01f5-400f-bd7b-e0bace3e3b47",
    remain: 34,
    sn: "838077885-5",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "76c7dd9d-72f8-47e0-9528-60b8e4793f31": {
    id: "76c7dd9d-72f8-47e0-9528-60b8e4793f31",
    remain: 11,
    sn: "456515377-7",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "2da4a521-973d-479e-91a6-75150434f1e4": {
    id: "2da4a521-973d-479e-91a6-75150434f1e4",
    remain: 51,
    sn: "963049879-0",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "4101f9a6-cd20-4fc7-8c5c-e9a05569bb6d": {
    id: "4101f9a6-cd20-4fc7-8c5c-e9a05569bb6d",
    remain: 78,
    sn: "748572875-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "ca18cc7c-1c75-4a60-927b-a667d5ac9311": {
    id: "ca18cc7c-1c75-4a60-927b-a667d5ac9311",
    remain: 38,
    sn: "080953419-3",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "1c08dbb8-85fc-43a0-b43f-4075306a67f0": {
    id: "1c08dbb8-85fc-43a0-b43f-4075306a67f0",
    remain: 82,
    sn: "065196830-5",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "38a02586-501b-44bc-b476-939a91fe963e": {
    id: "38a02586-501b-44bc-b476-939a91fe963e",
    remain: 14,
    sn: "042804072-1",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "7c2fd605-75c6-480f-9633-88c489ede2cb": {
    id: "7c2fd605-75c6-480f-9633-88c489ede2cb",
    remain: 9,
    sn: "888372710-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "64c5501a-7450-4d3c-b0ac-04935b88a213": {
    id: "64c5501a-7450-4d3c-b0ac-04935b88a213",
    remain: 59,
    sn: "885631994-2",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "cd703f21-874f-42ac-8b28-32f06639bf32": {
    id: "cd703f21-874f-42ac-8b28-32f06639bf32",
    remain: 75,
    sn: "128226399-4",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "1be03dc5-431d-4a91-bd1b-a588ee226652": {
    id: "1be03dc5-431d-4a91-bd1b-a588ee226652",
    remain: 68,
    sn: "022903992-8",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "75029a6b-2c08-4ac1-8747-c336caa2c20a": {
    id: "75029a6b-2c08-4ac1-8747-c336caa2c20a",
    remain: 85,
    sn: "826818356-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "fbcf2296-3fc7-431e-bebf-b5b3a6764a5d": {
    id: "fbcf2296-3fc7-431e-bebf-b5b3a6764a5d",
    remain: 39,
    sn: "756660935-1",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "035c1f31-4642-4c94-b2e6-654055b64182": {
    id: "035c1f31-4642-4c94-b2e6-654055b64182",
    remain: 24,
    sn: "895199230-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "d5421d19-7a7d-428e-a9e2-0d3bfe98494a": {
    id: "d5421d19-7a7d-428e-a9e2-0d3bfe98494a",
    remain: 68,
    sn: "805659524-4",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "39769fab-27c7-41b8-a4e6-c85f6bfcffea": {
    id: "39769fab-27c7-41b8-a4e6-c85f6bfcffea",
    remain: 83,
    sn: "184967007-2",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "a77f833c-6ec3-48c6-a59c-10c6865f2051": {
    id: "a77f833c-6ec3-48c6-a59c-10c6865f2051",
    remain: 85,
    sn: "968813704-9",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "faab20b3-5d74-4b95-b189-0455925cb888": {
    id: "faab20b3-5d74-4b95-b189-0455925cb888",
    remain: 51,
    sn: "975380276-5",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "28e375dc-45e3-4f83-a71a-e7bb52c65f0c": {
    id: "28e375dc-45e3-4f83-a71a-e7bb52c65f0c",
    remain: 33,
    sn: "744983563-0",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "e525c367-a98c-4650-932a-92f6e33c1b0d": {
    id: "e525c367-a98c-4650-932a-92f6e33c1b0d",
    remain: 85,
    sn: "419588192-7",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "6ed7937e-f1c8-466b-814e-0f40f6cde472": {
    id: "6ed7937e-f1c8-466b-814e-0f40f6cde472",
    remain: 100,
    sn: "521700587-4",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "e014b37d-2dde-4573-809e-0e30669b2017": {
    id: "e014b37d-2dde-4573-809e-0e30669b2017",
    remain: 70,
    sn: "886754595-7",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "84b8dc0d-5deb-42d9-addc-c1f4c9bf7647": {
    id: "84b8dc0d-5deb-42d9-addc-c1f4c9bf7647",
    remain: 73,
    sn: "821391350-7",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "36e45f97-94bc-4e41-913e-4612041a1bfb": {
    id: "36e45f97-94bc-4e41-913e-4612041a1bfb",
    remain: 32,
    sn: "745574710-1",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "b88de840-ab75-483c-a509-3ca3c85d2e7b": {
    id: "b88de840-ab75-483c-a509-3ca3c85d2e7b",
    remain: 65,
    sn: "488019475-1",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "278faf2c-ee3f-4ddf-943d-7a8242121180": {
    id: "278faf2c-ee3f-4ddf-943d-7a8242121180",
    remain: 47,
    sn: "129385872-2",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "53caace0-93ac-426a-8174-cd7b67da6edc": {
    id: "53caace0-93ac-426a-8174-cd7b67da6edc",
    remain: 25,
    sn: "136628631-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "62aa9332-406d-4a20-9caa-a189409d0f0b": {
    id: "62aa9332-406d-4a20-9caa-a189409d0f0b",
    remain: 42,
    sn: "509714779-0",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "1cdbd057-cbc7-4976-b782-4c52c976d778": {
    id: "1cdbd057-cbc7-4976-b782-4c52c976d778",
    remain: 13,
    sn: "910868622-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "03615c49-211f-45c1-a566-4d08a64c73d1": {
    id: "03615c49-211f-45c1-a566-4d08a64c73d1",
    remain: 54,
    sn: "136675616-9",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "91272a3a-4e11-4d31-8372-1c33416af2c2": {
    id: "91272a3a-4e11-4d31-8372-1c33416af2c2",
    remain: 8,
    sn: "674231068-5",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "a5a7eb88-6dae-42a7-8dd6-ee4d58248e70": {
    id: "a5a7eb88-6dae-42a7-8dd6-ee4d58248e70",
    remain: 98,
    sn: "282197836-7",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "e5e8c58e-3840-40f9-aff7-30a9bef4d3d0": {
    id: "e5e8c58e-3840-40f9-aff7-30a9bef4d3d0",
    remain: 79,
    sn: "708159470-0",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "b1a0a923-38ba-401a-a6b1-cdf37774e9f2": {
    id: "b1a0a923-38ba-401a-a6b1-cdf37774e9f2",
    remain: 8,
    sn: "887029914-7",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "8c887b71-4297-4fe7-b83c-a5395365409d": {
    id: "8c887b71-4297-4fe7-b83c-a5395365409d",
    remain: 33,
    sn: "515428556-5",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "760b1dac-d091-4d58-ba23-996bc1c7ac84": {
    id: "760b1dac-d091-4d58-ba23-996bc1c7ac84",
    remain: 71,
    sn: "949257461-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "b50be7f2-46e2-417f-9ed4-cbb5f63e51d9": {
    id: "b50be7f2-46e2-417f-9ed4-cbb5f63e51d9",
    remain: 34,
    sn: "951627500-1",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "3ac9a86a-938b-44fc-b536-f14d742baf5c": {
    id: "3ac9a86a-938b-44fc-b536-f14d742baf5c",
    remain: 7,
    sn: "721684317-7",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "08aac02a-76de-4d84-84d0-eda3399ef6d2": {
    id: "08aac02a-76de-4d84-84d0-eda3399ef6d2",
    remain: 2,
    sn: "727357394-9",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "84772bd7-656a-4df1-bb17-ffc9cc1c3854": {
    id: "84772bd7-656a-4df1-bb17-ffc9cc1c3854",
    remain: 53,
    sn: "251915408-X",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "1645e1aa-29c7-457b-9eb4-bda2f8c60652": {
    id: "1645e1aa-29c7-457b-9eb4-bda2f8c60652",
    remain: 56,
    sn: "509545133-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "a18ac885-a387-4178-bfa5-6d14a1fee919": {
    id: "a18ac885-a387-4178-bfa5-6d14a1fee919",
    remain: 85,
    sn: "065723341-2",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "021c590d-bfa9-4c80-ad8f-1051008bcd3c": {
    id: "021c590d-bfa9-4c80-ad8f-1051008bcd3c",
    remain: 62,
    sn: "215777035-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "70e83e7b-7ae7-46b4-91b5-9fa5544facdf": {
    id: "70e83e7b-7ae7-46b4-91b5-9fa5544facdf",
    remain: 35,
    sn: "324834740-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "334446b5-4398-4526-955f-bf3c28285589": {
    id: "334446b5-4398-4526-955f-bf3c28285589",
    remain: 77,
    sn: "478810513-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "914d6951-597b-4844-a0c3-2ef236e8d76c": {
    id: "914d6951-597b-4844-a0c3-2ef236e8d76c",
    remain: 86,
    sn: "708875415-0",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "7a1837ad-d7e4-4ff4-a6bc-291d8181487c": {
    id: "7a1837ad-d7e4-4ff4-a6bc-291d8181487c",
    remain: 4,
    sn: "971229777-2",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "abfb36c5-fbd9-4b75-a078-ec632926cc5e": {
    id: "abfb36c5-fbd9-4b75-a078-ec632926cc5e",
    remain: 37,
    sn: "733350507-3",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "bee214aa-9c8b-4064-9b73-a317c4019510": {
    id: "bee214aa-9c8b-4064-9b73-a317c4019510",
    remain: 69,
    sn: "139471466-1",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "cfc79a86-40c2-4d27-8dac-490494798d13": {
    id: "cfc79a86-40c2-4d27-8dac-490494798d13",
    remain: 33,
    sn: "799075748-6",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  },
  "aa33d2dd-5b00-4ad4-9f64-61742be90635": {
    id: "aa33d2dd-5b00-4ad4-9f64-61742be90635",
    remain: 95,
    sn: "182682545-2",
    dateUpdate: randomDate(new Date(2017, 11, 20), new Date()),
    refill: !!randomInteger(0, 1),
    tradePoint: "",
    commercialNetwork: randomCommercialNetwork().id
  }
};

export const location = {
  "5499b724-c331-4f29-b25f-55583c0ece34": {
    id: "5499b724-c331-4f29-b25f-55583c0ece34",
    lat: 47.9370871,
    lng: 29.6288401
  },
  "175d63ab-c33f-414c-b921-d8ba3f04fec0": {
    id: "175d63ab-c33f-414c-b921-d8ba3f04fec0",
    lat: -4.4898263,
    lng: 104.6412925
  },
  "58521d81-37c5-4073-8d32-d2539b1860bd": {
    id: "58521d81-37c5-4073-8d32-d2539b1860bd",
    lat: 5.9353459,
    lng: 7.0794263
  },
  "8bacebb5-9a8c-49ff-aab8-7d4134d385a0": {
    id: "8bacebb5-9a8c-49ff-aab8-7d4134d385a0",
    lat: 35.4755834,
    lng: 44.4075911
  },
  "68b68f49-ba03-4092-ac74-f70175082d8c": {
    id: "68b68f49-ba03-4092-ac74-f70175082d8c",
    lat: -3.2191864,
    lng: 40.1168906
  },
  "9df646ef-f206-4b3d-8029-a2927141ca3e": {
    id: "9df646ef-f206-4b3d-8029-a2927141ca3e",
    lat: 41.76,
    lng: -72.69
  },
  "61c44c95-a3b0-4e99-b2d4-475835f6e2f3": {
    id: "61c44c95-a3b0-4e99-b2d4-475835f6e2f3",
    lat: -9.8867238,
    lng: 124.2477171
  },
  "49303e9a-c1be-47a1-8320-1a08a8e8a3eb": {
    id: "49303e9a-c1be-47a1-8320-1a08a8e8a3eb",
    lat: 17.424274,
    lng: 121.779585
  },
  "e4bb3a30-04aa-42fa-a83f-188042b7923e": {
    id: "e4bb3a30-04aa-42fa-a83f-188042b7923e",
    lat: 11.7367016,
    lng: 122.0389128
  },
  "0bd85e47-b859-46d7-93f8-eff6fbd0d71c": {
    id: "0bd85e47-b859-46d7-93f8-eff6fbd0d71c",
    lat: 43.505478,
    lng: 18.7772645
  },
  "cc174183-8825-48a7-81a2-18cabcea2baa": {
    id: "cc174183-8825-48a7-81a2-18cabcea2baa",
    lat: 51.0026948,
    lng: 22.314478
  },
  "2385cabc-cafd-4f41-a171-747285b9c540": {
    id: "2385cabc-cafd-4f41-a171-747285b9c540",
    lat: 33.844582,
    lng: 115.778676
  },
  "4ea44a7c-622d-4c31-8bc1-89de5eceaa23": {
    id: "4ea44a7c-622d-4c31-8bc1-89de5eceaa23",
    lat: 50.4251949,
    lng: 19.300593
  },
  "453f72ff-6f3a-4ec4-86de-5284f8dce435": {
    id: "453f72ff-6f3a-4ec4-86de-5284f8dce435",
    lat: 23.320477,
    lng: 111.2138
  },
  "4353895b-2b42-4129-acd1-455bcca23ba5": {
    id: "4353895b-2b42-4129-acd1-455bcca23ba5",
    lat: -20.0859007,
    lng: -45.2957103
  },
  "b8e5a9cb-eff7-4b90-b64b-8775497e9e4f": {
    id: "b8e5a9cb-eff7-4b90-b64b-8775497e9e4f",
    lat: 22.8564518,
    lng: -82.4211025
  },
  "82d782fb-ee1a-4d08-9c70-9fb329e3058d": {
    id: "82d782fb-ee1a-4d08-9c70-9fb329e3058d",
    lat: 34.751868,
    lng: 107.035769
  },
  "9b2f49a6-d18f-4efa-a452-9b04d17a1267": {
    id: "9b2f49a6-d18f-4efa-a452-9b04d17a1267",
    lat: 34.041367,
    lng: 110.827862
  },
  "77f1159a-c888-42d3-942f-48beadad0854": {
    id: "77f1159a-c888-42d3-942f-48beadad0854",
    lat: 16.4498,
    lng: 107.5623501
  },
  "8f2430c8-eaca-4570-9a75-646bcb3c1fef": {
    id: "8f2430c8-eaca-4570-9a75-646bcb3c1fef",
    lat: 38.052038,
    lng: 114.466022
  },
  "e02c3e0f-51fe-40aa-a546-4c1bebce9289": {
    id: "e02c3e0f-51fe-40aa-a546-4c1bebce9289",
    lat: 38.7025085,
    lng: -9.3381698
  },
  "518d7dab-3d2a-49f7-924f-d7d5676bbe37": {
    id: "518d7dab-3d2a-49f7-924f-d7d5676bbe37",
    lat: "-6.936",
    lng: "112.8633"
  },
  "41b40a74-4cce-4f9d-9db4-e877ee40302a": {
    id: "41b40a74-4cce-4f9d-9db4-e877ee40302a",
    lat: 41.6704519,
    lng: -4.7135268
  },
  "0c4fc74a-f3c2-4791-be15-644583c4271f": {
    id: "0c4fc74a-f3c2-4791-be15-644583c4271f",
    lat: 35.3740182,
    lng: 36.6012942
  },
  "5ffc48b9-4d76-4be8-81db-f2a5c8f19d20": {
    id: "5ffc48b9-4d76-4be8-81db-f2a5c8f19d20",
    lat: 14.8704596,
    lng: 101.8322677
  },
  "50b1d9fc-4fed-41c0-b28b-1909f932f3d7": {
    id: "50b1d9fc-4fed-41c0-b28b-1909f932f3d7",
    lat: 43.6445087,
    lng: 25.1246359
  },
  "c221cb7d-c2a8-4990-b88e-4a9e3bf723cd": {
    id: "c221cb7d-c2a8-4990-b88e-4a9e3bf723cd",
    lat: 59.7714743,
    lng: 14.5276579
  },
  "3ad9bec4-5b08-40a5-97f8-ec09e9ba8953": {
    id: "3ad9bec4-5b08-40a5-97f8-ec09e9ba8953",
    lat: -2.886385,
    lng: -78.7759559
  },
  "d309535b-3165-4ee7-ac66-aaa9c5625145": {
    id: "d309535b-3165-4ee7-ac66-aaa9c5625145",
    lat: 40.9903208,
    lng: -7.3943499
  },
  "560bd852-7055-4dd2-ad70-bff3fea0bd66": {
    id: "560bd852-7055-4dd2-ad70-bff3fea0bd66",
    lat: -6.4525359,
    lng: -37.4894776
  },
  "dc27f6f1-d071-4c74-bad2-e51e1eefe6c0": {
    id: "dc27f6f1-d071-4c74-bad2-e51e1eefe6c0",
    lat: 31.306136,
    lng: 120.6240412
  },
  "5cec465a-fbea-4ba9-91a2-46ab899add14": {
    id: "5cec465a-fbea-4ba9-91a2-46ab899add14",
    lat: 34.4345947,
    lng: 35.8361633
  },
  "0998c21d-ceed-4a95-bf0f-f6275603e591": {
    id: "0998c21d-ceed-4a95-bf0f-f6275603e591",
    lat: 50.444953,
    lng: -104.3624353
  },
  "85983733-5c0a-40c2-b414-819f274b39c8": {
    id: "85983733-5c0a-40c2-b414-819f274b39c8",
    lat: -10.5440373,
    lng: -37.5960704
  },
  "7a7a2a54-d007-45f5-9fbe-28887bd9555f": {
    id: "7a7a2a54-d007-45f5-9fbe-28887bd9555f",
    lat: 22.556499,
    lng: 114.236875
  },
  "4eb50c27-d281-4d9b-852d-5e98adc84355": {
    id: "4eb50c27-d281-4d9b-852d-5e98adc84355",
    lat: 53.0815746,
    lng: 15.4900234
  },
  "0863083d-df8a-47e1-9cd9-c683e1700b91": {
    id: "0863083d-df8a-47e1-9cd9-c683e1700b91",
    lat: 34.4198488,
    lng: 70.4729434
  },
  "a29facd7-3307-4a6d-8d74-8409d849b438": {
    id: "a29facd7-3307-4a6d-8d74-8409d849b438",
    lat: 36.696506,
    lng: 114.203697
  },
  "be9b9fc9-b441-46db-ba03-fc9e07bcc4c7": {
    id: "be9b9fc9-b441-46db-ba03-fc9e07bcc4c7",
    lat: 48.081286,
    lng: 20.7644305
  },
  "d2919b2a-e293-45bd-9153-563e0c3952c2": {
    id: "d2919b2a-e293-45bd-9153-563e0c3952c2",
    lat: -10.1670956,
    lng: 123.5787505
  },
  "61b5e406-c570-4469-8ed5-2a1a031d5bd6": {
    id: "61b5e406-c570-4469-8ed5-2a1a031d5bd6",
    lat: 35.519548,
    lng: 102.015248
  },
  "19ca7eab-4462-4220-bbb4-3686bed8e9be": {
    id: "19ca7eab-4462-4220-bbb4-3686bed8e9be",
    lat: 9.9298167,
    lng: -73.9590333
  },
  "0097d859-6bd1-4e26-adb4-eb82096665f6": {
    id: "0097d859-6bd1-4e26-adb4-eb82096665f6",
    lat: -26.5325948,
    lng: 29.0706468
  },
  "97670215-17ae-49ca-856c-8e39983359e5": {
    id: "97670215-17ae-49ca-856c-8e39983359e5",
    lat: 13.8093174,
    lng: -87.2593454
  },
  "9ab253f5-43e7-46ac-a199-4290444bca55": {
    id: "9ab253f5-43e7-46ac-a199-4290444bca55",
    lat: 38.430793,
    lng: 100.812859
  },
  "23d82f62-f426-42f2-90c2-5207a18cb9a5": {
    id: "23d82f62-f426-42f2-90c2-5207a18cb9a5",
    lat: -4.203165,
    lng: -69.935907
  },
  "e18963bc-2ec1-4874-824c-a9e71770a1b3": {
    id: "e18963bc-2ec1-4874-824c-a9e71770a1b3",
    lat: 39.5835818,
    lng: -8.6717798
  },
  "b20b188c-5711-4e51-b8d2-51103dab95eb": {
    id: "b20b188c-5711-4e51-b8d2-51103dab95eb",
    lat: 25.386379,
    lng: 114.922922
  },
  "1731f0d4-c036-4514-b856-bd1ef45c15b5": {
    id: "1731f0d4-c036-4514-b856-bd1ef45c15b5",
    lat: 52.6886817,
    lng: 115.1891675
  },
  "b929477a-01f5-400f-bd7b-e0bace3e3b47": {
    id: "b929477a-01f5-400f-bd7b-e0bace3e3b47",
    lat: 13.1984059,
    lng: -88.0534236
  },
  "76c7dd9d-72f8-47e0-9528-60b8e4793f31": {
    id: "76c7dd9d-72f8-47e0-9528-60b8e4793f31",
    lat: 48.7997482,
    lng: 2.4699259
  },
  "2da4a521-973d-479e-91a6-75150434f1e4": {
    id: "2da4a521-973d-479e-91a6-75150434f1e4",
    lat: 34.888685,
    lng: 111.607282
  },
  "4101f9a6-cd20-4fc7-8c5c-e9a05569bb6d": {
    id: "4101f9a6-cd20-4fc7-8c5c-e9a05569bb6d",
    lat: 24.9372186,
    lng: 118.6422409
  },
  "ca18cc7c-1c75-4a60-927b-a667d5ac9311": {
    id: "ca18cc7c-1c75-4a60-927b-a667d5ac9311",
    lat: -7.3453791,
    lng: 108.8941596
  },
  "1c08dbb8-85fc-43a0-b43f-4075306a67f0": {
    id: "1c08dbb8-85fc-43a0-b43f-4075306a67f0",
    lat: 11.5521428,
    lng: 123.1156361
  },
  "38a02586-501b-44bc-b476-939a91fe963e": {
    id: "38a02586-501b-44bc-b476-939a91fe963e",
    lat: 34.477861,
    lng: 110.084789
  },
  "7c2fd605-75c6-480f-9633-88c489ede2cb": {
    id: "7c2fd605-75c6-480f-9633-88c489ede2cb",
    lat: 61.8879727,
    lng: 22.0502411
  },
  "64c5501a-7450-4d3c-b0ac-04935b88a213": {
    id: "64c5501a-7450-4d3c-b0ac-04935b88a213",
    lat: 45.5825837,
    lng: 17.9517519
  },
  "cd703f21-874f-42ac-8b28-32f06639bf32": {
    id: "cd703f21-874f-42ac-8b28-32f06639bf32",
    lat: 52.6915552,
    lng: 1.6993747
  },
  "1be03dc5-431d-4a91-bd1b-a588ee226652": {
    id: "1be03dc5-431d-4a91-bd1b-a588ee226652",
    lat: -4.8531154,
    lng: 21.5587544
  },
  "75029a6b-2c08-4ac1-8747-c336caa2c20a": {
    id: "75029a6b-2c08-4ac1-8747-c336caa2c20a",
    lat: 63.1454739,
    lng: 22.7948195
  },
  "fbcf2296-3fc7-431e-bebf-b5b3a6764a5d": {
    id: "fbcf2296-3fc7-431e-bebf-b5b3a6764a5d",
    lat: 31.1206637,
    lng: 120.9061578
  },
  "035c1f31-4642-4c94-b2e6-654055b64182": {
    id: "035c1f31-4642-4c94-b2e6-654055b64182",
    lat: 53.8595684,
    lng: 21.3130974
  },
  "d5421d19-7a7d-428e-a9e2-0d3bfe98494a": {
    id: "d5421d19-7a7d-428e-a9e2-0d3bfe98494a",
    lat: -21.7972251,
    lng: -50.879763
  },
  "39769fab-27c7-41b8-a4e6-c85f6bfcffea": {
    id: "39769fab-27c7-41b8-a4e6-c85f6bfcffea",
    lat: -8.2216521,
    lng: 113.804931
  },
  "a77f833c-6ec3-48c6-a59c-10c6865f2051": {
    id: "a77f833c-6ec3-48c6-a59c-10c6865f2051",
    lat: 12.1235658,
    lng: 37.7795618
  },
  "faab20b3-5d74-4b95-b189-0455925cb888": {
    id: "faab20b3-5d74-4b95-b189-0455925cb888",
    lat: 60.7865441,
    lng: 14.1928243
  },
  "28e375dc-45e3-4f83-a71a-e7bb52c65f0c": {
    id: "28e375dc-45e3-4f83-a71a-e7bb52c65f0c",
    lat: 2.6131897,
    lng: -75.3915037
  },
  "e525c367-a98c-4650-932a-92f6e33c1b0d": {
    id: "e525c367-a98c-4650-932a-92f6e33c1b0d",
    lat: 41.9339521,
    lng: 74.5404694
  },
  "6ed7937e-f1c8-466b-814e-0f40f6cde472": {
    id: "6ed7937e-f1c8-466b-814e-0f40f6cde472",
    lat: 8.5131518,
    lng: 124.7568082
  },
  "e014b37d-2dde-4573-809e-0e30669b2017": {
    id: "e014b37d-2dde-4573-809e-0e30669b2017",
    lat: 44.9544161,
    lng: 42.0328581
  },
  "84b8dc0d-5deb-42d9-addc-c1f4c9bf7647": {
    id: "84b8dc0d-5deb-42d9-addc-c1f4c9bf7647",
    lat: -14.9061237,
    lng: 50.2785486
  },
  "36e45f97-94bc-4e41-913e-4612041a1bfb": {
    id: "36e45f97-94bc-4e41-913e-4612041a1bfb",
    lat: 55.8930684,
    lng: 37.585677
  },
  "b88de840-ab75-483c-a509-3ca3c85d2e7b": {
    id: "b88de840-ab75-483c-a509-3ca3c85d2e7b",
    lat: 14.434698,
    lng: 120.878011
  },
  "278faf2c-ee3f-4ddf-943d-7a8242121180": {
    id: "278faf2c-ee3f-4ddf-943d-7a8242121180",
    lat: 22.801624,
    lng: 113.525165
  },
  "53caace0-93ac-426a-8174-cd7b67da6edc": {
    id: "53caace0-93ac-426a-8174-cd7b67da6edc",
    lat: 43.5661719,
    lng: 43.4895256
  },
  "62aa9332-406d-4a20-9caa-a189409d0f0b": {
    id: "62aa9332-406d-4a20-9caa-a189409d0f0b",
    lat: 29.237137,
    lng: 91.773134
  },
  "1cdbd057-cbc7-4976-b782-4c52c976d778": {
    id: "1cdbd057-cbc7-4976-b782-4c52c976d778",
    lat: 3.6135482,
    lng: 98.5025286
  },
  "03615c49-211f-45c1-a566-4d08a64c73d1": {
    id: "03615c49-211f-45c1-a566-4d08a64c73d1",
    lat: 22.3908295,
    lng: 113.9725126
  },
  "91272a3a-4e11-4d31-8372-1c33416af2c2": {
    id: "91272a3a-4e11-4d31-8372-1c33416af2c2",
    lat: 18.0435607,
    lng: 100.1031202
  },
  "a5a7eb88-6dae-42a7-8dd6-ee4d58248e70": {
    id: "a5a7eb88-6dae-42a7-8dd6-ee4d58248e70",
    lat: 46.6523173,
    lng: 16.2030722
  },
  "e5e8c58e-3840-40f9-aff7-30a9bef4d3d0": {
    id: "e5e8c58e-3840-40f9-aff7-30a9bef4d3d0",
    lat: 33.0517157,
    lng: 68.0149609
  },
  "b1a0a923-38ba-401a-a6b1-cdf37774e9f2": {
    id: "b1a0a923-38ba-401a-a6b1-cdf37774e9f2",
    lat: 31.26179,
    lng: 121.423664
  },
  "8c887b71-4297-4fe7-b83c-a5395365409d": {
    id: "8c887b71-4297-4fe7-b83c-a5395365409d",
    lat: 48.3228384,
    lng: 29.1521095
  },
  "760b1dac-d091-4d58-ba23-996bc1c7ac84": {
    id: "760b1dac-d091-4d58-ba23-996bc1c7ac84",
    lat: 1.148102,
    lng: 104.011505
  },
  "b50be7f2-46e2-417f-9ed4-cbb5f63e51d9": {
    id: "b50be7f2-46e2-417f-9ed4-cbb5f63e51d9",
    lat: 43.8234396,
    lng: 17.5393153
  },
  "3ac9a86a-938b-44fc-b536-f14d742baf5c": {
    id: "3ac9a86a-938b-44fc-b536-f14d742baf5c",
    lat: -22.65053,
    lng: -60.129002
  },
  "08aac02a-76de-4d84-84d0-eda3399ef6d2": {
    id: "08aac02a-76de-4d84-84d0-eda3399ef6d2",
    lat: 56.290878,
    lng: 26.721958
  },
  "84772bd7-656a-4df1-bb17-ffc9cc1c3854": {
    id: "84772bd7-656a-4df1-bb17-ffc9cc1c3854",
    lat: 45.2029369,
    lng: 141.7366591
  },
  "1645e1aa-29c7-457b-9eb4-bda2f8c60652": {
    id: "1645e1aa-29c7-457b-9eb4-bda2f8c60652",
    lat: -28.5757953,
    lng: -70.7571009
  },
  "a18ac885-a387-4178-bfa5-6d14a1fee919": {
    id: "a18ac885-a387-4178-bfa5-6d14a1fee919",
    lat: 25.015105,
    lng: 102.743811
  },
  "021c590d-bfa9-4c80-ad8f-1051008bcd3c": {
    id: "021c590d-bfa9-4c80-ad8f-1051008bcd3c",
    lat: 39.6532428,
    lng: -8.8604748
  },
  "70e83e7b-7ae7-46b4-91b5-9fa5544facdf": {
    id: "70e83e7b-7ae7-46b4-91b5-9fa5544facdf",
    lat: "-8.8816",
    lng: "121.2125"
  },
  "334446b5-4398-4526-955f-bf3c28285589": {
    id: "334446b5-4398-4526-955f-bf3c28285589",
    lat: -33.7974423,
    lng: 151.2502275
  },
  "914d6951-597b-4844-a0c3-2ef236e8d76c": {
    id: "914d6951-597b-4844-a0c3-2ef236e8d76c",
    lat: -17.5872806,
    lng: 48.2219395
  },
  "7a1837ad-d7e4-4ff4-a6bc-291d8181487c": {
    id: "7a1837ad-d7e4-4ff4-a6bc-291d8181487c",
    lat: -6.4712737,
    lng: 110.8171082
  },
  "abfb36c5-fbd9-4b75-a078-ec632926cc5e": {
    id: "abfb36c5-fbd9-4b75-a078-ec632926cc5e",
    lat: 57.2992579,
    lng: 39.8548496
  },
  "bee214aa-9c8b-4064-9b73-a317c4019510": {
    id: "bee214aa-9c8b-4064-9b73-a317c4019510",
    lat: -7.9794517,
    lng: 112.0416754
  },
  "cfc79a86-40c2-4d27-8dac-490494798d13": {
    id: "cfc79a86-40c2-4d27-8dac-490494798d13",
    lat: 53.0210495,
    lng: 27.554013
  },
  "aa33d2dd-5b00-4ad4-9f64-61742be90635": {
    id: "aa33d2dd-5b00-4ad4-9f64-61742be90635",
    lat: 49.7123742,
    lng: 17.9032009
  }
};
