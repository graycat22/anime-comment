"use client";

import { deleteComment } from "@/utils/actions";

const DeleteDialog = ({
  id,
  isOpen,
  onClose,
  revalidate,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  revalidate: () => void;
}) => {
  const handleClickYes = () => {
    deleteComment(id);
    setTimeout(() => {
      revalidate();
      onClose();
    }, 500);
  };

  return (
    <div className="fixed z-10 top-0 left-0 flex justify-center items-center w-full h-full bg-black/40">
      <dialog open={isOpen} className="bg-white p-5 rounded-[5px] shadow-lg">
        <p className="mb-4">コメントを削除しますか？</p>
        <div className="flex justify-between gap-3">
          <button
            className="w-[70px] py-1 border-b-2 rounded-t-md hover:bg-red-300 hover:border-red-300 hover:rounded-md  duration-100"
            onClick={onClose}
          >
            いいえ
          </button>
          <button
            className="w-[70px] py-1 border-b-2 rounded-t-md  hover:bg-red-300 hover:border-red-300 hover:rounded-md duration-100"
            onClick={handleClickYes}
          >
            はい
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteDialog;
