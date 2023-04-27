import React, { useState, useRef } from 'react';
import { BreadCrumbs } from 'components';
import Carousel, { consts } from 'react-elastic-carousel';
import LeftArrow from 'assets/icons/arrow_left.svg';
import RightArrow from 'assets/icons/arrow_right.svg';
import TimerIcon from 'public/svg/instructions/timer.svg';
import UnlimCycleIcon from 'public/svg/instructions/unlim_cycle.svg';
import IncomeUsdIcon from 'public/svg/instructions/income_usd.svg';
import ReflinkIcon from 'public/svg/instructions/reflink.svg';
import AutoCycleIcon from 'public/svg/instructions/automatic_cycle.svg';
import BNBIcon from 'public/svg/instructions/bnb_cur.svg';
import BUSDIcon from 'public/svg/instructions/busd_cur.svg';
import ArrowUp from 'assets/icons/triangle_up.svg';
import ArrowDown from 'assets/icons/triangle_down.svg';
import MatrixX3Info from 'public/svg/instructions/matrix_x3_info.svg';
import MatrixX3Info1 from 'public/svg/instructions/matrix_x3_info_1.svg';
import MatrixX3Info2 from 'public/svg/instructions/matrix_x3_info_2.svg';
import MatrixX3Info3 from 'public/svg/instructions/matrix_x3_info_3.svg';
import MatrixX4Info from 'public/svg/instructions/matrix_x4_info.svg';
import MatrixX4Info1 from 'public/svg/instructions/matrix_x4_info_1.svg';
import MatrixX4Info2 from 'public/svg/instructions/matrix_x4_info_2.svg';
import MatrixX4Info3 from 'public/svg/instructions/matrix_x4_info_3.svg';
import MatrixXXXInfo from 'public/svg/instructions/matrix_xXx_info.svg';
import MatrixXXXInfo1 from 'public/svg/instructions/matrix_xXx_info_1.svg';
import MatrixXXXInfo2 from 'public/svg/instructions/matrix_xXx_info_2.svg';
import MatrixXXXInfo3 from 'public/svg/instructions/matrix_xXx_info_3.svg';
import MatrixXXXInfo4 from 'public/svg/instructions/matrix_xXx_info_4.svg';
import MatrixXgoldInfo from 'public/svg/instructions/matrix_xGold_info.svg';
import MatrixXgoldInfo1 from 'public/svg/instructions/matrix_xGold_info_1.svg';
import MatrixMarketingX3 from 'public/svg/instructions/marketing_card_x3.svg';
import MatrixMarketingX4 from 'public/svg/instructions/marketing_card_x4.svg';
import MatrixMarketingXXX from 'public/svg/instructions/marketing_card_xXx.svg';
import MatrixMarketingXgold from 'public/svg/instructions/marketing_card_xGold.svg';
import HowLvlWorks from 'public/svg/instructions/how_lvl_work.svg';
import HowCyclesWorks from 'public/svg/instructions/how_cycles_work.svg';
import UpgradeCards from 'public/svg/instructions/upgrade_cards.svg';
import FreezeCards from 'public/svg/instructions/freeze_cards.svg';
import WarningIcon from 'public/svg/instructions/warning_icon.svg';
import FreezeIcon from 'public/svg/instructions/freeze_icon.svg';
import GiftIcon from 'public/svg/instructions/gift_icon.svg';
import SpilloversCard from 'public/svg/instructions/spillovers_card.svg';
import Registration from 'public/svg/instructions/registration.svg';
import TableX3 from 'public/svg/instructions/x3_price_table.svg';
import TableX4 from 'public/svg/instructions/x4_price_table.svg';
import TableXXX from 'public/svg/instructions/xXx_price_table.svg';
import TableXgold from 'public/svg/instructions/xGold_price_table.svg';
import ActivateStart from 'public/svg/instructions/activateStart.svg';

import ExchangeIcon from 'assets/icons/exchange.svg';
import GiftTableIcon from 'assets/icons/gift.svg';
import PersonIcon from 'assets/icons/person.svg';
import ArrowUpFullIcon from 'assets/icons/arrow_up_fill.svg';
import OverflowUp from 'assets/icons/rocket_up.svg';
import OverflowDown from 'assets/icons/rocket_down.svg';
import UpgradeIcon from 'assets/icons/upgrade.svg';
import UpgradeMissedIcon from 'assets/icons/upgrade_missed.svg';

