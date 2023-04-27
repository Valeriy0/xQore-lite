import React, { useMemo } from 'react';
import { Modal, Button } from 'components';
import Lottie from 'react-lottie';
import { PROGRAM_NAMES } from 'helpers/constants';
import {
  LottieX3MarketingLegend,
  LottieX4MarketingLegend,
  LottieXGOLDMarketingLegend,
  LottieXXXMarketingLegend,
} from 'helpers/lottie';
import { LottieXQoreMarketingLegend } from 'helpers/animation/xQore';

export const PartnersHistoryModal = ({ openedModal, onClose, data, program }) => {
  const lottieJsonData = useMemo(() => {
    switch (program) {
      case PROGRAM_NAMES.X3:
        return LottieX3MarketingLegend;
      case PROGRAM_NAMES.X4:
        return LottieX4MarketingLegend;
      case PROGRAM_NAMES.XXX:
        return LottieXXXMarketingLegend;
      case PROGRAM_NAMES.XGOLD:
        return LottieXGOLDMarketingLegend;
      case PROGRAM_NAMES.XQORE:
        return LottieXQoreMarketingLegend;
      default:
        return null;
    }
  }, [program]);

  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-start w-full rounded-2xl bg-black-light p-10 overflow-hidden max-h-[90vh] h-full sm:max-h-full sm:rounded-none sm:p-5 overflow-auto sm:!pt-20">
        <div className="flex items-center justify-between mb-5">
          <span className="text-white text-3xl font-medium sm:text-2xl">Marketing legend</span>
        </div>
        <div className="flex w-full h-[200px] mb-5 rounded-mini bg-white-100 p-2.5 pointer-events-none">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: lottieJsonData,
              rendererSettings: {
                progressiveLoad: true,
              },
            }}
          />
        </div>
        <div className="flex flex-col flex-1 overflow-auto space-y-2.5">
          {data?.map((item, index) => {
            const Icon = item?.icon;

            if (item?.limitation === program || (item?.title === 'Send to upline' && program === 'xQore')) return null;
            return (
              <div className="flex" key={index}>
                {Icon ? (
                  <Icon className={`w-5 h-5 mr-2.5 mt-1 flex-shrink-0 ${item?.iconColor}`} />
                ) : (
                  <div className={`w-5 h-5 flex-shrink-0 mr-2.5 mt-1 rounded-full ${item?.iconColor}`} />
                )}
                <div className="text-white text-base sm:text-sm">
                  <span className="font-medium"> {item?.title} </span> - <span> {item?.text} </span>
                </div>
              </div>
            );
          })}
        </div>
        <Button type="light-white" className="!mt-5" onClick={onClose}>
          Close tip
        </Button>
      </div>
    </Modal>
  );
};
