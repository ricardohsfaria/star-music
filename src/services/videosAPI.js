const getVideos = async (collectionName, artistName) => {
  const request = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC8uYglDoKdnB2uAQZis4Xzp0oAzoV5QLc&type=video&q=${collectionName}-${artistName}-music-video`);
  const requestJson = await request.json();
  return requestJson.items;
};

export default getVideos;