const Instruction = () => {
  const breadCrumbsProps = {
    title: 'Instruction',
  };

  const [openContents, setOpenContents] = useState(false);
  const [activeMenuBtn] = useState(0);

  const toggleOpenContents = () => {
    setOpenContents((prevActive) => !prevActive);
  };

  const scrollToRef = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });
  };

  const marketingRef = useRef(null);
  const programsRef = useRef(null);
  const levelsRef = useRef(null);
  const cyclesRef = useRef(null);
  const upgradeRef = useRef(null);
  const profitRef = useRef(null);
  const returnsRef = useRef(null);
  const regRef = useRef(null);
  const defRef = useRef(null);

  const executeScroll = (ref) => {
    setOpenContents(false);
    scrollToRef(ref);
  };

  const navigate = [
    {
      renderTitle: () => (
        <span>
          <span className="notranslate mr-1.5">Forsage</span> marketing
        </span>
      ),
      ref: marketingRef,
    },
    {
      renderTitle: () => (
        <span>
          <span className="notranslate mr-1.5">Forsage</span> programs
        </span>
      ),
      ref: programsRef,
    },
    {
      title: 'How levels work',
      ref: levelsRef,
    },
    {
      title: 'How the automatic cycles work',
      ref: cyclesRef,
    },
    {
      title: 'Upgrade',
      ref: upgradeRef,
    },
    {
      title: 'Lost profit and extra profit',
      ref: profitRef,
    },
    {
      title: 'Spillovers and returns',
      ref: returnsRef,
    },
    {
      title: 'Registration',
      ref: regRef,
    },
    {
      title: 'Definition',
      ref: defRef,
    },
  ];

  const myArrow = ({ type, onClick, isEdge }) => {
    const Pointer = type === consts.PREV ? LeftArrow : RightArrow;
    const currentClass = type === consts.PREV ? '-left-5' : '-right-5';
    return (
      <button
        onClick={onClick}
        disabled={isEdge}
        className={`flex justify-center items-center absolute w-10 h-10 top-1/2 transform -translate-y-1/2 ${currentClass}`}
      >
        <Pointer className="fill-current text-white-500 " />
      </button>
    );
  };

  const renderCustomPagination = ({ pages, activePage }) => {
    return (
      <div className="flex w-full justify-center items-center mt-5 px-2">
        <div className="flex space-x-2.5">
          {pages?.map((page) => (
            <div key={page} className={`w-2 h-2 rounded-full ${activePage === page ? 'bg-white' : 'bg-white-100'}`} />
          ))}
        </div>
      </div>
    );
  };

  const instructionsContent = [
    {
      title: 'Decentralization',
      render: () => (
        <div className="flex items-center sm:items-start flex-col" ref={regRef}>
          <img src="/instructions/decentralization.png" className="flex-shrink-0 max-h-350px mb-2.5" />
          <div className="flex-col space-y-2.5 sm:order-2">
            <div>
              What is <b className="inline text-white font-medium">decentralization?</b> What are its benefits and
              advantages? Decentralized marketing is created on an automated contract that guarantees you maximum
              security and stability.
            </div>
            <div>
              A <b className="inline text-white font-medium">smart contract</b> is an algorithm with automatic
              execution. It exists inside the Smart Chain blockchain*, which is one of the top cryptocurrencies. Smart
              contracts, like cryptocurrencies themselves, are decentralized. They work strictly according to a certain
              program, and once they are launched, it is impossible to change their mode of operation. The code that
              determines the logic of a smart contract is written in a blockchain, and all calculations are performed by
              millions of computers around the world. This ensures that a smart contract cannot be hacked or stopped.
            </div>
            <div className="bg-white-100 rounded-mini p-5">
              <b className="inline text-white font-medium">Blockchain</b> is an immutable register of transactions and
              information, protected from any further manipulation by cryptographic methods. It is simultaneously
              maintained by thousands of independent computers around the world.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'What is a BUSD token',
      render: () => (
        <div className="space-y-2.5" ref={marketingRef}>
          <div>
            <b className="inline text-white font-medium notranslate mr-1.5">BUSD</b> is a cryptocurrency with a fixed
            exchange rate that is equal to $1. It has a fully verified code and is approved by the New York State
            Department of Financial Services.
          </div>
          <div>
            5 benefits of <span className="notranslate mr-1.5">BUSD</span> for{' '}
            <span className="notranslate mx-1.5">Forsage</span>:
          </div>
          <ul className="space-y-2.5">
            <li className="flex">
              <span>
                <b className="inline text-white font-medium">1. Fixed Cost.</b> Your Forsage performance is no longer
                affected by rate fluctuations and market corrections.
              </span>
            </li>
            <li className="flex">
              <span>
                <b className="inline text-white font-medium">2. All the opportunities that cryptocurrency provides.</b>{' '}
                <span className="notranslate mx-1.5">BUSD</span> token can be exchanged for any cryptocurrency on DEX
                exchangers with negligible fees in a couple of clicks.
              </span>
            </li>
            <li className="flex">
              <span>
                <b className="inline text-white font-medium">3. Simple calculations.</b> Registration fees, upgrades,
                and cycles are now specified in US Dollar equivalents.
              </span>
            </li>
            <li className="flex">
              <span>
                <b className="inline text-white font-medium">4. Precise planning.</b> You can accurately track costs and
                estimate results without wasting time converting from one unit to another.
              </span>
            </li>
            <li className="flex">
              <span>
                <b className="inline text-white font-medium">5. Protection of participants' interests.</b>
                <span className="notranslate mx-1.5">BUSD</span> is fully backed by the US Dollar at a ratio of 1:1 and
                can always be exchanged for Dollars. It was created in a Paxos and Binance partnership.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      renderTitle: () => (
        <span>
          <span className="notranslate mr-1.5">Forsage</span> marketing
        </span>
      ),
      render: () => (
        <div className="flex items-center sm:items-start flex-col" ref={marketingRef}>
          <iframe
            className="bg-black w-full mb-7.5 h-300px  sm:h-180px"
            src="https://www.youtube.com/embed/YAYAKIp5JeE"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="space-y-2.5">
            <span>
              <b className="inline text-white font-medium">
                <span className="notranslate mr-1.5">Forsage</span> marketing{' '}
              </b>{' '}
              is implemented on the Smart Chain blockchain smart contract technology. The marketing employs the BUSD
              token in the BEP-20 format with a stable exchange rate of 1 USD. To send{' '}
              <span className="notranslate mx-1.5">BUSD</span> or any other token functioning in the Smart Chain
              blockchain, you will need a certain amount of <span className="notranslate mx-1.5">BNB</span> to pay the
              fee.
            </span>
            <ul className="space-y-2.5">
              <li className="flex">
                <BNBIcon className="w-5 h-5 flex-shrink-0 inline-block mr-2.5 " />
                <span>
                  <b className="inline text-white font-medium notranslate mr-1.5">BNB</b> - This is the internal BEP-20
                  format coin of the Smart Chain blockchain, which is required to pay the transaction fee.
                </span>
              </li>
              <li className="flex">
                <BUSDIcon className="w-5 h-5 flex-shrink-0 inline-block mr-2.5 " />
                <span>
                  <b className="inline text-white font-medium notranslate mr-1.5">BUSD</b> - This is the BEP-20 format
                  Smart Chain blockchain coin with a stable rate of 1 USD.
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      renderTitle: () => (
        <span>
          <span className="notranslate mr-1.5">Forsage</span> marketing
        </span>
      ),
      render: () => (
        <div className="space-y-2.5">
          <span className="mb-2.5">
            <b className="inline text-white font-medium">
              <span className="notranslate mr-1.5">Forsage</span> marketing{' '}
            </b>{' '}
            is a matrix system based on decentralized smart contract technology. Profits come from inviting new partners
            to your team, who once registered stay with you forever since it is recorded in blockchain. The income is
            distributed automatically and instantly to the personal wallets of the participants.
          </span>
          <span>
            Participants have access to <b className="inline text-white font-medium">4 marketing programs,</b> different
            in terms of profitability and conditions of interaction between partners. The most efficient method is to
            use all of these programs in parallel.
          </span>
          <ul className="space-y-2.5">
            <li className="inline-block">
              <TimerIcon className="float-left w-5 h-5 flex-shrink-0 inline-block mr-2.5 mt-1.5" />
              <span>
                <b className="inline text-white font-medium"> The validity of the levels is not limited.</b> By
                activating any level of the program once, it is assigned to you forever and does not require any
                additional rewards.
              </span>
            </li>
            <li className="inline-block">
              <IncomeUsdIcon className="float-left w-5 h-5 flex-shrink-0 inline-block mr-2.5 mt-1.5" />
              <span>
                <b className="inline text-white font-medium"> Higher levels = more income.</b> Marketing income is
                generated from the value of the level in which your partner took a spot. Therefore, working at higher
                levels increases your results. Marketing is built in such a way that income from one cycle is enough to
                activate the next level.{' '}
              </span>
            </li>
            <li className="inline-block">
              <AutoCycleIcon className="float-left w-5 h-5 flex-shrink-0 inline-block mr-2.5 mt-1.5" />
              <span>
                <b className="inline text-white font-medium"> Automatic cycles at all levels.</b> The levels of each
                program contain a fixed number of spots. As soon as all the spots in the level are filled, a new cycle
                automatically begins.
              </span>
            </li>
            <li className="inline-block">
              <UnlimCycleIcon className="float-left w-5 h-5 flex-shrink-0 inline-block mr-2.5 mt-1.5" />
              <span>
                {' '}
                <b className="inline text-white font-medium"> The number of cycles is not limited.</b> A level activated
                once allows you to invite an unlimited number of new partners.{' '}
              </span>
            </li>
            <li className="inline-block">
              <ReflinkIcon className="float-left w-5 h-5 flex-shrink-0 inline-block mr-2.5 mt-1.5" />
              <span>
                <b className="inline text-white font-medium"> Referral link.</b> All personal partners whom you invite
                are assigned to you forever, and this cannot be changed, since it is recorded in a smart contract.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      renderTitle: () => (
        <span>
          <span className="notranslate mr-1.5">Forsage</span> programs
        </span>
      ),
      render: () => (
        <div className="relative w-full" ref={programsRef}>
          <Carousel isRTL={false} itemPadding={[0, 20]} renderArrow={myArrow} renderPagination={renderCustomPagination}>
            <div className="max-h-350px w-full h-full">
              <MatrixMarketingX3 className="w-full h-full" />
            </div>
            <div className="max-h-350px w-full h-full">
              <MatrixMarketingX4 className="w-full h-full" />
            </div>
            <div className="max-h-350px w-full h-full">
              <MatrixMarketingXXX className="w-full h-full" />
            </div>
            <div className="max-h-350px w-full h-full">
              <MatrixMarketingXgold className="w-full h-full" />
            </div>
          </Carousel>
        </div>
      ),
    },
    {
      title: 'Registration',
      render: () => (
        <div className="flex items-center sm:items-start flex-col" ref={regRef}>
          <img src="/instructions/registrationPrev.png" className="flex-shrink-0 max-h-350px mb-2.5" />
          <div className="flex-col space-y-2.5 sm:order-2">
            <div>
              <b className="inline text-white font-medium">Smart Contract.</b>{' '}
              <span className="notranslate mr-1.5">Forsage</span> platform is based on smart contract technology.
              Forsage smart contracts are programmed in such a way, that they never store participants' funds, their
              balance is always zero. The purpose of the smart contract is to automatically redirect funds from incoming
              transactions to the wallets of other participants, according to marketing program rules.
            </div>
            <div>
              <b className="inline text-white font-medium">Referral linking.</b> Also, your referral linkage remains
              unchanged, you can't change your upline partner, as well as your downline partners are assigned to you in
              your structure forever.
            </div>
            <div>
              <b className="inline text-white font-medium">Personal Wallet. </b> To become a member, you need to create
              your personal wallet.
            </div>
            <div>
              Only you have access to the funds. All rewards according to marketing are instantly credited to your
              personal wallet. All transactions are stored in the public domain in a blockchain. You can easily check
              each transaction and see where the funds have been transferred.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Registration',
      render: () => (
        <div className="flex items-center sm:items-start flex-col">
          <Registration className="flex-shrink-0 max-h-350px mb-2.5" />
          <div className="flex-col sm:order-2 space-y-2.5">
            <div>
              <b className="inline text-white font-medium">
                Registration in <span className="notranslate ml-1.5">Forsage BUSD</span>{' '}
              </b>{' '}
              is the activation of first levels in <span className="notranslate mx-1.5">Forsage x3</span> and{' '}
              <span className="notranslate mx-1.5">x4</span> programs, which cost 5{' '}
              <span className="notranslate mx-1.5">BUSD</span> each. In total, registration costs 10{' '}
              <span className="notranslate mx-1.5">BUSD</span>. The first levels in x3 and x4 programs are always
              activated together and cannot be accessed separately. All the following levels can be purchased one by
              one, in ascending order.
            </div>
            <div>
              Registration transaction is credited to the smart contract. The smart contract records your wallet number
              into the structure and redirects the funds to the personal wallet of the person that invited you (your
              upline partner). You occupy a free spot in their first level of x3 program and the first level of x4
              program. Level 1 of x3 and Level 1 of x4 are respectively opened for you, and now you can invite partners
              through your personal referral link.
            </div>
            <div>
              After activation of the first levels of x3 and x4 programs, the xXx and xGold program activation becomes
              available. After you activate it, the activation of xGold program becomes available.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'How Forsage x3 works',
      render: () => (
        <div className="space-y-2.5">
          <div className="flex justify-evenly items-center space-x-5 mb-5 sm:space-y-2.5 sm:space-x-0 sm:flex-col">
            <MatrixX3Info className="max-h-350px" />
          </div>
          <div className="">
            <div className="mb-2.5">
              All partners in your <b className="inline text-white font-medium notranslate mx-1.5">Forsage X3</b>{' '}
              program levels are the people whom you’ve personally invited. When partners register in the program using
              your referral link, they take spots below you.
            </div>
            <div>Distribution of rewards when filling each spot in a level of the program is as follows:</div>
          </div>
          <ul className="space-y-2.5">
            <li className="flex sm:flex-col">
              <MatrixX3Info1 className="w-15 h-15 flex-shrink-0 inline-block mr-2.5 mt-1.5 sm:w-full sm:mb-2.5 sm:mr-0" />
              <span>
                The first partner you invite is placed on the first spot below you. Reward of 100% goes to your personal
                wallet.
              </span>
            </li>
            <li className="flex sm:flex-col">
              <MatrixX3Info2 className="w-15 h-15 flex-shrink-0 inline-block mr-2.5 mt-1.5 sm:w-full sm:mb-2.5 sm:mr-0" />
              <span>
                The second partner is placed on the second spot below you. You also get 100% reward to your personal
                wallet.
              </span>
            </li>
            <li className="flex sm:flex-col">
              <MatrixX3Info3 className="w-15 h-15 flex-shrink-0 inline-block mr-2.5 mt-1.5 sm:w-full sm:mb-2.5 sm:mr-0" />
              <span>
                The third partner is placed on the third spot below you and completes the cycle. 100% of the income goes
                to your upline 100% partner's wallet, and a new cycle immediately begins for you, and you can fill up
                the spots again by inviting new partners.
              </span>
            </li>
          </ul>
          <div className="bg-white-100 rounded-mini p-5">
            <b className="inline text-white font-medium">Likewise with your partners.</b> Each time your partner
            completes the cycle of his level, you receive a payment to the wallet in 100% of the level cost, and the
            partner opens the new cycle again. At the same time, this partner takes a new place under you. Thus, the
            same partner can occupy several places in a row in your levels.
          </div>
        </div>
      ),
    },

    {
      title: 'How Forsage x4 works',
      render: () => (
        <div className="space-y-2.5">
          <div className="flex justify-evenly items-center space-x-5 mb-5 sm:space-y-2.5 sm:space-x-0 sm:flex-col">
            <MatrixX4Info className="max-h-350px" />
          </div>
          <div className="">
            In <b className="inline text-white font-medium notranslate mx-1.5">Forsage x4</b> program you can invite
            personal partners, as well as receive spillovers from above and below.
          </div>
          <ul className="space-y-2.5">
            <li className="flex sm:flex-col">
              <MatrixX4Info1 className="w-20 h-15 flex-shrink-0 inline-block mr-2.5 mt-1.5 sm:w-full sm:mb-2.5 sm:mr-0" />
              <span>
                The partners who occupy two spots below you in the first line are also in the second line of your
                upline's level. Reward of 100% goes to upline's wallet. By the same principle, you receive income 100%
                not from the first, but from the second line.
              </span>
            </li>
            <li className="flex sm:flex-col">
              <MatrixX4Info2 className="w-20 h-15 flex-shrink-0 inline-block mr-2.5 mt-1.5 sm:w-full sm:mb-2.5 sm:mr-0" />
              <span>
                Rewards from partners who occupy these spots instantly go to your wallet in the amount of 100%.
              </span>
            </li>
            <li className="flex sm:flex-col">
              <MatrixX4Info3 className="w-20 h-15 flex-shrink-0 inline-block mr-2.5 mt-1.5 sm:w-full sm:mb-2.5 sm:mr-0" />
              <span>
                The partner completes the cycle of the level, the reward of 100% 100% goes to your upline, and the new
                cycle begins for you.
              </span>
            </li>
          </ul>
          <div className="bg-white-100 rounded-mini p-5">
            When a partner on the 2nd line joins your upline, they take a place in your 1st line — that is, you receive
            a <b className="inline text-white font-medium">spillover from above</b>. Similarly,{' '}
            <b className="inline text-white font-medium">a spillover can come from below</b>. When a partner comes to
            your downline on the 1st line, then they will take a place on your 2nd line. Thus, places in the x4 levels
            can be occupied by people invited only by you, or there can be none invited by you, or mixed.
          </div>
          <div>
            <ul>
              <li className="flex items-center sm:items-start">
                <WarningIcon className="w-7.5 h-7.5 flex-shrink-0 inline-block mr-2.5 mt-1.5" />
                <span>
                  Do not forget to activate the next level after the 1st cycle so as not to miss payments on the
                  previous level.
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'How Forsage xXx works',
      render: () => (
        <div className="space-y-2.5">
          <div className="flex justify-evenly items-center space-x-5 mb-5 sm:space-y-2.5 sm:space-x-0 sm:flex-col">
            <MatrixXXXInfo className="max-h-350px" />
          </div>
          <ul className="space-y-2.5">
            <li>
              <MatrixXXXInfo1 className="mb-2.5" />
              <b className="inline text-white font-medium">First line (2 places):</b> rewards go to your upline
              partners.
            </li>
            <li>
              <MatrixXXXInfo2 className="mb-2.5" />
              <b className="inline text-white font-medium">Second line (4 places):</b> you get{' '}
              <b className="inline text-white font-medium">30%</b> of the level cost from each of the four partners, and
              70% goes to the upline, since for him they are partners of the 4th line.
            </li>
            <li>
              <MatrixXXXInfo3 className="mb-2.5" />
              <b className="inline text-white font-medium">Third line (8 places):</b> you get{' '}
              <b className="inline text-white font-medium">70%</b> from each, 30% goes to the upline.
            </li>
          </ul>
          <div>
            <ul>
              <li className="flex sm:flex-col">
                <MatrixXXXInfo4 className="w-24 h-20 mr-2.5 flex-shrink-0 inline-block sm:w-full sm:h-24 sm:mb-2.5 sm:mr-0" />
                <span>
                  <b className="inline text-white font-medium">
                    <span className="notranslate mr-1.5">xXx</span> cycle:
                  </b>{' '}
                  The final reward from the 2nd line (30%) and the final reward from the 3rd line (70%) are summed up
                  and distributed to the upline partners, and a new cycle opens for you.{' '}
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'How Forsage xGold works',
      render: () => (
        <div className="space-y-2.5">
          <div className="flex justify-evenly items-center space-x-5 mb-5 sm:space-y-2.5 sm:space-x-0 sm:flex-col">
            <MatrixXgoldInfo className="max-h-350px" />
          </div>
          <div>
            The advantage of{' '}
            <b className="inline text-white font-medium">
              <span className="notranslate mr-1.5">xGold</span> program
            </b>{' '}
            is a larger number of partners and spillover opportunities, which generates an income of 1020% from one
            cycle of the level.
          </div>
          <ul className="space-y-2.5">
            <li>
              <b className="inline text-white font-medium">First line (2 places):</b> rewards go to your{' '}
              <b className="inline text-white font-medium">upline</b> partner.
            </li>
            <li>
              <b className="inline text-white font-medium">Second line (4 places):</b> you get{' '}
              <b className="inline text-white font-medium">20%.</b> from each spot
            </li>
            <li>
              <b className="inline text-white font-medium">Third line (8 places):</b> you get{' '}
              <b className="inline text-white font-medium">30%</b> from each spot
            </li>
            <li>
              <b className="inline text-white font-medium">Fourth line (16 places):</b> you get{' '}
              <b className="inline text-white font-medium">50%</b> from each participant (30% and 20% are distributed to
              upline partners).
            </li>
          </ul>
          <div>
            <ul>
              <li className="flex sm:flex-col">
                <MatrixXgoldInfo1 className="w-24 h-20 mr-2.5 flex-shrink-0 inline-block sm:w-full sm:h-15 sm:mb-2.5 sm:mr-0" />
                <span>
                  <b className="inline text-white font-medium">
                    <span className="notranslate mr-1.5">xGold</span> cycle:
                  </b>{' '}
                  The last 2 spots from the 4th line (50% + 50%) are summed up and 100% is distributed to upline
                  partners, and a new cycle of the level begins automatically.
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'How levels work',
      render: () => (
        <div className="space-y-2.5" ref={levelsRef}>
          <div className="flex space-x-5 sm:flex-col sm:space-x-0">
            <div className="sm:order-2">
              All programs have levels that work on the same principle but differ in the cost of activation. Completing
              a full cycle of the level brings enough profit to activate the next level, and gives you the opportunity
              to earn 2 times more.
            </div>
            <div className="flex justify-center items-center flex-shrink-0 w-1/2 sm:w-full sm:mb-2.5">
              <HowLvlWorks className="max-h-350px ml-2.5 mb-2.5" />
            </div>
          </div>
          <div>
            Activating several levels and inviting partners to those levels at once speeds up your profit many times.
            The levels do not have a validity period, so you should not be afraid that they will expire. Each active
            level constantly brings you income. How many levels can be activated at once? As many as you want, even all
            at once.
          </div>
          <div>
            One should bear in mind that you can open levels only in sequential order — for example, you can’t go to the
            fourth level without opening the third one.
          </div>
          <div className="bg-white-100 rounded-mini p-5">
            <b className="inline text-white font-medium">Be careful,</b> if you have not yet activated a certain level,
            and your partner activates it earlier, then overtaking will occur, and you will miss the reward.
          </div>
        </div>
      ),
    },
    {
      title: 'How to automatic cycles work',
      render: () => (
        <div className="space-y-2.5" ref={cyclesRef}>
          <div className="flex items-center space-x-5 sm:flex-col sm:space-x-0">
            <div className="sm:order-2">
              Automatic cycles open the same level for you, and you continue to receive income from it. This happens
              automatically as soon as the last free spot under you is taken by a partner. The current level completes
              its cycle, and the next cycle begins.
            </div>
            <div className="flex justify-center items-center flex-shrink-0 w-1/2 sm:w-full sm:mb-2.5">
              <HowCyclesWorks className="max-h-350px w-full h-full ml-2.5 mb-2.5" />
            </div>
          </div>
          <div></div>
          <div>
            When a cycle is completed, you occupy a free spot in the level of your upline partner. And you have your
            level reopened with free spots for new partners. For each cycle, a reward of 100% goes to your upline
            partner's wallet. Cycles work in the same way for your invited partners, and each time their level completes
            a cycle, you receive a reward for it.
          </div>
          <div className="bg-white-100 rounded-mini p-5 !mb-5">
            After the first cycle of a level, you will receive rewards for the new partners at the same level only if
            the next level is activated in the program. Therefore, it is important to make upgrades in advance so as not
            to miss out on rewards.
          </div>
          <div className="mb-5">
            <ul>
              <li>
                <div className="flex sm:flex-col ">
                  <div className="order-2 sm:order-1">
                    <div className="inline text-white text-xl font-medium">How cycles in xXx work.</div>
                    <div className="inline">
                      For automatic activation of the level after a cycle in xXx program, you need 100% value of the
                      level. The first amount of 30% from last partner on the 2nd line is temporarily blocked on a smart
                      contract, and as soon as the second amount of 70% from last partner on the 3rd line arrives, the
                      cycle is automatically closed, and 100% for it instantly goes higher in the structure.
                    </div>
                  </div>
                  <MatrixXXXInfo4 className="w-30 h-20 mr-2.5 flex-shrink-0 inline-block sm:w-full sm:h-24 sm:mb-2.5 sm:mr-0 order-1 sm:order-2" />
                </div>
              </li>
            </ul>
          </div>
          <div className="">
            <ul>
              <li>
                <div className="flex sm:flex-col ">
                  <div className="order-2 sm:order-1">
                    <div className="inline text-white text-xl font-medium">
                      How cycles in <span className="notranslate mx-1.5">xGold</span> work.
                    </div>
                    <div className="inline">
                      For automatic activation of the level after a cycle in xGold program, you need 100% cost of its
                      activation. Rewards from the last two partners on the 4th line are summed up (50% + 50%) for this
                      activation.
                    </div>
                  </div>
                  <MatrixXgoldInfo1 className="w-30 h-20 mr-2.5 flex-shrink-0 inline-block sm:w-full sm:h-24 sm:mb-2.5 sm:mr-0 order-1 sm:order-2" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'Upgrade',
      render: () => (
        <div className="space-y-2.5" ref={upgradeRef}>
          <div>
            UPGRADE is the activation of the next more expensive level. Income from 1 cycle of each level is enough to
            upgrade to the next level. The reward for the upgrade goes to your upline partner, provided that they
            already have this level activated. You get to decide whether to activate the next level or not. But if you
            do not have the next level open, then the rewards from second cycle of this level will be redirected to the
            upline partners.
          </div>
          <UpgradeCards className="!my-5" />
          <div>
            If you miss a reward from new partners due to lack of upgrade, then referral linking allows you to get your
            partners back. When you upgrade to the next level, your referral partner will take a place below you in
            their next cycle, and will follow you with each next cycle.
          </div>
          <div className="bg-white-100 rounded-mini p-5">
            You can overtake your upline partner by activating levels they have not yet activated. In such a case, you
            will occupy a spot in their closest upline partner’s level, provided that this partner has such a level
            activated. The reward goes to him instead of your direct upline.
          </div>
        </div>
      ),
    },
    {
      title: 'Level freeze',
      render: () => (
        <div className="space-y-2.5" ref={profitRef}>
          <div className="flex justify-center items-center">
            <FreezeCards className="max-h-350px" />
          </div>
          <div>
            Level freeze occurs if the partners have taken all the spots in the level completing the first cycle, but
            the next level is not activated (lack of upgrade).
          </div>
          <div>
            When “frozen”, the level remains inactive. Partners continue to occupy spots in your level but you miss out
            on profits from this level until the next level is activated.
          </div>
          <div>
            Exceptions include the last levels in <span className="notranslate mx-1.5">Forsage</span> programs (12th or
            15th in <span className="notranslate ml-1.5">xGold</span> ).
          </div>
        </div>
      ),
    },
    {
      title: ' Lost profit and extra profit',
      render: () => (
        <div className="space-y-2.5" ref={profitRef}>
          <div>
            Lost profits are cases when you miss rewards for partners, and they are redirected to an upline partner.
            <br />
            Lost profits can occur for two reasons:
          </div>
          <ul className="space-y-1.5">
            <li>
              <div className="inline">
                <WarningIcon className="float-left w-7.5 h-7.5 mt-1.5 mr-2.5 flex-shrink-0" />
                <span className="inline">
                  <b className="inline text-white font-medium">Overtaking:</b> You have not activated the level that
                  your downline partner has activated. This reward goes to the closest upline partner who activated this
                  level.
                </span>
              </div>
            </li>
            <li>
              <div className="inline">
                <FreezeIcon className="float-left w-7.5 h-7.5 mt-1.5 mr-2.5 flex-shrink-0" />
                <span className="inline">
                  <b className="inline text-white font-medium">Freezing:</b> Your level is completely filled, and the
                  1st cycle has been completed, but the next, more expensive level is still not activated.
                </span>
              </div>
            </li>
          </ul>
          <div>After you activate the level, your partner will come back to you again in his next cycle.</div>
          <div>
            <ul>
              <li>
                <div className="inline">
                  <GiftIcon className="float-left w-7.5 h-7.5 mt-1.5 mr-2.5 flex-shrink-0" />
                  <span className="inline">
                    <b className="inline text-white font-medium">Extra profit</b> is a reward that comes to you from
                    below, because one or more of the downline partners have lost their profits. Thus, you can gain
                    extra profits from the depth of your structure when your downline is overtaken, and you are the
                    first in your structure who has this level activated. Therefore, activation of higher levels allows
                    you to receive such rewards for overtaking from downline partners.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'Spillovers',
      render: () => (
        <div className="space-y-2.5" ref={returnsRef}>
          <div className="flex items-center sm:flex-col sm:items-start sm:space-y-2.5 space-x-2.5 sm:space-x-0">
            <div className="">
              Spillovers is a process when spots in your levels are occupied not only by your personally invited
              partners, but also by partners invited by the other members of your team. Forsage marketing programs allow
              you to receive spillovers from both your upline and downline partners in x4,{' '}
              <span className="notranslate mx-1.5">xXx</span> and <span className="notranslate mx-1.5">xGold</span>.
            </div>
            <div className="sm:w-full sm:flex sm:items-center">
              <SpilloversCard className="w-180px h-48 flex-shrink-0 sm:mx-auto" />
            </div>
          </div>
          <div className="">
            <ul className="space-y-2.5">
              <li>
                <div className="inline">
                  <div className="float-left w-5 h-5 flex-shrink-0 mr-2.5 mt-1.5 rounded-full bg-white" />
                  <span className="inline text-white font-medium">Personal partner</span> is a person who registered
                  with your personal affiliate link. They take the closest free spot in the level immediately after your
                  position.
                </div>
              </li>
              <li>
                <div className="inline">
                  <div className="float-left w-5 h-5 flex-shrink-0 mr-2.5 mt-1.5 rounded-full bg-yellow" />
                  <span className="inline text-white font-medium">Spillover from above</span> is a personally invited
                  partner of your upline partner. They take the next free spot in the level of your partner, and
                  accordingly get in your level, too, but on the higher line.
                </div>
              </li>
              <li>
                <div className="inline">
                  <div className="float-left w-5 h-5 flex-shrink-0 mr-2.5 mt-1.5 rounded-full bg-orange" />
                  <span className="inline text-white font-medium">Spillover from below</span> is a personally invited
                  partner of your downline.
                </div>
              </li>
              <li>
                <div className="inline">
                  <div className="float-left w-5 h-5 mr-2.5 mt-1.5 rounded-full bg-light-blue" />
                  <span className="inline text-white font-medium">Overtake</span> is a situation when a partner
                  overtakes their upline, and temporarily takes a spot directly below you. If your downline partner has
                  this level activated, in the next cycle this partner will take a place under their direct upline
                  partner.
                </div>
              </li>
            </ul>
          </div>
          <div>
            You can overtake your upline partner, acquiring levels which they have not yet activated. In this case, your
            reward goes to their closest upline partner, who has such a level activated, and the income goes to them.
            Referral linking allows you to return everyone to their places. This means that when your upline activates
            the required level, in the next cycle you will take the spot under them again. Thus, the consolidation of
            personally invited partners is preserved forever.
          </div>
        </div>
      ),
    },

    {
      title: 'Profit',
      render: () => (
        <div className="relative w-full">
          <Carousel isRTL={false} itemPadding={[0, 20]} renderArrow={myArrow} renderPagination={renderCustomPagination}>
            <div className="">
              <TableX3 className="w-full h-full max-h-350px" />
            </div>
            <div className="">
              <TableX4 className="w-full h-full max-h-350px" />
            </div>
            <div className="">
              <TableXXX className="w-full h-full max-h-350px" />
            </div>
            <div className="">
              <TableXgold className="w-full h-full max-h-350px" />
            </div>
          </Carousel>
        </div>
      ),
    },
    {
      title: 'How many levels should be activated at the start',
      render: () => (
        <div className="flex items-center sm:items-start flex-col" ref={returnsRef}>
          <ActivateStart className="flex-shrink-0 max-h-350px mb-2.5" />
          <div className="flex-col space-y-2.5 sm:order-2">
            <div className="">
              Of course, you can start with 1 level. But it is recommended to activate at least the first 3 levels right
              at the start. This will allow you to get good results from the very beginning. Such strategy can maximize
              your results.
            </div>
            <div className="">
              Many successful participants use this strategy of activating several levels from the beginning. They set
              an example for those below them, and so do they follow. As a result, profits of the whole structure grow
              faster. Many start with 5 levels at once, while some start with 7 or even more levels.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Definitions',
      render: () => (
        <ul className="space-y-1.5" ref={defRef}>
          <li>
            <div className="inlin-block">
              <ArrowUpFullIcon className="float-left w-5 h-5 mr-2.5" />
              <span className="text-white font-medium">UPLINE PARTNER</span> - a partner under whose referral link you
              registered.
            </div>
          </li>
          <li>
            <div className="inline-block">
              <PersonIcon className="float-left w-5 h-5 mr-2.5" />
              <span className="text-white font-medium">DOWNLINE PARTNER</span> - a partner who registered using your
              referral link.
            </div>
          </li>
          <li>
            <div className="inline-block">
              <UpgradeIcon className="float-left w-5 h-5 mr-2.5" />
              <span className="text-white font-medium">UPGRADE</span> - activation of the next more expensive level.
            </div>
          </li>
          <li>
            <div className="inline-block">
              <ExchangeIcon className="float-left w-5 h-5 mr-2.5" />
              <span className="text-white font-medium"> CYCLE</span> - filling all places at the level and automatic
              reopening of the current level.
            </div>
          </li>
          <li>
            <div className="inline-block">
              <UpgradeMissedIcon className="float-left w-5 h-5 mr-2.5" />
              <span className="text-white font-medium">LOST PROFITS</span> - a payment that was redirected to an upline
              partner due to overtake or lack of upgrade.
            </div>
          </li>
          <li>
            <div className="inline-block">
              <GiftTableIcon className="float-left w-5 h-5 fill-current text-light-blue mr-2.5" />
              <span className="inline text-white font-medium">EXTRA PROFITS</span> - the payment that comes to you due
              to the lost profit of the downline partner.
            </div>
          </li>
          <li>
            <div className="inline-block">
              <OverflowDown className="float-left fill-current text-yellow w-5 h-5 mr-2.5" />
              <span className="text-white font-medium">SPILLOVER FROM ABOVE</span> - the partner of your upline partner
              who took a place in your level.
            </div>
          </li>
          <li>
            <div className="inline-block">
              <OverflowUp className="float-left fill-current text-orange w-5 h-5 mr-2.5" />
              <span className="text-white font-medium">SPILLOVER FROM BELOW</span> - the partner of your downline
              partner who took a place in your level.
            </div>
          </li>
          <li>
            <div className="inline-block">
              <ArrowUpFullIcon className="float-left w-5 h-5 mr-2.5 fill-current text-red" />
              <span className="text-white font-medium">OVERTAKE</span> - activation by the downline partner of the more
              expensive level you don't have yet.
            </div>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <main className="flex flex-1 flex-col w-full">
      <div className="mb-10 sm:mb-7.5">
        <BreadCrumbs {...breadCrumbsProps} />
      </div>
      <div className="relative flex flex-1 w-full space-x-10 sm:flex-col sm:px-5 sm:space-x-0">
        <div className="flex flex-col w-2/3 text-white-500 font-normal space-y-10 sm:space-y-5 sm:w-full sm:order-2">
          {instructionsContent?.map((item, index) => (
            <div className="flex flex-col rounded bg-black-light text-base w-full p-7.5 sm:text-sm sm:p-5" key={index}>
              <span className="text-2xl text-white font-medium mb-5 sm:text-xl">
                {!!item?.title ? item?.title : item?.renderTitle()}
              </span>
              <div className="flex ">{item.render()}</div>
            </div>
          ))}
        </div>
        <div className="relative w-1/3 flex flex-col h-full sm:w-full sm:bg-black-light sm:p-5 sm:mb-5 sm:rounded">
          <div className="justify-between items-center w-full hidden sm:flex">
            <div className="text-white">Content</div>
            <button
              className={`rounded-full h-5 w-5 justify-center items-center ${
                openContents ? 'bg-white' : 'bg-main-blue'
              } hidden lg:flex`}
              onClick={() => {
                toggleOpenContents();
              }}
            >
              {openContents ? (
                <ArrowUp className="stroke-current text-main-bg mb-0.5" />
              ) : (
                <ArrowDown className="stroke-current text-white" />
              )}
            </button>
          </div>
          <div className={`${openContents ? 'flex' : 'sm:hidden'} flex-col space-y-2.5 sm:space-y-0 sticky top-20`}>
            {navigate?.map((item, index) => {
              return (
                <button
                  onClick={() => {
                    executeScroll(item?.ref);
                  }}
                  className={`${
                    activeMenuBtn && 'text-white font-medium'
                  } w-full text-left text-white-500 hover:text-white-900 text-base sm:text-sm sm:border-b sm:last:border-b-0 sm:border-text-white-100 sm:py-2.5 sm:last:pb-0`}
                  key={index}
                >
                  {!!item?.title ? item?.title : item?.renderTitle()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Instruction;
