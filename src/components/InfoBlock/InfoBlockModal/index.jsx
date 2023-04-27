import React, { useMemo } from 'react';
import { Modal } from 'components/Modal';
import { format, parseISO } from 'date-fns';
import QRCode from 'react-qr-code';
import { ReflinkTypes } from 'helpers/constants';
import BscIcon from 'assets/tokens/BUSD.svg';
import { useSelector } from 'react-redux';
import { getCurrentUserProfile } from 'store/userSlice/selectors';
import { getPreviewAccount } from 'store/userSlice/selectors';
import { useRouter } from 'next/router';

const bgUrls = {
  partners: '/statistic/partners.png',
  profits: '/statistic/profits.png',
  ratio: '/statistic/ratio.png',
  team: '/statistic/team.png',
};

const InfoBlockModal = ({ isOpened, handleCloseModal, openedModalType, total }) => {
  const currentUser = useSelector(getCurrentUserProfile);
  const previewAccount = useSelector(getPreviewAccount);
  const { query } = useRouter();
  const isPreviewMode = !!query.user;
  const { refkey, photo, date, id } = isPreviewMode ? previewAccount : currentUser;

  const stylesProps = photo ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover' } : {};
  const reflink = ReflinkTypes.base + refkey;
  const bgUrl = bgUrls[openedModalType.toLowerCase()];

  const totalValue = useMemo(() => {
    if (openedModalType.toLowerCase() === 'profits') {
      const value = total?.split(' BUSD')[0]?.replace(' ', '');
      return parseInt(value);
    }
    return total;
  }, [openedModalType, total]);

  return (
    <Modal isOpened={isOpened} onClose={handleCloseModal}>
      <div className="relative w-[450px] h-[600px] sm:h-full rounded-[30px] sm:rounded-none overflow-hidden flex flex-col items-center bg-darkBlue">
        <div
          className="z-40 mt-[40px] flex-shrink-0 relative w-[100px] h-[100px] rounded-full bg-white-200"
          style={stylesProps}
        >
          {!photo && <img alt="" className="max-w-full max-h-full" src={'/UnknownUser.png'} />}
        </div>
        <span className="z-40 mt-[10px] text-white font-semibold text-[36px]">ID {id}</span>
        <span className="z-40 mt-[6px] text-white font-normal text-[16px]">
          {' '}
          invited {date ? format(parseISO(date), 'dd.MM.yyyy') : ''}{' '}
        </span>
        <div className="min-w-[90%] z-40 mt-[30px] bg-white-200 rounded-[40px] px-[30px] py-2.5 flex items-center justify-between shadow-lg">
          <div className="flex items-center justify-start">
            <span className="text-white-700 font-medium text-2xl sm:text-xl">{openedModalType}</span>
          </div>
          <span className="flex items-center text-white text-[30px] font-medium">
            {totalValue}{' '}
            {openedModalType.toLowerCase() === 'profits' && <BscIcon className="ml-[10px] w-[24px] h-[24px]" />}
          </span>
        </div>
        <div className="flex flex-col w-full items-center my-[40px] sm:my-auto">
          <div className="z-40">
            <QRCode fgColor="#fff" size={125} bgColor="transparent" value={reflink} />
          </div>
          <span className="z-40 mt-[20px] font-semibold text-white text-xl">Join my team</span>
          <span className="z-40 notranslate mt-[5px] font-normal text-white opacity-20 text-lg">{reflink}</span>
        </div>
        <img className="absolute top-0 left-0 w-full" src={bgUrl} alt="" />
      </div>
    </Modal>
  );
};

export default InfoBlockModal;
