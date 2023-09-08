const getTimeAgo = (createdAt: Date) => {
  const todayTime = new Date().getTime();
  const createdAtTime = new Date(createdAt).getTime();
  const D = 1000 * 60 * 60 * 24;
  const diff = todayTime - createdAtTime;
  const diffDay = Math.floor(diff / D);

  return `${diffDay}일 전`;
};

export default getTimeAgo;
