import * as api from "./api";

let prefix = "https://min-api.cryptocompare.com/data/";

export const getCoinInfo = async () => {
  let topList = await getTopList();
  let infoUrl = `${prefix}pricemultifull?fsyms=${topList.join(",")}&tsyms=USD`;
  let coinsResponse = await api.get(infoUrl);
  let raw = coinsResponse.RAW;
  let display = coinsResponse.DISPLAY;

  let dataset = Object.keys(raw).map((coin) => {
    let current = raw[coin].USD.PRICE;
    let open = raw[coin].USD.OPENDAY;
    let imageUrl = display[coin].USD.IMAGEURL;
    let diff = calculateDifference(current, open);
    return {
      imageUrl: "https://cryptocompare.com" + imageUrl,
      coin,
      current,
      open,
      differenceDisplay: diff[0] + "% " + diff[1],
      difference: diff[0],
    };
  });
  return dataset.sort((i, j) => j.difference - i.difference);
};

const getTopList = async () => {
  let topListUrl = `${prefix}top/totalvolfull?limit=10&tsym=USD`;
  let result = [];
  let topList = (await api.get(topListUrl)).Data;
  result = topList.map((i) => i.CoinInfo.Name);
  return result;
};

const calculateDifference = (current, opening) => {
  let result = (((current - opening) / opening) * 100).toFixed(2);
  return [result, "$" + (current - opening).toFixed(2)];
};
