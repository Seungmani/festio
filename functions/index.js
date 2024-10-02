const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require('axios');
admin.initializeApp();

exports.fetchAndSaveData = functions.https.onRequest(async (req, res) => {
  try {
    // 외부 API 호출
    const apiResponse = await axios.get(`http://api.kcisa.kr/openapi/API_CCA_149/request?serviceKey=bea9f0fa-bf8b-4435-a31a-08991093001c`);
		const items = apiResponse.data.response.body.items.item;
		const promises = items.map(async (item) => {
      const data = {
        title: item.TITLE || "",
        description: item.DESCRIPTION || "",
        imageUrl: item.IMAGE_OBJECT || '',
        link: item.URL || '',
        localId: item.LOCAL_ID || '',
        genre: item.GENRE || '',
        call: item.CONTACT_POINT || '',
        age: item.AUDIENCE || '',
        period: item.PERIOD || '',
        time: item.EVENT_PERIOD || '',
      };

      const docRef = admin.firestore().collection('apiData').doc(data.localId);
      await docRef.set(data);
		});

    await Promise.all(promises);

		res.status(200).send(`${apiResponse.data.response.body.totalCount}개 저장 완료`);
  } catch (error) {
    console.error('Error fetching and saving data:', error);
    res.status(500).send('Error saving data');
  }
});
