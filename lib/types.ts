export interface Slide {
  heading: string;
  photo: string;
  link: string;
}

export interface IMeta {
  title: string;
  description: string;
  keywords: string;
}

export interface IMenu {
  name: string;
  url: string;
  menu: IMenu[];
}

export interface IHomePage {
  meta: IMeta;
  slideshow: Slide[];
  social: { name: string; link: string }[];
}

export interface ISlideShow {
  url: string;
  alt: string;
}

export interface IGallery {
  url: string;
  alt: string;
}

export interface IServicePage {
  meta: IMeta;
  slideshow: ISlideShow[];
  gallery: IGallery[];
  content: {
    heading: string;
    body: string
  };
}

export interface IHero {
  heading: string;
  background: string;
}

export interface IAboutPage {
  meta: IMeta;
  hero: IHero;
  content: {
    heading: string;
    body: string
  };
}