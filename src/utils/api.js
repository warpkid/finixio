export const get = async (url) => {
  try {
    let response = await fetch(url);
    let json = await response.json();

    return json;
  } catch (ex) {
    console.log("Could not parse response from server");
  }
};
