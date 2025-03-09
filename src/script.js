function convertToEmbed(url) {
    if (url.includes("youtu.be")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    } else if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url; // 변환할 필요 없으면 그대로 반환
}  