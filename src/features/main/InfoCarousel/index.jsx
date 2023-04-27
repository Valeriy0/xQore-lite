import React, { useMemo } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { CarouseItem } from './CarouselItem';

export const InfoCarousel = () => {
  const data = [
    {
      title: 'What is Forsage',
      link: 'https://support.forsage.io/article/',
      text: 'Learn all about the community, supported blockchains and the entire Forsage ecosystem',
    },
    {
      title: 'Forsage Programs Breakdown',
      link: 'https://support.forsage.io/article/education/forsage-programs-breakdown',
      text: 'How the marketing programs Forsage x3, x4, xXx, XGold and xQore work',
    },
    {
      title: 'About Personal Link',
      link: 'https://support.forsage.io/article/education/about-personal-link',
      text: 'Useful tips on how to use a referral link, a custom link, and managing the registration of a partner structure',
    },
    {
      title: 'Tips for Finding New Partners',
      link: 'https://support.forsage.io/article/education/tips-for-finding-new-partners',
      text: 'Tips on how to invite people and where to find an endless source of new partners. ',
    },
    {
      title: '5 Mistakes Made by Newbies',
      link: 'https://support.forsage.io/article/education/fivemistakes',
      text: 'The article talked about the common mistakes of beginners and how not to let them go',
    },
  ];

  const settings = {
    showStatus: false,
    showThumbs: false,
    showIndicators: false,
    infiniteLoop: true,
    autoPlay: true,
    interval: 12500,
  };

  return (
    <div className="bg-black-light z-10 rounded overflow-hidden sm:rounded-none">
      <Carousel {...settings}>
        {data?.map((item, indexItem) => (
          <CarouseItem {...item} key={indexItem} />
        ))}
      </Carousel>
    </div>
  );
};
