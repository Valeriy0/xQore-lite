import React, { useRef } from 'react';
import { callNotification } from 'helpers/notification';

export const ImageUploader = ({ onChange, value, className, children, maxFileSize = null }) => {
  const inputRef = useRef(null);
  const stylesProps = value
    ? {
        backgroundImage: `url(${typeof value === 'string' ? value : URL.createObjectURL(value)})`,
        backgroundSize: 'cover',
      }
    : {};

  const onFileChange = (e) => {
    e.preventDefault();
    if (onChange && e.target.files[0]) {
      const [file] = e.target.files;
      const reg = /(.*?)\.(jpg|jpeg|png)$/;

      if (!file?.name?.match(reg)) {
        return callNotification({ type: 'error', message: 'Error: unsupported file format' });
      }

      if (maxFileSize && file.size && file.size > maxFileSize) {
        return callNotification({ type: 'error', message: 'Error: file size exceeds limit' });
      }

      return onChange(file);
    }
  };

  return (
    <div className={className} style={stylesProps} onClick={() => inputRef.current.click()}>
      {!value && children}
      <input ref={inputRef} onChange={onFileChange} type="file" className="hidden" />
    </div>
  );
};
