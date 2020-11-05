class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      const req = await fetch(url);

      const json = await req.json();

      return json;
    } catch (err) {
      console.log('Http get method err: ', err);

      throw new Error(err);
    }
  };

  post = async (url, body) => {
    try {
      const req = await fetch(url, {
        method: 'POST',
        body,
      });

      const json = await req.json();
      return json;
    } catch (err) {
      console.log('Http post method err: ', err);

      throw new Error(err);
    }
  };
}

export default Http;
