const readImgFile = (
  fileList: File[],
  onload: (e: ProgressEvent<FileReader>) => void,
  onFail: () => void
) => {
  const file = fileList[0] as File;

  const { name, size } = file;
  // 마지막 '.' 위치를 찾고 + 1 하여 확장자 명을 가져온다.
  const fileExt = name.substring(name.lastIndexOf(".") + 1).toLowerCase();

  // 확장자 체크 & 용량 체크
  if (!["jpeg", "png", "gif", "bmp"].includes(fileExt) && size > 1048576) {
    return onFail();
  }

  const reader = new FileReader();

  reader.onload = onload;

  reader.readAsDataURL(file);
  return file;
};

export default readImgFile;
