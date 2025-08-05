import { promptEN, promptJP } from "@root/config/prompt";

export const combineText = (texts: string[]) => {
  return texts.join('\n');
}

export const generatePrompt = (language: "japanese" | "english" = "japanese", input?: string): string => {
  if (language === "japanese") {
    return promptJP(input);
  } else {
    return promptEN(input);
  }
}

// generate text using 
export const generateCitation = (citations: { title: string, url: string }[]) => {
  const citationList = citations.map((item) => {
    return `- [${item.title}](${item.url})`;
  });

  const heading = "## 関連URL";
  return combineText([heading, ...citationList]);
}
