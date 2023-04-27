import React, { useRef } from 'react';
import { Button } from 'components';
import { callNotification } from 'helpers/notification';
import DeleteIcon from 'assets/icons/delete.svg';

export const UploadImageOfflineEvent = ({ onChange, value, maxFileSize = 3000000 }) => {
  const inputRef = useRef(null);

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

  const onDeleteFile = (e) => {
    e.stopPropagation();
    inputRef.current.value = '';
    onChange('');
  };

  return (
    <div className="flex w-full" onClick={() => !value && inputRef.current.click()}>
      <div className="flex w-full">
        <Button buttonType="button" className="flex-shrink-0" disabled={value} type="primary">
          Upload Image
        </Button>
        {!!value && (
          <div className="flex ml-2.5 rounded-mini px-5 py-3 justify-between items-center flex-1 border border-white">
            <span className="text-white text-xs font-bold truncate max-w-[200px]">{value.name}</span>
            <DeleteIcon onClick={onDeleteFile} className="w-6 h-6 flex-shrink-0 ml-2.5 cursor-pointer" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        onChange={onFileChange}
        type="file"
        className="hidden"
        accept="image/jpg, image/jpeg, image/png"
      />
    </div>
  );
};
