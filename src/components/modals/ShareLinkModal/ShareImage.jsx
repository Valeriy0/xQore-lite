import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Button } from 'components';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { format, parseISO } from 'date-fns';
import { splitNumber } from 'helpers/format';
import domToImage from 'dom-to-image';
import ChartImage from 'public/svg/chart.svg';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import PumaIcon from 'public/svg/puma_gradient.svg';
import { isTablet, isMobile, isDesktop, isSafari, isChrome } from 'react-device-detect';

export const ShareImage = ({ reflink }) => {
  const bannerRef = useRef(null);
  const imgRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const authUser = useSelector(getAuthUser);

  useEffect(() => {
    domToImage
      .toPng(bannerRef.current, {
        height: 1117,
        width: 1728,
        windowWidth: '1728px',
        windowHeight: '1117px',
        scale: '0.7',
      })
      .then((url) => {
        if (imgRef?.current) {
          imgRef.current.src = url;
          setDownloadUrl(url);
        }
      });
  }, []);

  const onClickButton = () => {
    try {
      if (downloadUrl) {
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = downloadUrl;
        anchor.download = 'ForsageResults.png';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }
    } catch (e) {}
  };

  const onClickShare = () => {
    if (navigator?.share) {
      const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
      };

      const shareData = {
        title: 'ForsageResults',
        files: [dataURLtoFile(downloadUrl)],
      };

      try {
        navigator.share(shareData);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const renderAction = useMemo(() => {
    const isAllowDownload = isDesktop || isSafari || isChrome;
    const isAllowShare = (isMobile || isTablet) && navigator.share;

    if (!isAllowDownload && !isAllowShare) {
      return (
        <span className="text-white-500 w-full text-center mb-5">
          Your browser does not support sharing. <br /> Please, use another browser to share image.
        </span>
      );
    }

    if (isAllowDownload || isAllowShare) {
      return (
        <>
          {isAllowDownload && (
            <Button
              onClick={onClickButton}
              type={downloadUrl ? 'primary' : 'disabled'}
              className="w-full mt-4 rounded-mini"
            >
              <span>Download image</span>
            </Button>
          )}
          {isAllowShare && (
            <Button
              onClick={onClickShare}
              type={downloadUrl ? 'primary' : 'disabled'}
              className={`w-full mt-4 rounded-mini ${isAllowDownload ? 'ml-2.5' : ''}`}
            >
              <span>Share image</span>
            </Button>
          )}
        </>
      );
    }

    return null;
  }, [downloadUrl, isMobile, isDesktop, isTablet]);

  return (
    <>
      <div className="fixed translate-x-[150%]">
        <div
          ref={bannerRef}
          className="relative flex flex-col flex-shrink-0 w-[1728px] h-[1117px] bg-darkBlue rounded-[100px] px-20 pt-18 pb-16 overflow-hidden"
        >
          <div className="flex items-center z-10">
            <div className="flex-shrink-0 z-20 relative w-[280px] h-[280px] rounded-full cursor-pointer">
              <img className="max-w-full w-full h-full max-h-full" src={'/UnknownUser.png'} />
            </div>
            <div className="flex flex-col ml-[55px]">
              <div className="flex font-medium text-[106px] leading-[127px] w-[1000px] flex-nowrap">
                <span className="text-white-500 mr-5">ID</span> <span className="text-white">{`${authUser?.id}`}</span>
              </div>
              <span className="text-white-500 text-[56px] leading-[67px] mt-1 w-[1000px]">
                Joined: {authUser?.date ? format(parseISO(authUser?.date), 'dd.MM.yyyy') : ''}
              </span>
            </div>
          </div>
          <div className="relative h-[261px] my-[55px] px-15 w-full flex justify-end items-center bg-white-50 rounded-[50px] overflow-hidden z-10 shadow-2xl">
            <div className="flex text-[106px] leading-[127px] font-medium z-10">
              <span className="text-white">
                {splitNumber(authUser.profit_x3 + authUser.profit_x4 + authUser.profit_xgold + authUser.profit_xxx)}
              </span>
              &nbsp;
              <span className="text-yellow">BUSD</span>
            </div>
            <ChartImage className="h-full absolute right-0 top-1/2 -translate-y-1/2" />
          </div>
          <div className="flex justify-between items-end z-10">
            <div className="flex mb-5">
              <PumaIcon className="w-[225px] h-[152px]" />
            </div>
            <div className="flex flex-1 justify-end items-end">
              <div className="flex flex-col text-right mr-[50px] space-y-2.5">
                <div className="text-white text-[79px] leading-[94px] break-normal">Join my team:</div>
                <span className="text-white-500 text-[63px] leading-[76px]">{reflink}</span>
              </div>
              <QRCode fgColor="#fff" size={336} bgColor="transparent" value={`https://${reflink}`} />
            </div>
          </div>
          <img className="absolute bottom-0 right-0 w-full h-full" src="/blurs/shareCard/blue.png" />
        </div>
      </div>
      <div className="flex flex-col justify-start w-full min-h-[474px] sm:min-h-0 sm:flex-1">
        <div className="flex flex-col items-center justify-between mb-7.5">
          <span className="text-white text-3xl font-medium sm:text-2xl">Share image</span>
        </div>
        <div className="flex flex-1 ">
          <div className="relative flex justify-center items-center w-[432px] h-[270px] sm:h-[220px] rounded shadow-md bg-white-50">
            <img
              ref={imgRef}
              className={`${downloadUrl ? 'flex' : 'hidden'} max-w-full max-h-full h-full w-full object-fill`}
            />
            {!downloadUrl && (
              <PuffLoadingIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10" />
            )}
          </div>
        </div>
        <div className="flex mg-2.5">{renderAction}</div>
      </div>
    </>
  );
};
