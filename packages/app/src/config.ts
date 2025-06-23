export type AppConfig = {
  name: string;
  description: string;
  tagline: string;
  author: string;
  emails: {
    primary: string;
    support: string;
  };
  urls: {
    website?: string;
    github?: string;
    twitter?: string;
  };
};

export const appConfig: AppConfig = {
  name: "SimSom",
  description:
    "SimSom is a social media platform that allows you to share your thoughts and ideas with the world.",
  tagline: "Do small, do often",
  author: "ahm0xc",
  emails: {
    primary: "simsom@gmail.com",
    support: "support@simsom.com",
  },
  urls: {},
};
