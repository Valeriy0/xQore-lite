import React, { useMemo, useState } from 'react';
import CopyIcon from 'assets/icons/copy_white.svg';
import DownloadIcon from 'assets/icons/download.svg';
import { Button, CustomLink, Textarea } from 'components';
import { copy } from 'helpers/text';
import { FORSAGE_MAIN_URL, ReflinkTypes } from 'helpers/constants';
import { PromoModal } from 'components/modals';
import FileIcon from 'assets/icons/file.svg';

export const PromoItem = ({ file, refkey, preview, type }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleCloseModal = () => {
    setIsOpened(false);
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsOpened(true);
  };

  const promoLink = !!refkey ? ReflinkTypes['base'] + refkey : FORSAGE_MAIN_URL;

  const publishLink = useMemo(() => {
    if (file?.type === 'banner') {
      return `<a href='${promoLink}' target='_blank'><img src='${file?.url}'/></a>`;
    }
    return file?.url;
  }, [type]);

  const previewContent = useMemo(() => {
    if (preview) {
      return (
        <div className="max-h-56 w-full flex flex-1 justify-center items-center">
          {file?.type === 'video' ? (
            <iframe
              className="bg-black max-h-full"
              src={`https://www.youtube.com/embed/${file?.key}`}
              srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${file?.key}?autoplay=1><img src=https://img.youtube.com/vi/${file?.key}/hqdefault.jpg><span>▶</span></a>`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img onClick={openModal} src={file?.url} className="max-w-full max-h-56" alt="" />
          )}
        </div>
      );
    }
  }, [preview]);

  const iconTitle = useMemo(() => {
    if (!preview) {
      if (!!file?.lang) {
        return <img src={`/flags/${file?.lang}.svg`} className="w-5 h-5" alt="" />;
      } else {
        return <FileIcon className="w-5 h-5" />;
      }
    }
  }, [preview]);

  const footerContent = useMemo(() => {
    if (preview) {
      return (
        <div className="w-full flex flex-col space-y-2.5">
          <Textarea
            copyValue
            value={publishLink}
            readOnly
            className={`text-xs text-white-500  ${file?.type === 'video' ? 'h-12' : 'h-16 sm:h-24'}`}
          />
        </div>
      );
    }
    return (
      <div className="flex space-x-2.5">
        <CustomLink href={file?.url} targetBlank>
          <Button type="light-blue-rounded" className="!leading-30px py-1.5">
            <DownloadIcon className="w-5 h-5" />
          </Button>
        </CustomLink>
        <Button type="light-blue-rounded" className="!leading-30px py-1.5" onClick={() => copy(file?.url)}>
          <CopyIcon className="w-5 h-5" />
        </Button>
      </div>
    );
  }, [preview]);

  return (
    <div
      className={`flex ${
        preview ? 'flex-col justify-start space-y-2.5' : 'justify-between space-x-2.5'
      } items-center py-2.5 px-3 rounded-mini bg-white-100 w-full`}
    >
      {previewContent}
      <div
        className={`w-full flex items-center ${
          preview && 'justify-center text-center'
        } text-white text-base sm:text-sm`}
      >
        <div className="mr-2.5">{iconTitle}</div>
        {file?.title}
      </div>
      {footerContent}
      {isOpened && preview && (
        <PromoModal onClose={handleCloseModal} link={file?.url} publishLink={publishLink} title={file?.title} />
      )}
    </div>
  );
};
