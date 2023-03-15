const getVideos = async (collectionName, artistName) => {
  const request = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBIm7kJ11te465gV1DWdJ4PU0DZs2eAr_M&type=video&q=${collectionName}-${artistName}-music-video`);
  const requestJson = await request.json();
  return requestJson.items;
};

export default getVideos;
