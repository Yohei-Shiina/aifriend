export const combineText = (texts: string[]) => {
  return texts.join('\n');
}

// generate text using 
export const generateHeadingCitation = (citations: { urlTitle: string, url: string }[]) => {
  const citationList = citations.map((item) => {
    return `- [${item.urlTitle}](${item.url})`;
  }).join("\n");

  const heading = "## Reference";
  return combineText([heading, citationList]);
}
