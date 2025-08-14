export const combineText = (texts: string[]) => {
  return texts.join('\n');
}

// generate text using 
export const generateHeadingCitation = (citations: { title: string, url: string }[]) => {
  const citationList = citations.map((item) => {
    return `- [${item.title}](${item.url})`;
  });

  const heading = "## 関連URL";
  return combineText([heading, ...citationList]);
}
