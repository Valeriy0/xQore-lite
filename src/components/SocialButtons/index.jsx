import React from 'react';
import { CustomLink } from 'components';
import TwitterIcon from 'assets/socials/twitter.svg';
import TelegramIcon from 'assets/socials/telegram.svg';
import YoutubeIcon from 'assets/socials/youtube.svg';
import DiscordIcon from 'assets/socials/discord.svg';

const Icons = [
  // { icon: DiscordIcon, link: 'https://discord.gg/forsage' },
  { icon: TelegramIcon, link: 'https://t.me/PumaLabsOfficial' },
  // { icon: YoutubeIcon, link: 'https://www.youtube.com/channel/UC4ZUzYVAw01R9ERwBte-eQA/' },
  { icon: TwitterIcon, link: 'https://twitter.com/puma_labs' },
];

export const SocialButtons = () => {
  return (
    <div className="flex space-x-4 w-full">
      {Icons.map((item, index) => {
        const Icon = item.icon;

        return (
          <CustomLink
            key={index}
            href={item.link}
            targetBlank
            className={'w-7 h-7 flex justify-center items-center rounded-full bg-white-100 hover:bg-white-300'}
          >
            <Icon className="w-4 h-4" />
          </CustomLink>
        );
      })}
    </div>
  );
};
