import request from '../helpers/request';
import { fetchDownloadsCount } from './sourceforge';
import { humanDate, humanSize } from '../helpers/utils';

const baseURL = 'https://raw.githubusercontent.com/aospk';

const fetchDevices = async () => {
  try {
    const res = await request(`${baseURL}/official_devices/master/devices.json`);

    const brands = [];
    const devices = [];

    res.forEach(device => !brands.includes(device.brand) && brands.push(device.brand));

    brands.forEach(brand => devices.push({
      name: brand,
      devices: res.filter(device => device.brand === brand),
    }));

    return devices;
  } catch (e) {
    console.log('devices fetch failed');
  }
};

const fetchBuilds = async (codename, variant, android) => {
  try {
    const res = await request(`${baseURL}/official_devices/master/builds/${android}/${variant}/${codename}.json`);

    const promises = res.response.map(async (build) => {
      const downloads = await fetchDownloadsCount(build.filename, codename);
      const changelog = await fetchChangelog(build.filename, codename) || "";

      return {
        ...build,
        size: humanSize(build.size),
        datetime: humanDate(build.datetime),
        md5: build.id,
        downloads,
        changelog,
      };
    }).reverse();

    return await Promise.all(promises);
  } catch (e) {
    return [];
  }

};

const fetchChangelog = async (filename, codename, android) => {
  try {
    const res = await request(`${baseURL}/official_devices/master/changelogs/${android}/${variant}/${codename}/${filename.replace('zip', 'txt')}`, false);

    return res.includes('404') ? 'Changelog data no found' : res;
  } catch (err) {
    return 'Changelog data no found';
  }
};

const fetchROMChangelog = async () => {
  const res = await request('https://raw.githubusercontent.com/AOSPK/official_devices/master/changelogs/changelog.md', false);
  return res;
};

export { fetchDevices, fetchBuilds, fetchROMChangelog };
