import React from 'react';
import NotFoundPageImage from 'public/svg/404.svg';
import { Helmet } from 'react-helmet';

const NotFoundPage = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center lg:p-5 ">
      <Helmet>
        <title>404 | Forsage</title>
      </Helmet>
      <div
        className={`fixed -right-1/2 -top-1/2 w-900px h-900px blur-800px bg-main-blue z-0 sm:h-510px sm:w-510px sm:blur-500px`}
      />
      <div className="w-full h-full flex flex-col items-center justify-center z-10">
        <NotFoundPageImage className="max-w-600px w-full mb-15 z-10 sm:mb-10" />
        <span className="text-white text-base z-10 sm:text-sm">Not found</span>
      </div>
    </div>
  );
};

export default NotFoundPage;
