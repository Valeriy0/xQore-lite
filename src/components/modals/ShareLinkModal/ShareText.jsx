import React, { useState } from 'react';
import { CustomLink, Button } from 'components';
import TelegramIcon from 'assets/socials/telegram.svg';
import TwitterIcon from 'assets/socials/twitter.svg';

export const ShareText = ({ reflink }) => {
  const shareTexts = [
    `I made my dream come true with @forsageio_official, join the Community! Go for it! ${reflink} #Forsage #ForsageBUSD #BUSD`,
    `Join my team ${reflink} and let's achieve our goals together with @forsageio_official #Forsage #ForsageBUSD #BUSD`,
    `A million people have already changed their lives in @forsageio_official! Let's do it, too! ${reflink} #Forsage #ForsageBUSD #BUSD`,
    `Forsage @forsageio_official opens up equal potential for each participant! Join in and start making your dreams come true. ${reflink} #Forsage #ForsageBUSD #BUSD`,
    `Forsage is an opportunity to earn more money! Opportunity to make your dreams come true! Forsage is a family! Join in @forsageio_official and start action! ${reflink} #Forsage #ForsageBUSD #BUSD`,
  ];

  const [randomNumber, setRandomNumber] = useState(0);

  const generateRandomNumber = async () => {
    const randomNumber = Math.floor(Math.random() * shareTexts.length);
    setRandomNumber(randomNumber);
  };

  return (
    <div className="flex flex-col justify-start w-full min-h-[474px] sm:min-h-0 sm:flex-1">
      <div className="flex items-center justify-between mb-7.5">
        <span className="text-white text-3xl font-medium sm:text-2xl">Share text</span>
        <Button className="!leading-30px" type="light-blue-rounded" onClick={generateRandomNumber}>
          Reload
        </Button>
      </div>
      <div className="flex flex-1 mb-10">
        <textarea
          name=""
          id=""
          className="resize-none flex flex-1 bg-white-100 rounded-mini text-base text-white font-normal p-15px outline-none h-240px sm:h-200px sm:text-sm"
          value={shareTexts[randomNumber]}
        />
      </div>
      <CustomLink
        href={`https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Ffiddle.jshell.net%2F_display%2F&text=${shareTexts[
          randomNumber
        ].replace('@forsageio_official', '@forsageofficial')}`}
        targetBlank
      >
        <Button type="primary" className="w-full mt-4 rounded-mini">
          <TwitterIcon className="mr-2.5 w-4 h-4" />
          <span>Share to Twitter</span>
        </Button>
      </CustomLink>
      <CustomLink targetBlank href={`https://telegram.me/share/url?url=${shareTexts[randomNumber]}`}>
        <Button type="primary" className="w-full mt-4 rounded-mini">
          <TelegramIcon className="mr-2.5 w-4 h-4" />
          <span>Share to Telegram </span>
        </Button>
      </CustomLink>
    </div>
  );
};
