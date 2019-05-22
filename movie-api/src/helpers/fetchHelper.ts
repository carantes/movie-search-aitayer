import fetch from "node-fetch";

class FetchHelper {
  async get(url: string): Promise<any> {
    return await fetch(url).then(response => response.json());
  }

  async getAll(urls: Array<string>): Promise<any> {
    const apis = [];
    urls.map(url => apis.push(this.get(url)));
    return await Promise.all(apis);
  }
}

export default new FetchHelper();
