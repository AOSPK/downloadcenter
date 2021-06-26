import request from '../helpers/request';

const BaseURL = "https://gerrit.aospk.org";


const fetchMergedChanges = async () => {

  try {
    const data = await request(`${BaseURL}/changes/?O=81&S=0&n=30&q=status%3Amerged`, false);

    return JSON.parse(data.replace(")]}'", ""))
  } catch (err) {
    return [];
  }
}

export { fetchMergedChanges }