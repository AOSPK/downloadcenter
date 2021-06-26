import request from '../helpers/request';
import { getToday, getTimestamp } from '../helpers/utils';

const baseURL = 'https://sourceforge.net/projects/aospk';

const fetchDownloadsCount = async (filename, codename, variant) => {
  try {
    const res = await request(`${baseURL}/files/eleven/${codename}/${variant}/${filename}/stats/json?start_date=2019-04-06&end_date=${getToday()}`);
    return res.total;
  } catch (err) {
    return 0;
  }
};

const generateDownloadURL = (filename, codename, android, romtype) => {
  const downloadBase = `https://downloads.sourceforge.net/project/aospk/${android}/${codename}/${romtype}/${filename}`;
  return `${downloadBase}?r=&ts=${getTimestamp()}&use_mirror=autoselect`;
};

export { fetchDownloadsCount, generateDownloadURL };
